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
        const isTestDriveIRunVisible = (role == "Site Owner" ||
            role == "Test Drive Owner")

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
                            <div className="col-md-12">
                                <Loader show={myTestDriveLoading} message={'Loading test drives...'}>
                                    {
<<<<<<< HEAD
                                        (!myTestDriveLoading && mytestDrive && mytestDrive.length) ? mytestDrive.map((testDrive, index) => {
=======
                                        (mytestDrive && mytestDrive.length) ? mytestDrive.map((testDrive, index) => {
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
<<<<<<< HEAD
                                    {(!myTestDriveLoading && mytestDrive.length == 0) ? <p>You are not currently participating in any test drives.</p> : ''}
                                    {
                                        (!myTestDriveLoading && mytestDrive && mytestDrive.length >= 3) ? <Link className="read_morelink more" to={"/testdrives/mytestDrive"}>
                                            MORE >>
                                        </Link> : ''
                                    }
                                </Loader>
                            </div>
=======
                                    {(!myTestDriveLoading && mytestDrive.length == 0) ? <p>You have not participated in any test drive yet.</p> : ''}
                                    {
                                        (mytestDrive && mytestDrive.length >= 3) ? <Link className="read_morelink more" to={"/testdrives/mytestDrive"}>
                                            MORE >>
                                        </Link> : ''
                                    }
                                </div>
                            </Loader>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                        </div>

                        {
                            isTestDriveIRunVisible ? <div className="tab-pane fade" id="profile">
<<<<<<< HEAD
                                <div className="col-md-12">
                                    <Loader show={testDriveThatIRunLoading} message={'Loading test drives...'}>
                                        {
                                            ( !testDriveThatIRunLoading && testDriveThatIRun && testDriveThatIRun.length) ? testDriveThatIRun.map((testDrive, index) => {
=======
                                <Loader show={testDriveThatIRunLoading} message={'Loading test drives...'}>
                                    <div className="col-md-12">
                                        {
                                            (testDriveThatIRun && testDriveThatIRun.length) ? testDriveThatIRun.map((testDrive, index) => {
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
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
                                            <p>You have not created any test drive yet.</p>
<<<<<<< HEAD
                                            <div className="col-md-12 text-center create_new">
                                                <Link className="button type1" to={"/testdrive"}>Create Test Drive </Link>
                                            </div>
                                        </div> : ''}
                                        {
                                            (!testDriveThatIRunLoading && testDriveThatIRun && testDriveThatIRun.length >= 3) ?
=======
                                            <div className="col-md-12 popup_buttonbox">
                                                <Link className="button type1" to={"/testdrive"}> +Create Test Drive </Link>
                                            </div>
                                        </div> : ''}
                                        {
                                            (testDriveThatIRun && testDriveThatIRun.length >= 3) ?
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                                <Link className="more" to={"/testdrives/testDriveThatIRun"}>
                                                    MORE >>
                                        </Link> : ''
                                        }
<<<<<<< HEAD
                                    </Loader>
                                </div>
                            </div> : ''
                        }
=======
                                    </div>
                                </Loader>
                            </div> : ''
                        }

>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default HomeLeftTestDrives;
