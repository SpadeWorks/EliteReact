import * as React from 'react';
import { Link } from "react-router-dom";
import {
    model
} from '../../test_drive';

import { TestDriveInstance } from '../model';

interface AppProps {
    indexKey: any;
    testDrive: TestDriveInstance;
    deleteTestDrive: (id: number) => any;
    editTestDrive: (testDrive: TestDriveInstance) => any;
};

class TestDriveItem extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { deleteTestDrive, editTestDrive, testDrive, indexKey } = this.props;
        return (<div className="col-md-12 currtestdrive_list">
            <div className="row">
                <div className="col-md-8">
                    <h4>{testDrive.title}</h4>
                </div>
                <div className="col-md-2">
                    <h4>
                        <Link to={'/testdrive/' + testDrive.testDriveID}>
                            <input
                                className="btn btn-primary"
                                type="button"
                                value="Edit"
                                onClick={() => editTestDrive(testDrive)}
                            />
                        </Link>
                    </h4>
                </div>
                <div className="col-md-2">
                    <h4>
                        <input
                            className="btn btn-danger"
                            type="button"
                            value="Delete"
                            onClick={() => deleteTestDrive(testDrive.testDriveID)} />
                    </h4>
                </div>
            </div>
        </div>)
    }
}

export default TestDriveItem