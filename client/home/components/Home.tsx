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
    loadCurrentUser
} from '../../home';
import { constants } from 'zlib';
import Footer from './Footer';


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
        let user = Services.getUserProfileProperties();
        if(user.eliteProfileID){
            this.props.dispatch(loadEliteProfile(user.eliteProfileID));
            this.props.dispatch(loadLeaderBoard(0,3));       
            this.props.dispatch(loadRegionLeaderBoard(user.region, 0, 3)); 
            this.props.dispatch(getUserRank(user.eliteProfileID));
            this.props.dispatch(loadMyTestDrive());
            this.props.dispatch(loadTestDriveThatIRun(user.eliteProfileID, 0, 3));      
            this.props.dispatch(loadUpcomingTestDrive());
            this.props.dispatch(loadActiveTestDrive());
            this.props.dispatch(loadTotalUserCount());
            this.props.dispatch(loadTotalTestDrives());
            this.props.dispatch(loadTestDrivesCompleted());
            this.props.dispatch(loadTotalTasks());
            this.props.dispatch(loadUserPoints(user.eliteProfileID));    
            

        }
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
            testDrivesCompleted, totalTestDrives, userCarImage, testDriveThatIRunLoading,
            activeTestDriveLoading, upcomingTestDriveLoading, eliteProfile, userRank} = this.props;
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="container">
                        <h2><img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/logo.png" className="img-responsive" /> </h2>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 location_box">
                            <Navigation />
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

                            <div className="col-md-4">
                                <h2 className="text-center skills_heading">Skills.Speed.Smarts. Brind it all.</h2>
                            </div>
                            <HomeRightTestDrives
                                ui={ui}
                                updateUI={updateUI}
                                upcomingTestDrive={upcomingTestDrive}
                                upcomingTestDriveLoading = {upcomingTestDriveLoading}
                                activeTestDrive={activeTestDrive}
                                activeTestDriveLoading={activeTestDriveLoading} />

                            <OverallPointsDashboard totalUsers={totalCount} 
                                testDrivesCompleted={testDrivesCompleted} 
                                currentRideImage={eliteProfile.carImage} 
                                pointsEarned={totalPoints} totalTestDrives={totalTestDrives} totalTasks={totalTasks}>
                            </OverallPointsDashboard>
                        </div>
                        <UserRank userName={eliteProfile.displayName} userRank={userRank}/>
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
        userRank: state.homeState.rank.rank
    }
};

export default connect(mapStateToProps)(Home);