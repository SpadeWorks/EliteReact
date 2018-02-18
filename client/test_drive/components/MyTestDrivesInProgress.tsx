import * as React from 'react';
import { Link } from "react-router-dom";

interface MyTestDrivesInProgressProps {

};
class MyTestDrivesInProgress extends React.Component<MyTestDrivesInProgressProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12 MyTestDrivesInProgress">
            <p className="text-right">MyTestDrivesInProgress</p>
        </div>)
    }
}

export default MyTestDrivesInProgress;