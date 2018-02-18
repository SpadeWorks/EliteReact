import * as React from 'react';
import { Link } from "react-router-dom";
import { Tabs, Pane } from '../../common/components/Tabs';
import Loader from 'react-loader-advanced';
import {
    model,
    TestDriveIRunItem,
    editTestDrive,
    deleteTestDrive
} from '../index';

interface TestDrivesIRunContainerProps {
    testDriveIRun: any;
};
class TestDrivesIRunContainer extends React.Component<TestDrivesIRunContainerProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { testDriveIRun } = this.props
        return (
            <div>
                <div className="add-button col-md-2 add_test pull-right text-right">
                    <Link to={"/testdrive"} >+ Create Test Drive</Link>
                </div>

                <Tabs selected={0}>
                    <Pane label="TEST DRIVE IN PROGRESS">
                        <h1>TEST DRIVE IN PROGRESS</h1>
                    </Pane>
                    <Pane label="UPCOMMING TEST DRIVES">
                        <Loader show={false} message={'Loading...'}>
                            <div className="col-md-12 currtestdrive_list testdrive_I_runbox">
                                {
                                    (testDriveIRun && testDriveIRun.length) ? testDriveIRun.map((testDriveObj: any) => {
                                        return testDriveObj.testDrive && <TestDriveIRunItem
                                            key={testDriveObj.testDrive.id}
                                            indexKey={testDriveObj.testDrive.id}
                                            testDrive={testDriveObj.testDrive}
                                            editTestDrive={editTestDrive}
                                            deleteTestDrive={deleteTestDrive} />
                                    }) : ''
                                }
                            </div>
                        </Loader>
                    </Pane>
                    <Pane label="COMPLETED TEST DRIVES">
                        <h1>Active Test Drive</h1>
                    </Pane>
                    <Pane label="DRAFTED TEST DRIVES">
                        <h1>Upcomming Test Drive</h1>
                    </Pane>
                </Tabs>
            </div>


        )
    }
}

export default TestDrivesIRunContainer;
