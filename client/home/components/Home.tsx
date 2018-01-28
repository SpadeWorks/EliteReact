import * as React from 'react';
import { Link } from "react-router-dom";
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
            {/* <div>Home</div>
            <div>
                <ul>
                    <li>
                        <Link to={"/testdrive"}>Create Test Drive</Link>
                    </li>
                    <li>
                        <Link to={"/testdrives"}>TestDrives</Link>
                    </li>
                </ul>
            </div> */}
            <div className="col-md-12">
                <div className="row">
                    <div className="container">
                        <h2> <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/logo.png" className="img-responsive" /> </h2>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 component-container" >
                            <div className="col-md-8 component-container">
                                <div className="map_container">
                                    <object>
                                        <embed src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/track.svg" />
                                            <a href="#" id="link1" className="maplinks">
                                                <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/testdrivecenter.png" />
                                                <span>test drieves central</span>
                                            </a>
                                            <a href="#" id="link2" className="maplinks">
                                                <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" />
                                                <span>Refer a friend</span>
                                            </a>
                                            <a href="#" id="link3" className="maplinks">
                                                <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/refer.png" />
                                                <span>My Profile</span>
                                            </a>
                                            <a href="#" id="link4" className="maplinks">
                                                <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/Prizes.png" />
                                                <span>Prizes</span>
                                            </a>
                                            <a href="#" id="link5" className="maplinks">
                                                <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/leaderboard.png" />
                                                <span>Leaderboard</span>
                                            </a>
                                            <a href="#" id="link6" className="maplinks">
                                                <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/video.png" />
                                                <span>Video</span>
                                            </a>
                                        {/* </embed> */}
                                    </object>
                                </div>
                            </div>
                            <div className="col-md-4 component-container">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="well">
                                            <ul className="nav nav-tabs">
                                                <li className="active">
                                                    <a href="#regional" data-toggle="tab">REGIONAL LEADERBOARD</a>
                                                </li>
                                                <li className="pull-right">
                                                    <a href="#global" data-toggle="tab">GLOBAL LEADERBOARD</a>
                                                </li>
                                            </ul>
                                            <div id="myTabContent" className="tab-content">
                                                <div className="tab-pane active in" id="regional">
                                                    <div className="col-md-12">
                                                        <div className="row test_drive">
                                                            <a href="#">
                                                                <div className="col-md-12 leader_box">
                                                                    <div className="leader_rank">
                                                                        <span>1</span>
                                                                    </div>
                                                                    <div className="col-md-12 leader_name">
                                                                        <div className="avatar">
                                                                            <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc1.png" className="img-responsive" />
                                                                        </div>
                                                                        <div className="col-md-9 l_count_box">
                                                                            <div className="col-md-12 name">
                                                                                Monica Breadford
                                            </div>
                                                                            <div className="col-md-8 count pull-right">
                                                                                <div className="row">
                                                                                    <p className="orange">POINTS:</p>
                                                                                    <p className="digits"> 45454</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a href="#">
                                                                <div className="col-md-12 leader_box">
                                                                    <div className="leader_rank">
                                                                        <span>2</span>
                                                                    </div>
                                                                    <div className="col-md-12 leader_name">
                                                                        <div className="avatar">
                                                                            <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc2.png" className="img-responsive" />
                                                                        </div>
                                                                        <div className="col-md-9 l_count_box">
                                                                            <div className="col-md-12 name">
                                                                                Leesa Lee
                                            </div>
                                                                            <div className="col-md-8 count pull-right">
                                                                                <div className="row">
                                                                                    <p className="orange">POINTS:</p>
                                                                                    <p className="digits"> 45454</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a href="#">
                                                                <div className="col-md-12 leader_box">
                                                                    <div className="leader_rank">
                                                                        <span>3</span>
                                                                    </div>
                                                                    <div className="col-md-12 leader_name">
                                                                        <div className="avatar">
                                                                            <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/masc3.png" className="img-responsive" />
                                                                        </div>
                                                                        <div className="col-md-9 l_count_box">
                                                                            <div className="col-md-12 name">
                                                                                Matthew Roggers
                                            </div>
                                                                            <div className="col-md-8 count pull-right">
                                                                                <div className="row">
                                                                                    <p className="orange">POINTS:</p>
                                                                                    <p className="digits"> 45454</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a href="#" className="pull-right"> MORE >></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="global">
                                                    <h1>tab2</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-4 black_box home-tab-container" >
                                <div className="row">
                                    <div className="well">
                                        <ul className="nav nav-tabs">
                                            <li className="active">
                                                <a href="#home" data-toggle="tab">MY TEST DRIVES</a>
                                            </li>
                                            <li className="pull-right">
                                                <a href="#profile" data-toggle="tab">TEST DRIEVES I RUN</a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane active in" id="home">
                                                <div className="col-md-12">
                                                    <div className="row test_drive driveno1">
                                                        <div className="col-md-10">
                                                            <a className="drive_name">
                                                                <h4 className="test_one">Skype for Bussiness
                                        <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true"></span>
                                                                </h4>
                                                            </a>
                                                            <p>
                                                                <span className="end_date">END DATE :</span> MAR 13, 2018</p>
                                                            <p>
                                                                <span className="participants">PARTICIPANTS :</span> 800</p>
                                                        </div>
                                                        <div className="col-md-2 pull-right">
                                                            <div className="lc_container">
                                                                <div className="white_circle"></div>
                                                                <div className="col-md-12 lc-box" ></div>
                                                                <div className="col-md-12 lc-box-height"></div>
                                                            </div>
                                                        </div>
                                                        <div className="letest_drivebox"></div>
                                                    </div>
                                                    <div className="row test_drive driveno2">
                                                        <div className="col-md-10">
                                                            <h4 className="test_two">Skype for Bussiness
                                    <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true"></span>
                                                            </h4>
                                                            <p>
                                                                <span className="end_date">END DATE :</span> MAR 13, 2018</p>
                                                            <p>
                                                                <span className="participants">PARTICIPANTS :</span> 800</p>
                                                        </div>
                                                        <div className="col-md-2 pull-right">
                                                            <div className="lc_container">
                                                                <div className="white_circle"></div>
                                                                <div className="col-md-12 lc-box"></div>
                                                                <div className="col-md-12 lc-box-height"></div>
                                                            </div>
                                                        </div>

                                                        <div className="letest_drivebox"></div>
                                                    </div>
                                                    <div className="row test_drive driveno3">
                                                        <div className="col-md-10">
                                                            <h4 className="test_three">Skype for Bussiness
                                    <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true"></span>
                                                            </h4>
                                                            <p>
                                                                <span className="end_date">END DATE :</span> MAR 13, 2018</p>
                                                            <p>
                                                                <span className="participants">PARTICIPANTS :</span> 800</p>
                                                        </div>
                                                        <div className="col-md-2 pull-right">
                                                            <div className="lc_container">
                                                                <div className="white_circle"></div>
                                                                <div className="col-md-12 lc-box"></div>
                                                                <div className="col-md-12 lc-box-height"></div>
                                                            </div>
                                                        </div>
                                                        <div className="letest_drivebox"></div>
                                                    </div>
                                                    <a href="#" className="pull-right"> MORE &gt;&gt;</a>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile">
                                                <h1>tab2</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <h2 className="text-center center-container">Skills.Speed.Smarts. Brind it all.</h2>
                            </div>
                            <div className="col-md-4 black_box_right pull-right black_box">
                                <div className="row">
                                    <div className="well">
                                        <ul className="nav nav-tabs">
                                            <li className="active">
                                                <a href="#up_drives" data-toggle="tab">UPCOMING TEST DRIVES</a>
                                            </li>
                                            <li className="pull-right">
                                                <a href="#active_drives" data-toggle="tab">ACTIVE TEST DRIVES</a>
                                            </li>
                                        </ul>
                                        <div id="myTabContent" className="tab-content">
                                            <div className="tab-pane active in" id="up_drives">
                                                <div className="col-md-12">
                                                    <div className="row test_drive">
                                                        <div className="col-md-2">
                                                            <div className="lc_container2">
                                                                <div className="white_circle2"></div>
                                                                <div className="col-md-12 lc-box"></div>
                                                                <div className="col-md-12 lc-box-height"></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-10 text-right">
                                                            <a className="drive_name">
                                                                <h4>Wit.ai
                                        <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true"></span>
                                                                </h4>
                                                            </a>
                                                            <p>
                                                                <span className="end_date">END DATE :</span> MAR 13, 2018</p>
                                                            <p>
                                                                <span className="participants">PARTICIPANTS :</span> 800</p>
                                                        </div>
                                                    </div>
                                                    <div className="row test_drive">
                                                        <div className="col-md-2"> </div>
                                                        <div className="col-md-10 text-right">
                                                            <a data-toggle="modal" data-target=".letest_drivebox" className="drive_name">
                                                                <h4>IBM Watson
                                        <span className="glyphicon glyphicon-triangle-right hidden" aria-hidden="true"></span>
                                                                </h4>
                                                            </a>
                                                            <p>
                                                                <span className="end_date">END DATE :</span> MAR 13, 2018</p>
                                                            <p>
                                                                <span className="participants">PARTICIPANTS :</span> 800</p>
                                                        </div>
                                                    </div>
                                                    <div className="row test_drive">
                                                        <div className="col-md-2"> </div>
                                                        <div className="col-md-10 text-right">
                                                            <a data-toggle="modal" data-target=".letest_drivebox" className="drive_name">
                                                                <h4>IBM Watson
                                        <span className="glyphicon glyphicon-triangleN-right hidden" aria-hidden="true"></span>
                                                                </h4>
                                                            </a>
                                                            <p>
                                                                <span className="end_date">END DATE :</span> MAR 13, 2018</p>
                                                            <p>
                                                                <span className="participants">PARTICIPANTS :</span> 800</p>
                                                        </div>
                                                    </div>
                                                    <a href="#" className="pull-right"> MORE &gt;&gt;</a>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="active_drives">
                                                <h1>tab2</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-12 users-count-meter">
                                <div className="col-md-2">
                                    <div className="row tuser_count">
                                        <div className="col-md-12 text-center">
                                            <h4>TOTAL USERS</h4>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <h2>1547</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div id="jqmeter-vertical2"></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="c_ride">
                                        <div className="col-md-3">
                                            <div className="col-md-12 text-center">
                                                <h4>TEST DRIEVES COMPLETED</h4>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <h2>1547</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="current_ridebox">
                                                <div className="col-md-12 text-center">
                                                    <h4>YOUR CURRENT RIDE</h4>
                                                </div>
                                                <div className="col-md-12 text-center">
                                                    <img src="http://intranet.spdev.equinix.com/sites/elite-dev-akash/Style%20Library/Elite/images/current_ride.png" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="col-md-12 text-center">
                                                <h4>TOTAL USERS</h4>
                                            </div>
                                            <div className="col-md-12">
                                                <h2>1547</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 t_testdrive">
                                    <h4>TOTAL TEST DRIVES</h4>
                                    <div id="outer">
                                        <div id="inner">
                                        </div>
                                    </div>
                                    <div className="tdrivecount">
                                        <h3>540</h3>
                                    </div>
                                    <div className="total_tasks">
                                        <h4>TOTAL TASKS</h4>
                                        <div className="number">
                                            <canvas id="canvas" width="100" height="100"></canvas>
                                            <h3>1200</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="line_box">
                                        </div>
                                        <div className="player_box">
                                            <div className="col-md-4 testd_box">
                                                <p>
                                                    <span className="testd_count">76 </span>
                                                    <span className="glyphicon glyphicon-triangle-top" aria-hidden="true"></span> +1</p>
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
        </div>);
    }
}

export default Home;
