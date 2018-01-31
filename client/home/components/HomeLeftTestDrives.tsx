import * as React from 'react';
import { Link } from "react-router-dom";
import TabbedArea from './TabbedArea';
import TabPane from './TabPane';
import MyTestDrives from './LeftContainer';
import Loader from 'react-loader-advanced';
import { HomeTestDrive } from '../../home/model';
import LeftContainer from './LeftContainer';

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
            testDriveThatIRunLoading
        } = this.props;

        return (<div className="col-md-4 black_box black_box_left pull-left">
            <div className="row">
                <div className="well">
                    <TabbedArea ui={ui} updateUI={updateUI}>
                        <TabPane display="MY TEST DRIVES" href="#home">
                        </TabPane>
                        <TabPane display="TEST DRIEVES I RUN" href="#profile">
                        </TabPane>
                    </TabbedArea>
                    <div id="myTabContent" className="tab-content">
                        <Loader show={false && myTestDriveLoading} message={'Loading test drives...'}>
                            <div className="tab-pane active in" id="home">
                                <div className="col-md-12">
                                    {
                                        mytestDrive && mytestDrive.map((testDrive, index) => {
                                            return (<LeftContainer
                                                testDriveId={index + 1}
                                                testDriveName={testDrive.title}
                                                endDate={testDrive.enddate}
                                                participants={testDrive.participants}
                                                checkPortion={"myTestDrive"} />)
                                        })
                                    }
                                </div>
                            </div>
                        </Loader>
                        <Loader show={testDriveThatIRunLoading} message={'Loading test drives...'}>
                            <div className="tab-pane fade" id="profile">

                                <div className="col-md-12">
                                    {
                                        testDriveThatIRun && testDriveThatIRun.map((testDrive, index) => {
                                            return (<LeftContainer
                                                testDriveId={index + 1}
                                                testDriveName={testDrive.title}
                                                endDate={testDrive.enddate}
                                                participants={testDrive.participants}
                                                checkPortion={"testDriveThatIRun"} />)
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

export default HomeLeftTestDrives;
