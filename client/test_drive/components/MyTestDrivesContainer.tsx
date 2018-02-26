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
        itemsPerPage: 3,
        total: 11,
        completedItemCurrent: 0,
        inprogressItemCurrent: 0,
        completedItems: [],
        inprogressItems: [],
        visiblePages: 4,
        visibleItems: []
    }
})
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadMyCompletedTestDrives(0, 1000);
        this.props.loadMyInprogressTestDrives(0, 1000);
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
            loadMyInprogressTestDrives, loadMyCompletedTestDrives } = this.props;

        if (!myCompletedTestDrivesLoading && myCompletedTestDrives && myCompletedTestDrives.length && !ui.completedItems.length) {
            var currentPage = ui.completedItemCurrent;
            if (ui.completedItems.length < ui.completedItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent');
        }
        if (!myInprogressTestDrivesLoading && myInprogressTestDrives && myInprogressTestDrives.length && !ui.inprogressItems.length) {
            var currentPage = ui.inprogressItemCurrent;
            if (ui.inprogressItems.length < ui.inprogressItemCurrent * ui.itemsPerPage) {
                currentPage = currentPage - 1;
            }
            this.getVisibleItems(currentPage, this.props.myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent');
        }

        return (<Tabs selected={0}>
            
            <Pane label="TEST DRIVES IN PROGRESS">
                <div>
                    <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                        {
                            (ui.inprogressItems && ui.inprogressItems.length) ?
                                ui.inprogressItems.map((testDriveObj: any, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj}
                                        participants={testDriveObj.participants}
                                        index={index}
                                    />)
                                }) : (!myInprogressTestDrivesLoading && 'There are no items in this view.')
                        }
                        {
                            ui.inprogressItems && ui.inprogressItems.length > 0 &&
                            <Pager
                                total={Math.ceil(myInprogressTestDrives.length / ui.itemsPerPage)}
                                current={ui.inprogressItemCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.getVisibleItems(newPage, myInprogressTestDrives, 'inprogressItems', 'inprogressItemCurrent')}
                            />
                        }

                    </Loader>
                </div>
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                <div>
                    <Loader show={myCompletedTestDrivesLoading} message={'Loading...'}>
                        {
                            (ui.completedItems && ui.completedItems.length) ?
                                ui.completedItems.map((testDriveObj, index) => {
                                    return (<MyTestDrivesCompletedItem
                                        key={index}
                                        testDrive={testDriveObj}
                                        participants={testDriveObj.participants}
                                        index={index}
                                    />)
                                }) : (!myCompletedTestDrivesLoading && 'There are no items in this view.')
                        }
                        {
                            ui.completedItems && ui.completedItems.length > 0 &&
                            <Pager
                                total={Math.ceil(myCompletedTestDrives.length / ui.itemsPerPage)}
                                current={ui.completedItemCurrent}
                                visiblePages={ui.visiblePages}
                                titles={{ first: '<', last: '>' }}
                                className="pagination-sm pull-right"
                                onPageChanged={(newPage) => this.getVisibleItems(newPage, myCompletedTestDrives, 'completedItems', 'completedItemCurrent')}
                            />
                        }

                    </Loader>
                </div>
            </Pane>
        </Tabs>)
    }
}

export default MyTestDrivesContainer;
