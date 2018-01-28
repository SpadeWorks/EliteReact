import * as React from 'react';
import { Link } from "react-router-dom";

interface HomeRightTestDrivesProps {

};
class HomeRightTestDrives extends React.Component<HomeRightTestDrivesProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-4 black_box_right pull-right black_box">
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
        </div>)
    }
}

export default HomeRightTestDrives;
