import * as React from 'react';
import { Link } from "react-router-dom";

interface MyTestDrivesCompletedProps {

};
class MyTestDrivesCompleted extends React.Component<MyTestDrivesCompletedProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-12 MyTestDrivesCompleted">
            <p className="text-right">MyTestDrivesCompleted</p>
        </div>)
    }
}

export default MyTestDrivesCompleted;