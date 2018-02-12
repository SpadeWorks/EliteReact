import * as React from 'react';
import TestDriveItem from './TestDriveItem';
import { Link } from "react-router-dom";
import Loader from 'react-loader-advanced';
import {
    model
} from '../../test_drive';

interface AppProps {
    testDrives: model.TestDrive[];
    editTestDrive: (t: model.TestDrive) => void;
    deleteTestDrive: (id: number) => any;
    loading: boolean;
};

class TestDrives extends React.Component<AppProps> {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        const { editTestDrive, deleteTestDrive, testDrives, loading } = this.props
        return (<div>
            <h2 className="page-heading">Create Test Drive</h2>
            <h4 className="cancel-btn"><Link to={"/home"}>Cancel</Link></h4>
            <div className="clearBoth"></div>
            <div className="col-md-12">
                <div className="row">
                    <div className="well">
                        <ul className="nav nav-tabs">
                            <li className="">
                                <a href="#myTestDrive" data-toggle="tab">MY TEST DRIVES</a>
                            </li>
                            <li className="active">
                                <a href="#testDriveIRun" data-toggle="tab">TEST DRIEVES I RUN</a>
                            </li>
                            <li className="">
                                <a href="#activeTestDrive" data-toggle="tab">Active Test Drive</a>
                            </li>
                            <li className="">
                                <a href="#upcommingTestDrive" data-toggle="tab">Upcomming Test Drive</a>
                            </li>

                        </ul>
                        <div id="myTabContent" className="tab-content">
                            <div className="tab-pane fade" id="myTestDrive">
                                <h1>My Test Drive</h1>
                            </div>
                            <div className="tab-pane fade active in" id="testDriveIRun">
                                <Loader show={loading} message={'Loading...'}>
                                    <div className="add-button col-md-2 add_test pull-right text-right">
                                        <Link to={"/testdrive"} >+ Create Test Drive</Link>
                                    </div>
                                    {
                                        testDrives && testDrives.length && testDrives.map((testDriveObj: any) => {
                                            return testDriveObj.testDrive && <TestDriveItem
                                                key={testDriveObj.testDrive.id}
                                                indexKey={testDriveObj.testDrive.id}
                                                testDrive={testDriveObj.testDrive}
                                                editTestDrive={editTestDrive}
                                                deleteTestDrive={deleteTestDrive} />
                                        })

                                    }
                                </Loader>
                            </div>
                            <div className="tab-pane fade" id="activeTestDrive">
                                <h1>Active Test Drive</h1>
                            </div>
                            <div className="tab-pane fade" id="upcommingTestDrive">
                                <h1>Upcomming Test Drive</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default TestDrives