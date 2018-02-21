import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import Pager from 'react-pager';
import Services from '../../common/services/services';
import {
    model,
    loadMyCompletedTestDrives,
    MyTestDrivesCompletedItem,
    MyTestDrivesInProgressItem
} from '../../test_drive';

interface MyTestDrivesContainerProps {
    myCompletedTestDrives: model.MyTestDrive[]
    myCompletedTestDrivesLoading: boolean,
    myInprogressTestDrives: model.MyTestDrive[],
    myInprogressTestDrivesLoading: boolean,
    loadMyCompletedTestDrives: (skip: number, top: number) => any;
    loadMyInprogressTestDrives: (skip: number, top: number) => any;
    updateUI: (any) => any;
    ui: any;
};

@ui({
    state: {
        batchSize: 100,
        itemsPerPage: 3,
        total: 11,
        completedCurrent: 0,
        inprogressCurrent: 0,
        completedItems: [],
        inprogressItems: [],
        visiblePages: 4,
        inprogressVisible: [],
        completedVisible: [],
        inprogressTotalItems: 0,
        completedTotalItems: 0,
        inprogressItemsLoading: false,
        completedItemsLoading: false
    }
})
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
        this.getCompletedVisibleItems = this.getCompletedVisibleItems.bind(this);
        this.getInprogressVisibleItems = this.getInprogressVisibleItems.bind(this);
    }

    componentDidMount() {
        this.getCompletedVisibleItems(0);
        this.getInprogressVisibleItems(0)
    }

    getCompletedVisibleItems(newPage) {
        var self = this;
        var skip = newPage * this.props.ui.itemsPerPage;
        var top = skip + this.props.ui.itemsPerPage;
        if (top >= this.props.ui.inprogressItems.length) {
            this.props.updateUI({
                completedItemsLoading: true
            });
            Services.getMyCompletedTestDrives(skip, top + this.props.ui.batchSize).then((testDrives: any) => {
                var newBatchSize = top + self.props.ui.batchSize;
                var total = testDrives.length < newBatchSize ? testDrives.length : newBatchSize; 
                self.props.updateUI({
                    completedTotalItems: total,
                    completedCurrent: newPage,
                    completedItems: [...self.props.ui.completedItems, ...testDrives],
                    completedVisible: testDrives.slice(skip, top),
                    completedItemsLoading: false
                });
            });
        } else {
            this.props.updateUI({
                completedCurrent: newPage,
                completedVisible: this.props.ui.completedItems.slice(skip, top)
            });
        }

    }

    getInprogressVisibleItems(newPage) {
        var self = this;
        var skip = newPage * this.props.ui.itemsPerPage;
        var top = skip + this.props.ui.itemsPerPage;
        if (top >= this.props.ui.completedItems.length) {
            this.props.updateUI({
                inprogressItemsLoading: true
            });
            Services.getMyTestDrives(skip, top + this.props.ui.batchSize).then((testDrives: any) => {
                var newBatchSize = top + self.props.ui.batchSize;
                var total = testDrives.length < newBatchSize ? testDrives.length : newBatchSize; 
                self.props.updateUI({
                    inprogressTotalItems: total,
                    inprogressCurrent: newPage,
                    inprogressItems: [...self.props.ui.inprogressItems, ...testDrives],
                    inprogressVisible: testDrives.slice(skip, top),
                    inprogressItemsLoading: false
                });
            });
        } else {
            this.props.updateUI({
                inprogressCurrent: newPage,
                inprogressVisible: this.props.ui.inprogressItems.slice(skip, top)
            });
        }
    }

    render() {
        const { myCompletedTestDrives, myCompletedTestDrivesLoading, myInprogressTestDrives,
            myInprogressTestDrivesLoading, ui, updateUI,
            loadMyInprogressTestDrives, loadMyCompletedTestDrives } = this.props;

        return (<Tabs selected={0}>
            <Pane label="TEST DRIVES IN PROGRESS">
                <div>
                    <Loader show={ui.inprogressItemsLoading} message={'Loading...'}>
                        {
                            (ui.inprogressVisible && ui.inprogressVisible.length) ?
                                ui.inprogressVisible.map((testDriveObj: any, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj.testDrive}
                                        participants={testDriveObj.participants}
                                        index={index}
                                    />)
                                }) : (!ui.inprogressItemsLoading && 'There are no items in this view.')
                        }
                        {
                            ui.inprogressItems && ui.inprogressItems.length &&
                            <Pager
                                total={Math.ceil(ui.inprogressItemsLoading / ui.itemsPerPage)}
                                current={ui.inprogressCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) =>
                                    this.getInprogressVisibleItems(newPage)}
                            />
                        }
                    </Loader>
                </div>
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                <div>
                    <Loader show={ui.completedItemsLoading} message={'Loading...'}>
                        {
                            (ui.completedVisible && ui.completedVisible.length) ?
                                ui.completedVisible.map((testDriveObj: any, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj.testDrive}
                                        participants={testDriveObj.participants}
                                        index={index}
                                    />)
                                }) : (!ui.completedItemsLoading && 'There are no items in this view.')
                        }
                        {
                            ui.completedItems && ui.completedItems.length > 0 &&
                            <Pager
                                total={Math.ceil(ui.completedTotalItems / ui.itemsPerPage)}
                                current={ui.pendingItemCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) =>
                                    this.getCompletedVisibleItems(newPage)}
                            />
                        }
                    </Loader>
                </div>
            </Pane>
        </Tabs>)
    }
}

export default MyTestDrivesContainer;
