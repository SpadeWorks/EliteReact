import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
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
};
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

        this.props.loadMyInprogressTestDrives(0, 100);
    }
    render() {
        const { myCompletedTestDrives, myCompletedTestDrivesLoading, myInprogressTestDrives, 
            myInprogressTestDrivesLoading } = this.props;
        return (<Tabs selected={0}>
            <Pane label="TEST DRIVES IN PROGRESS">
                <MyTestDrivesCompletedItem
                    myCompletedTestDrives={myCompletedTestDrives}
                    myCompletedTestDrivesLoading={myCompletedTestDrivesLoading}
                    loadMyCompletedTestDrives={(skip, top) =>
                        loadMyCompletedTestDrives(skip, top)}
                />
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                <MyTestDrivesCompletedItem
                    myCompletedTestDrives={myInprogressTestDrives}
                    myCompletedTestDrivesLoading={myInprogressTestDrivesLoading}
                    loadMyCompletedTestDrives={(skip, top) =>
                        loadMyCompletedTestDrives(skip, top)}
                />
            </Pane>
        </Tabs>)
    }
}

export default MyTestDrivesContainer;
