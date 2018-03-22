import * as React from 'react';
import Loader from 'react-loader-advanced';
import { connect } from 'react-redux';
import ui from 'redux-ui';
import TabbedArea from './TabbedArea';
import TabPane from './TabPane';
import { HomeTestDrive, Leaders, EliteProfile } from '../../home/model';
import OverallPointsDashboard from "./OverallPointsDashboard"
import * as $ from 'jquery';
import Services from '../../common/services/services';
import { Dispatch } from 'redux';
import Navigation from './Navigation';
import LeaderBoard from './LeaderBoard';
import HomeLeftTestDrives from './HomeLeftTestDrives';
import HomeRightTestDrives from './HomeRightTestDrives';
import UserRank from './UserRank';
import Video from './Video';
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
    loadEliteProfile,
    getUserRank,
    loadCurrentUser,
    loadVideo,
    loadPrizes
} from '../../home';
import { constants } from 'zlib';
import Footer from '../../common/components/Footer';


interface HomeProps {
    mytestDrive: HomeTestDrive[];
    myTestDriveLoading: boolean;
    testDriveThatIRun: HomeTestDrive[];
    testDriveThatIRunLoading: boolean;
    upcomingTestDrive: HomeTestDrive[];
    upcomingTestDriveLoading: boolean;
    activeTestDrive: HomeTestDrive[];
    activeTestDriveLoading: boolean;
    leaders: Leaders[];
    regionLeaders: Leaders[];
    updateUI: (any) => any;
    ui: any;
    dispatch: Dispatch<{}>;
    totalCount: number;
    totalPoints: number;
    totalTasks: number;
    testDrivesCompleted: number;
    totalTestDrives: number;
    userCarImage: string;
    eliteProfile: EliteProfile;
    userRank: number;
    currentUser: any;
    videoUrl: string;
    prizes: any[];
    prizesLoading: boolean;

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
        document.body.className = "img-bg";
        Services.loadProgressBar("total-task-canvas");

        let user = Services.getUserProfileProperties();
        Services.getApplicationConfigurations().then(function (data: any) {
            $("#homeMiddleText").html(data.HomePageMiddleText);
        });

        $("#app").mouseup(function (e) {
            var videoContainer = $(".modal-content");
            var container = $(".letest_drivebox");
            var container2 = $(".letest_drivebox2");
            var toolbar = $(".rte-toolbar")
            if (!container.is(e.target) && container.has(e.target).length === 0 &&
                !container2.is(e.target) && container2.has(e.target).length === 0 &&
                !toolbar.is(e.target) && toolbar.has(e.target).length === 0) {
                $(".lc_container").removeClass("lc_containerclick");
                $(".letest_drivebox").removeClass("letest_driveboxclick");
                $(".lc_container2").removeClass("lc_containerclick2");
                $(".letest_drivebox2").removeClass("letest_driveboxclick_right");
                $(".letest_drivebox").removeClass('box').hide();
                $(".letest_drivebox2").removeClass('box').hide();
            }

            if (!videoContainer.is(e.target) && videoContainer.has(e.target).length === 0 &&
            !toolbar.is(e.target) && toolbar.has(e.target).length === 0) {
                $(".close-popup").trigger('click');
                $(".close-popup").trigger('click');
            }
        });

        if (user.eliteProfileID) {
            this.props.dispatch(loadEliteProfile(user.eliteProfileID));
            this.props.dispatch(loadLeaderBoard(0, 3));
            this.props.dispatch(loadRegionLeaderBoard(user.region, 0, 3));
            this.props.dispatch(getUserRank(user.eliteProfileID));
            this.props.dispatch(loadMyTestDrive());
            this.props.dispatch(loadTestDriveThatIRun(0, 3));
            this.props.dispatch(loadUpcomingTestDrive());
            this.props.dispatch(loadActiveTestDrive());
            this.props.dispatch(loadTotalUserCount());
            this.props.dispatch(loadTotalTestDrives());
            this.props.dispatch(loadTestDrivesCompleted());
            this.props.dispatch(loadTotalTasks());
            this.props.dispatch(loadUserPoints(user.eliteProfileID));
            this.props.dispatch(loadVideo());
            
        }
    }

    render() {
        const { ui, updateUI, mytestDrive, testDriveThatIRun, upcomingTestDrive, activeTestDrive,
            leaders, regionLeaders, myTestDriveLoading, totalCount, totalPoints, totalTasks,
            testDrivesCompleted, totalTestDrives, userCarImage, testDriveThatIRunLoading,
            activeTestDriveLoading, upcomingTestDriveLoading, eliteProfile, userRank, videoUrl, 
            prizes, prizesLoading } = this.props;
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h2><img src="/Style%20Library/Elite/images/logo.png" className="img-responsive" /> </h2>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <Navigation currentUserImage={eliteProfile.avatarImage} />
                            <LeaderBoard updateUI={updateUI}
                                ui={ui}
                                leaders={leaders}
                                regionLeaders={regionLeaders} />
                        </div>
                        <div className="col-md-12">
                            <HomeLeftTestDrives ui={ui}
                                updateUI={updateUI}
                                mytestDrive={mytestDrive}
                                myTestDriveLoading={myTestDriveLoading}
                                testDriveThatIRun={testDriveThatIRun}
                                testDriveThatIRunLoading={testDriveThatIRunLoading}
                            />

                            <div className="col-md-5">
                                <h2 className="text-center skills_heading" id="homeMiddleText"></h2>
                            </div>
                            <HomeRightTestDrives
                                ui={ui}
                                updateUI={updateUI}
                                upcomingTestDrive={upcomingTestDrive}
                                upcomingTestDriveLoading={upcomingTestDriveLoading}
                                activeTestDrive={activeTestDrive}
                                activeTestDriveLoading={activeTestDriveLoading} />

                            <OverallPointsDashboard totalUsers={totalCount}
                                testDrivesCompleted={testDrivesCompleted}
                                currentRideImage={eliteProfile.carImage}
                                pointsEarned={totalPoints} totalTestDrives={totalTestDrives} totalTasks={totalTasks}>
                            </OverallPointsDashboard>
                        </div>
                        <UserRank userName={eliteProfile.displayName} userRank={userRank} />
                        <Video videoUrl={videoUrl} />
                        <Footer />
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.homeState.currentUser,
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
        eliteProfile: state.homeState.eliteProfile,
        userRank: state.homeState.rank.rank,
        videoUrl: state.homeState.videoUrl,
        prizes: state.homeState.prizes,
        prizesLoading: state.homeState.prizesLoading
    }
};

export default connect(mapStateToProps)(Home);