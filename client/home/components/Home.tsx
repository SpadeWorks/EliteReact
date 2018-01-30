import * as React from 'react';
import Loader from 'react-loader-advanced';
import { connect } from 'react-redux';
import HomeTabs from './HomeTabs';
import ui from 'redux-ui';
import TabbedArea from './TabbedArea';
import TabPane from './TabPane';
import MyTestDrives from './MyTestDrives';
import { HomeTestDrive, Leaders } from '../../home/model';
import UpcomingTestDrives from './UpcomingTestDrives';
import OverallPointsDashboard from "./OverallPointsDashboard"
import * as $ from 'jquery';
import Services from '../../common/services/services';
import { Dispatch } from 'redux';
import {
    model,
    loadMyTestDrive,
    loadTestDriveThatIRun,
    loadLeaderBoard,
    loadRegionLeaderBoard,
    loadUpcomingTestDrive,
    loadActiveTestDrive,
    loadTotalUserCount,
    loadUserPoints,
    loadTestDrivesCompleted,
    loadTotalTasks,
    loadTotalTestDrives,
    loadCurrentUserCarImage,
} from '../../home';
import { constants } from 'zlib';


interface HomeProps {
    mytestDrive: HomeTestDrive[];
    testDriveThatIRun: HomeTestDrive[];
    upcomingTestDrive: HomeTestDrive[];
    activeTestDrive: HomeTestDrive[];
    leaders: Leaders[];
    regionLeaders: Leaders[];
    updateUI: (any) => any;
    ui: any;
    dispatch: Dispatch<{}>;
    myTestDriveLoading: boolean;
    totalCount: number;
    totalPoints: number;
    totalTasks: number;
    testDrivesCompleted: number;
    totalTestDrives: number;
    userCarImage: string;
};
interface HomeState {
};

@ui({
    state: {
        activeTab: 'step-1',
    }
})

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.dispatch(loadMyTestDrive());
        this.props.dispatch(loadTestDriveThatIRun());
        this.props.dispatch(loadLeaderBoard());
        this.props.dispatch(loadRegionLeaderBoard());
        this.props.dispatch(loadUpcomingTestDrive());
        this.props.dispatch(loadActiveTestDrive());
        this.props.dispatch(loadTotalUserCount());
        this.props.dispatch(loadUserPoints());
        this.props.dispatch(loadTotalTestDrives());
        this.props.dispatch(loadTestDrivesCompleted());
        this.props.dispatch(loadTotalTasks());
        this.props.dispatch(loadCurrentUserCarImage());

        $("a#link1").show(4200);
        $("a#link2").show(4200);
        $("a#link3").show(4200);
        $("a#link4").show(4200);
        $("a#link5").show(4200);
        $("a#link6").show(4200);
    }

    render() {
        const { ui, updateUI, mytestDrive, testDriveThatIRun, upcomingTestDrive, activeTestDrive,
            leaders, regionLeaders, myTestDriveLoading, totalCount, totalPoints, totalTasks,
            testDrivesCompleted, totalTestDrives, userCarImage } = this.props;
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="container">
                        <h2><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/logo.png" className="img-responsive" /> </h2>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 location_box">
                            <div className="col-md-8 location_box">
                                <div className="map_container">
                                    <object>
                                        <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/track.svg" />
                                        <a href="#" id="link1" className="maplinks"><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/testdrivecenter.png" /><span>test drieves central</span></a>
                                        <a href="#" id="link2" className="maplinks" ><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" /><span>Refer a friend</span></a>
                                        <a href="#" id="link3" className="maplinks" ><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" /><span>My Profile</span></a>
                                        <a href="#" id="link4" className="maplinks" ><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/Prizes.png" /><span>Prizes</span></a>
                                        <a href="#" id="link5" className="maplinks" ><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/leaderboard.png" /><span>Leaderboard</span></a>
                                        <a href="#" id="link6" className="maplinks"><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/video.png" /><span>Video</span></a>
                                    </object>
                                </div>
                            </div>
                            <div className="col-md-4 location_box">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="well">
                                            <HomeTabs ui={ui} updateUI={updateUI} leaders={leaders} regionLeaders={regionLeaders} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-4 black_box black_box_left pull-left">
                                <div className="row">
                                    <div className="well">
                                        <TabbedArea ui={ui} updateUI={updateUI}>
                                            <TabPane display="MY TEST DRIVES" href="#home">
                                            </TabPane>
                                            <TabPane display="TEST DRIEVES I RUN" href="#profile">
                                            </TabPane>
                                        </TabbedArea>
                                        <Loader show={myTestDriveLoading} message={'Loading test drives...'}>
                                            <div id="myTabContent" className="tab-content">
                                                <div className="tab-pane active in" id="home">
                                                    <div className="col-md-12">
                                                        {
                                                            mytestDrive && mytestDrive.map(testDrive => {
                                                                return (<MyTestDrives
                                                                    testDriveId={testDrive.id}
                                                                    testDriveName={testDrive.title}
                                                                    endDate={testDrive.enddate}
                                                                    participants={testDrive.participants} 
                                                                    checkPortion={"myTestDrive"}/>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="profile">
                                                    <div className="col-md-12">
                                                        {
                                                            testDriveThatIRun && testDriveThatIRun.map(testDrive => {
                                                                return (<MyTestDrives
                                                                    testDriveId={testDrive.id}
                                                                    testDriveName={testDrive.title}
                                                                    endDate={testDrive.enddate}
                                                                    participants={testDrive.participants} 
                                                                    checkPortion={"testDriveThatIRun"}/>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Loader>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2 className="text-center skills_heading">Skills.Speed.Smarts. Brind it all.</h2>
                            </div>
                            <div className="col-md-4 black_box_right pull-right black_box">
                                <div className="row">
                                    <div className="well">
                                        <TabbedArea ui={ui} updateUI={updateUI}>
                                            <TabPane display="UPCOMING TEST DRIVES" href="#up_drives">
                                            </TabPane>
                                            <TabPane display="ACTIVE TEST DRIVES" href="#active_drives">
                                            </TabPane>
                                        </TabbedArea>
                                        <Loader show={myTestDriveLoading} message={'Loading test drives...'}>
                                            <div id="myTabContent" className="tab-content">
                                                <div className="tab-pane active in" id="up_drives">
                                                    <div className="col-md-12">
                                                        {
                                                            upcomingTestDrive && upcomingTestDrive.map(testDrive => {
                                                                return (
                                                                    <UpcomingTestDrives
                                                                        testDriveId={testDrive.id}
                                                                        testDriveName={testDrive.title}
                                                                        endDate={testDrive.enddate}
                                                                        participants={testDrive.participants}
                                                                        checkPortion={"upTestDrive"}
                                                                        ></UpcomingTestDrives>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="active_drives">
                                                    <div className="col-md-12">
                                                        {
                                                            activeTestDrive && activeTestDrive.map(testDrive => {
                                                                return (
                                                                    <UpcomingTestDrives
                                                                        testDriveId={testDrive.id}
                                                                        testDriveName={testDrive.title}
                                                                        endDate={testDrive.enddate}
                                                                        participants={testDrive.participants}
                                                                        checkPortion={"activeTestDrive"}></UpcomingTestDrives>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Loader>
                                    </div>
                                </div>
                                
                            </div>
                            <OverallPointsDashboard totalUsers={totalCount} testDrivesCompleted={testDrivesCompleted} currnetRideAvatar={"http://intranet.spdev.equinix.com/sites/elite-dev-akash/Lists/CarMaster/" + userCarImage} pointsEarned={totalPoints} totalTestDrives={totalTestDrives} totalTasks={totalTasks}></OverallPointsDashboard>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="line_box">
                                        </div>
                                        <div className="player_box">
                                            <div className="col-md-4 testd_box">
                                                <p><span className="testd_count">76 </span> <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> +1</p>
                                            </div>
                                            <div className="col-md-8 player_name">
                                                <h2>Jenifer Vetel</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 footer">
                            <p className="text-right">&copy; 2018 Equinix inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mytestDrive: state.homeState.myTestDrive.homeTestDrives,
        testDriveThatIRun: state.homeState.testDriveThatIRun.homeTestDrives,
        testDriveThatIRunLoading: state.homeState.testDriveThatIRun.loading,
        myTestDriveLoading: state.homeState.myTestDrive.loading,
        upcomingTestDrive: state.homeState.upcomingTestDrive.homeTestDrives,
        activeTestDrive: state.homeState.activeTestDrive.homeTestDrives,
        activeTestDriveLoading: state.homeState.activeTestDrive.loading,
        upcomingTestDriveLoading: state.homeState.upcomingTestDrive.loading,
        leaders: state.homeState.leaderBoard,
        regionLeaders: state.homeState.regionLeaderBoard,
        totalCount: state.homeState.totalCount,
        totalPoints: state.homeState.userPoints,
        totalTestDrives: state.homeState.totalTestDrives,
        totalTasks: state.homeState.totalTasks,
        testDrivesCompleted: state.homeState.testDrivesCompleted,
        userCarImage: state.homeState.userCarImage,
    }
};

export default connect(mapStateToProps)(Home);