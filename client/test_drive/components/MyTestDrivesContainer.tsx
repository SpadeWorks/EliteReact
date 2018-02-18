import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import {
    model, loadMyCompletedTestDrives,
} from '../../test_drive';

interface MyTestDrivesContainerProps {
    myCompletedTestDrives: model.MyTestDrive[]
    myCompletedTestDrivesLoading: boolean,
    myInprogressTestDrives: model.MyTestDrive[],
    myInprogressTestDrivesLoading: boolean,
    loadMyCompletedTestDrives: (skip:number, top: number) => any;
    loadMyInprogressTestDrives: (skip:number, top: number) => any;
};
class MyTestDrivesContainer extends React.Component<MyTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        this.props.loadMyCompletedTestDrives(0, 100);
        this.props.loadMyInprogressTestDrives(0, 100);
    }
    render() {
        return (<Tabs selected={0}>
            <Pane label="TEST DRIVES IN PROGRESS">
                <h1>TEST DRIVES IN PROGRESS</h1>
            </Pane>
            <Pane label="COMPLETED TEST DRIVES">
                <h1>COMPLETED TEST DRIVES</h1>
            </Pane>
        </Tabs>)
    }
}

export default MyTestDrivesContainer;
