import * as React from 'react';
import { Link } from "react-router-dom";
import HomeLeaderBoard from './HomeLeaderBoard';
import Navigation from './Navigation';
import HomeLeftTestDrives from './HomeLeftTestDrives';
import HomeRightTestDrives from './HomeRightTestDrives';
import HomeCenterDetails from './HomeCenterDetails';
import UserRank from './UserRank';
import Footer from './Footer';
interface HomeProps {

};
interface HomeState {

};

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div>
            <div className="col-md-12">
                <div className="row">
                    <div className="container">
                        <h2> <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/logo.png" className="img-responsive" /> </h2>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 component-container" >
                            <Navigation />
                            <HomeLeaderBoard />
                        </div>
                        <div className="col-md-12">
                            <HomeLeftTestDrives />
                            <div className="col-md-4">
                                <h2 className="text-center center-container">Skills.Speed.Smarts. Brind it all.</h2>
                            </div>
                            <HomeRightTestDrives />
                            <HomeCenterDetails />
                        </div>
                        <UserRank />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Home;
