import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    model
} from '../../test_drive';
import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import { TestDrive } from '../model';

interface AppProps {
    testDrive: model.TestDrive;
    deleteTestDrive: (id: number) => any;
    editTestDrive: (testDrive: TestDrive) => any;
};

class TestDriveItem extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {deleteTestDrive, editTestDrive, testDrive} = this.props;
        return (
            <div className="testDriveItem">
                {/* <li></li> */}
                <li><Link to={'/testdrive/' + this.props.testDrive.id}>{this.props.testDrive.title}</Link></li>
                <ButtonToolbar>
                    <Link to={'/testdrive/' + this.props.testDrive.id}>
                        <Button bsStyle="primary" onClick={()=> editTestDrive(testDrive)}>Edit</Button>
                    </Link>
                    <Button bsStyle="danger"
                        onClick={() => deleteTestDrive(testDrive.id)}  >Delete</Button>
                </ButtonToolbar>
            </div>)
    }
}

export default TestDriveItem