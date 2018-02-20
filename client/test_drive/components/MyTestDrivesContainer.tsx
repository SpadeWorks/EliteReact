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
        currentItems: [],
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
            myInprogressTestDrivesLoading } = this.props;
        return (<Tabs selected={0}>
            <Pane label="TEST DRIVES IN PROGRESS">
                {/* <MyTestDrivesCompletedItem
                    myCompletedTestDrives={myCompletedTestDrives}
                    myCompletedTestDrivesLoading={myCompletedTestDrivesLoading}
                    loadMyCompletedTestDrives={(skip, top) =>
                        loadMyCompletedTestDrives(skip, top)}
                /> */}
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                {/* <MyTestDrivesInProgressItem
                    myCompletedTestDrives={myInprogressTestDrives}
                    myCompletedTestDrivesLoading={myInprogressTestDrivesLoading}
                    loadeMore={(skip, top) =>
                        loadMyCompletedTestDrives(skip, top)}
                /> */}
            </Pane>
        </Tabs>)
    }
}

export default MyTestDrivesContainer;
