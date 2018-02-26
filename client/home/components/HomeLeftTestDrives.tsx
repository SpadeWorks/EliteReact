import * as React from 'react';
import { Link } from "react-router-dom";
import MyTestDrives from './LeftContainer';
import Loader from 'react-loader-advanced';
import { HomeTestDrive, TestDrive } from '../../home/model';
import LeftContainer from './LeftContainer';
import { Globals, ColumnsValues } from '../../common/services/constants';
import Service from '../../common/services/services';
interface HomeLeftTestDrivesProps {
    updateUI: (any) => any;
    ui: any;
    mytestDrive: HomeTestDrive[];
    myTestDriveLoading: boolean;
    testDriveThatIRun: HomeTestDrive[];
    testDriveThatIRunLoading: boolean;
};
class HomeLeftTestDrives extends React.Component<HomeLeftTestDrivesProps> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            ui,
            updateUI,
            mytestDrive,
            myTestDriveLoading,
            testDriveThatIRun,
            testDriveThatIRunLoading,
        } = this.props;

        const role = Service.getUserProfileProperties().role;
        const isTestDriveIRunVisible = (role == ColumnsValues.TEST_DRIVE_OWNER_DISPLAY_NAME ||
            role == ColumnsValues.TEST_DRIVE_OWNER_DISPLAY_NAME)

        return (<div className="col-md-3 black_box black_box_left pull-left">
            <div className="row">
                <div className="well">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#home" data-toggle="tab">MY TEST DRIVES</a></li>
                        {isTestDriveIRunVisible ?
                            <li className="pull-right">
                                <a href="#profile" data-toggle="tab">TEST DRIVES I RUN</a>
                            </li> : ''}
                    </ul>
                    <div id="myTabContent" className="tab-content">
                        <div className="tab-pane active in" id="home">
                            <Loader show={myTestDriveLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        (mytestDrive && mytestDrive.length) ? mytestDrive.map((testDrive, index) => {
                                            return (testDrive && <LeftContainer
                                                key={index}
                                                participants={testDrive.participants}
                                                checkPortion={"myTestDrive"}
                                                testDrive={testDrive.testDrive}
                                                testDriveResponse={testDrive.testDriveResponse}
                                                index={index + 1}
                                            />)
                                        }) : ''
                                    }
                                    {(!myTestDriveLoading && mytestDrive.length == 0) ? <p>You have not participated in any test dirve yet.</p> : ''}
                                    {
                                        (mytestDrive && mytestDrive.length >= 3) ? <Link className="read_morelink more" to={"/testdrives/mytestDrive"}>
                                            MORE >>
                                        </Link> : ''
                                    }
                                </div>
                            </Loader>
                        </div>

                        {
                            isTestDriveIRunVisible ? <div className="tab-pane fade" id="profile">
                                <Loader show={testDriveThatIRunLoading} message={'Loading test drives...'}>
                                    <div className="col-md-12">
                                        {
                                            (testDriveThatIRun && testDriveThatIRun.length) ? testDriveThatIRun.map((testDrive, index) => {
                                                return (testDrive && <LeftContainer
                                                    key={index}
                                                    participants={testDrive.participants}
                                                    checkPortion={Globals.TEST_DRIVE_THAT_I_RUN}
                                                    testDrive={testDrive.testDrive}
                                                    testDriveResponse={undefined}
                                                    index={index + 1} />)
                                            }) : ''
                                        }
                                        {(!testDriveThatIRunLoading && !testDriveThatIRun.length) ? <div>
                                            <p>You have not created any test dive yet.</p>
                                            <div className="col-md-12 popup_buttonbox">
                                                <Link className="button type1" to={"/testdrive"}> +Create Test Drive </Link>
                                            </div>
                                        </div> : ''}
                                        {
                                            (testDriveThatIRun && testDriveThatIRun.length >= 3) ?
                                                <Link className="more" to={"/testdrives/testDriveThatIRun"}>
                                                    MORE >>
                                        </Link> : ''
                                        }
                                    </div>
                                </Loader>
                            </div> : ''
                        }

                    </div>
                </div>
            </div>
        </div>)
    }
}

export default HomeLeftTestDrives;
