import * as React from 'react';
import { Link } from "react-router-dom";
import {
    loadActiveTestDrives,
    model,
} from '../../test_drive';
interface ActiveTestDrivesContainerProps {
    activeTestDrives: model.TestDrive[];
    activeTestDrivesLoading: boolean;
    loadActiveTestDrives: (skip: number, top: number) => any;
};
class ActiveTestDrivesContainer extends React.Component<ActiveTestDrivesContainerProps> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        this.props.loadActiveTestDrives(0, 100);
    }
    render() {
        return (<div className="col-md-12 ActiveTestDrivesContainer">
            <p className="text-right">ActiveTestDrivesContainer</p>
        </div>)
    }
}

export default ActiveTestDrivesContainer;