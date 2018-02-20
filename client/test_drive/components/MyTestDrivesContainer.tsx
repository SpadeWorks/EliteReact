import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import ui from 'redux-ui';
import Pager from 'react-pager';
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
        itemsPerPage: 3,
        total: 11,
        completedCurrent: 0,
        inprogressCurrent: 0,
        completedItems: [],
        inprogressItems: [],
        visiblePages: 4,
        inprogressVisible: [],
        completedVisible: []
    }
})
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadMyInprogressTestDrives(0, 100);
        this.props.loadMyCompletedTestDrives(0, 100);
    }

    getVisibleItems(newPage: number, array: any[], visibleItems: string, currentPage: string) {
        let skip = newPage * this.props.ui.itemsPerPage;
        this.props.updateUI({
            [currentPage]: newPage,
            [visibleItems]: array.slice(skip, skip + this.props.ui.itemsPerPage)
        });
    }

    render() {
        const { myCompletedTestDrives, myCompletedTestDrivesLoading, myInprogressTestDrives,
            myInprogressTestDrivesLoading, ui, updateUI, 
            loadMyInprogressTestDrives, loadMyCompletedTestDrives} = this.props;

        if (!myCompletedTestDrivesLoading && myCompletedTestDrives &&
            myCompletedTestDrives.length && !ui.completedItems) {
            var currentPage = ui.completedCurrent;
            if (ui.myCompletedTestDrives.length < ui.completedItems * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, myCompletedTestDrives, 'completedItems', 'completedCurrent');
        }
        if (!myInprogressTestDrivesLoading && myInprogressTestDrives &&
            myInprogressTestDrives.length && !ui.inprogressItems.length) {
            var currentPage = ui.inprogressCurrent;
            if (ui.inprogressItems.length < ui.inprogressCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, myInprogressTestDrives,
                'inprogressItems', 'inprogressCurrent');
        }

        return (<Tabs selected={0}>
            <Pane label="TEST DRIVES IN PROGRESS">
                <div>
                    <Loader show={myInprogressTestDrivesLoading || false} message={'Loading...'}>
                        {
                            (ui.inprogressItems && ui.inprogressItems.length) ?
                                ui.inprogressItems.map((testDriveObj: any, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj.testDrive}
                                        participants={testDriveObj.participants}
                                        index={index}
                                        loadeMore={(skip, top) => loadMyInprogressTestDrives(skip, top)}
                                    />)
                                }) : (!myInprogressTestDrivesLoading && 'There are no items in this view.')
                        }
                        {
                            ui.inprogressItems && ui.completedItems.length &&
                            <Pager
                                total={Math.ceil(myInprogressTestDrives.length / ui.itemsPerPage)}
                                current={ui.inprogressCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => 
                                    this.getVisibleItems(newPage, myInprogressTestDrives, 
                                        'inprogressItems', 'inprogressCurrent')}
                            />
                        }
                    </Loader>
                </div>
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                <div>
                    <Loader show={myCompletedTestDrivesLoading || false} message={'Loading...'}>
                        {
                            (ui.completedItems && ui.completedItems.length) ?
                                ui.completedItems.map((testDriveObj: any, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj.testDrive}
                                        participants={testDriveObj.participants}
                                        index={index}
                                        loadeMore={(skip, top) => loadMyCompletedTestDrives(skip, top)}
                                    />)
                                }) : (myCompletedTestDrivesLoading && 'There are no items in this view.')
                        }
                        {
                            ui.completedItems && ui.completedItems.length > 0 &&
                            <Pager
                                total={Math.ceil(myCompletedTestDrives.length / ui.itemsPerPage)}
                                current={ui.pendingItemCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => 
                                    this.getVisibleItems(newPage, myCompletedTestDrives, 
                                        'completedItems', 'completedCurrent')}
                            />
                        }
                    </Loader>
                </div>
            </Pane>
        </Tabs>)
    }
}

export default MyTestDrivesContainer;
