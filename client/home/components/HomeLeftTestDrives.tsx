import * as React from 'react';
import { Link } from "react-router-dom";

interface HomeLeftTestDrivesProps {

};
class HomeLeftTestDrives extends React.Component<HomeLeftTestDrivesProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-4 black_box home-tab-container">
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
                                            <div className="col-md-12 lc-box"></div>
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
        </div>)
    }
}

export default HomeLeftTestDrives;
