import * as React from 'react';
import { Link } from "react-router-dom";
import { Dispatch } from 'redux';
import {
    loadUpCommingTestDrives,
    model,
} from '../../test_drive';


interface UpCommingTestDrivesContainerProps {
    upCommingTestDrives: model.TestDrive[];
    upCommingTestDrivesLoading: boolean;
    loadUpCommingTestDrives: (skip:number, top:number) => any;
};



class UpCommingTestDrivesContainer extends React.Component<UpCommingTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.loadUpCommingTestDrives(0, 100);
    }

    render() {
        return (<div className="col-md-12 UpCommingTestDrivesContainer">
            <p className="text-right">UpCommingTestDrivesContainer</p>
        </div>)
    }
}

export default UpCommingTestDrivesContainer;