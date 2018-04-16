import * as React from 'react';
import { Link } from "react-router-dom";
import RightContainer from './RightContainer';
import Loader from 'react-loader-advanced';
import { HomeTestDrive } from '../../home/model';
import { Globals } from '../../common/services/constants';


interface HomeRightTestDrivesProps {
    updateUI: (any) => any;
    ui: any;
    upcomingTestDrive: HomeTestDrive[];
    upcomingTestDriveLoading: boolean;
    activeTestDrive: HomeTestDrive[];
    activeTestDriveLoading: boolean;
};
class HomeRightTestDrives extends React.Component<HomeRightTestDrivesProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {
            ui,
            updateUI,
            upcomingTestDrive,
            upcomingTestDriveLoading,
            activeTestDrive,
            activeTestDriveLoading
        } = this.props
        return (<div className="col-md-3 black_box_right pull-right black_box">
            <div className="row">
                <div className="well">
                    <ul className="nav nav-tabs">
                        <li className=""><a href="#up_drives" data-toggle="tab">UPCOMING TEST DRIVES</a></li>
                        <li className="pull-right active"><a href="#active_drives" data-toggle="tab">ACTIVE TEST DRIVES</a></li>
                    </ul>

                    <div id="myTabContent" className="tab-content">

                        <div className="tab-pane fade" id="up_drives">
<<<<<<< HEAD
                            <div className="col-md-12">
                                <Loader show={upcomingTestDriveLoading} message={'Loading test drives...'}>
                                    {
                                        (!upcomingTestDriveLoading && upcomingTestDrive && upcomingTestDrive.length) ?
                                            upcomingTestDrive.map((testDrive, index) => {
                                                return (testDrive &&
                                                    <RightContainer
                                                        key={index}
                                                        participants={testDrive.participants}
                                                        checkPortion={Globals.UPCOMMING_Test_Drive}
                                                        testDrive={testDrive.testDrive}
                                                        index={index + 1}
                                                    ></RightContainer>)
                                            }) : ''
=======
                            <Loader show={upcomingTestDriveLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        upcomingTestDrive && upcomingTestDrive.map((testDrive, index) => {
                                            return (testDrive &&
                                                <RightContainer
                                                    key={index}
                                                    participants={testDrive.participants}
                                                    checkPortion={Globals.UPCOMMING_Test_Drive}
                                                    testDrive={testDrive.testDrive}
                                                    index={index + 1}
                                                ></RightContainer>)
                                        })
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    }
                                    {(!upcomingTestDriveLoading) && upcomingTestDrive.length == 0 && <p>There are no upcoming test drives.</p>}
                                    {
                                        upcomingTestDrive && upcomingTestDrive.length >= 3 && <Link className="pull-right more" to={"/testdrives/upTestDrive"}>
                                            MORE >>
                                        </Link>
                                    }
<<<<<<< HEAD
                                </Loader>
                            </div>
                        </div>
                        <div className="tab-pane active in" id="active_drives">
                            <div className="col-md-12">
                                <Loader show={activeTestDriveLoading} message={'Loading test drives...'}>
                                    {
                                        (!activeTestDriveLoading && activeTestDrive && activeTestDrive.length) ? 
                                            activeTestDrive.map((testDrive, index) => {
=======
                                </div>
                            </Loader>
                        </div>
                        <div className="tab-pane active in" id="active_drives">
                            <Loader show={activeTestDriveLoading} message={'Loading test drives...'}>
                                <div className="col-md-12">
                                    {
                                        activeTestDrive && activeTestDrive.map((testDrive, index) => {
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                            return (testDrive &&
                                                <RightContainer
                                                    key={index}
                                                    participants={testDrive.participants}
                                                    checkPortion={"activeTestDrive"}
                                                    testDrive={testDrive.testDrive}
                                                    index={index + 1}></RightContainer>)
<<<<<<< HEAD
                                        }) : ''
=======
                                        })
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                                    }
                                    {(!activeTestDriveLoading) && activeTestDrive.length == 0 && <p>There are no active test drives.</p>}
                                    {
                                        activeTestDrive && activeTestDrive.length >= 3 && <Link className="pull-right more" to={"/testdrives/activeTestDrive"}>
                                            MORE >>
                                    </Link>
                                    }
<<<<<<< HEAD
                                </Loader>
                            </div>
=======
                                </div>
                            </Loader>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}

export default HomeRightTestDrives;
