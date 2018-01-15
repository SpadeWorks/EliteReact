import * as React from 'react';
import { Link } from "react-router-dom";
import {
    model
} from '../../test_drive';

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
        const { deleteTestDrive, editTestDrive, testDrive } = this.props;
        return (
            <div className="testDriveItem">
                {/* <li></li> */}
                <li><Link to={'/testdrive/' + this.props.testDrive.id}>{this.props.testDrive.title}</Link></li>
                <Link to={'/testdrive/' + this.props.testDrive.id}>
                    <input
                        className="btn-primary"
                        type="button"
                        value="Edit"
                        onClick={() => editTestDrive(testDrive)}
                    />
                </Link>
                <input
                    className="btn-danger"
                    type="button"
                    value="Delete"
                    onClick={() => deleteTestDrive(testDrive.id)} />
            </div>)
    }
}

export default TestDriveItem