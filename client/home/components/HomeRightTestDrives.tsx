import * as React from 'react';
import { Link } from "react-router-dom";
import TabbedArea from './TabbedArea';
import TabPane from './TabPane';
import RightContainer from './RightContainer';
import Loader from 'react-loader-advanced';
import { HomeTestDrive } from '../../home/model';


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
        return (<div className="col-md-4 black_box_right pull-right black_box">
            <div className="row">
                <div className="well">
                    <TabbedArea ui={ui} updateUI={updateUI}>
                        <TabPane display="UPCOMING TEST DRIVES" href="#up_drives">
                        </TabPane>
                        <TabPane display="ACTIVE TEST DRIVES" href="#active_drives">
                        </TabPane>
                    </TabbedArea>
                    <div id="myTabContent" className="tab-content">
                        <Loader show={upcomingTestDriveLoading} message={'Loading test drives...'}>
                            <div className="tab-pane active in" id="up_drives">
                                <div className="col-md-12">

                                    {
                                        upcomingTestDrive && upcomingTestDrive.map((testDrive, index) => {
                                            return (
                                                <RightContainer
                                                    testDriveId={index + 1}
                                                    testDriveName={testDrive.title}
                                                    endDate={testDrive.enddate}
                                                    participants={testDrive.participants}
                                                    checkPortion={"upTestDrive"}
                                                ></RightContainer>)
                                        })
                                    }
                                </div>
                            </div>
                        </Loader>
                        <Loader show={activeTestDriveLoading} message={'Loading test drives...'}>
                            <div className="tab-pane fade" id="active_drives">
                                <div className="col-md-12">
                                    {
                                        activeTestDrive && activeTestDrive.map((testDrive, index) => {
                                            return (
                                                <RightContainer
                                                    testDriveId={index + 1}
                                                    testDriveName={testDrive.title}
                                                    endDate={testDrive.enddate}
                                                    participants={testDrive.participants}
                                                    checkPortion={"activeTestDrive"}></RightContainer>)
                                        })
                                    }
                                </div>
                            </div>
                        </Loader>
                    </div>

                </div>
            </div>

        </div>)
    }
}

export default HomeRightTestDrives;
