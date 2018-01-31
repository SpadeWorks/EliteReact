import * as React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  model,
  loadLeaderBoard,
  loadRegionLeaderBoard,
} from '../../home';

interface LeaderBoardProps {
  dispatch: Dispatch<{}>;
  globalLeaders: model.Leader[];
  regionLeaders: model.Leader[];
};

class LeaderBoard extends React.Component<LeaderBoardProps> {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.dispatch(loadLeaderBoard());
    this.props.dispatch(loadRegionLeaderBoard());
  }

  render() {
    return (<div className="col-md-12">
      <div className="row">
        <div className="container">
          <Link to={"/"} >
            <h2>
              <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span> My Profile</h2>
          </Link>
        </div>
        <div className="col-md-12" style={{ overflow: "auto" }}>
          <div className="col-md-12" style={{ height: "900px", background: "#020202de" }}>
            <div className="col-md-12 profile_box" style={{ height: "500px" }}>
              <div className="well count_box">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#global" data-toggle="tab">Global Leaderboard</a>
                  </li>
                  <li>
                    <a href="#regional" data-toggle="tab">Regional Leaderboard</a>
                  </li>
                </ul>
                <div id="myTabContent" className="tab-content">
                  <div className="tab-pane active in leadership_box" id="global">
                    <div className="col-md-12">
                      <div className="row test_drive leader_listbox">
                        <div className="col-md-12 leader_box">
                          <div className="leader_rank">
                            <span>1</span>
                          </div>
                          <div className="col-md-11 leader_name">
                            <div className="col-md-3 leader_namenphoto">
                              <img src="images/masc1.png" />
                              <h4>Monica Breadford </h4>
                            </div>
                            <div className="col-md-3 leader_car">
                              <img src="images/car.png" />
                            </div>
                            <div className="col-md-3">
                              <div className="col-md-12 point_box">
                                <span className="orange">
                                  <i>292</i>
                                </span>
                              </div>
                              <div className="col-md-12 drive_status">
                                <span className="gray_count">Test Drive Completed</span>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="col-md-12 point_box">
                                <span className="orange">
                                  <i>99,580</i>
                                </span>
                              </div>
                              <div className="col-md-12 drive_status">
                                <span className="gray_count">Total Points</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row test_drive leader_listbox">
                      <div className="col-md-12">
                        <div className="row test_drive leader_listbox">
                          <div className="col-md-12 leader_box">
                            <div className="leader_rank">
                              <span>2</span>
                            </div>
                            <div className="col-md-11 leader_name">
                              <div className="col-md-3 leader_namenphoto">
                                <img src="images/masc1.png" />
                                <h4>Monica Breadford </h4>
                              </div>
                              <div className="col-md-3 leader_car">
                                <img src="images/car.png" />
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>292</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Test Drive Completed</span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>99,580</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Total Points</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row test_drive leader_listbox">
                      <div className="col-md-12">
                        <div className="row test_drive leader_listbox">
                          <div className="col-md-12 leader_box">
                            <div className="leader_rank">
                              <span>3</span>
                            </div>
                            <div className="col-md-11 leader_name">
                              <div className="col-md-3 leader_namenphoto">
                                <img src="images/masc1.png" />
                                <h4>Monica Breadford </h4>
                              </div>
                              <div className="col-md-3 leader_car">
                                <img src="images/car.png" />
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>292</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Test Drive Completed</span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>99,580</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Total Points</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row test_drive leader_listbox">
                      <div className="col-md-12">
                        <div className="row test_drive leader_listbox">
                          <div className="col-md-12 leader_box">
                            <div className="leader_rank">
                              <span>4</span>
                            </div>
                            <div className="col-md-11 leader_name">
                              <div className="col-md-3 leader_namenphoto">
                                <img src="images/masc1.png" />
                                <h4>Monica Breadford </h4>
                              </div>
                              <div className="col-md-3 leader_car">
                                <img src="images/car.png" />
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>292</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Test Drive Completed</span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>99,580</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Total Points</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row test_drive leader_listbox">
                      <div className="col-md-12">
                        <div className="row test_drive leader_listbox">
                          <div className="col-md-12 leader_box">
                            <div className="leader_rank">
                              <span>5</span>
                            </div>
                            <div className="col-md-11 leader_name">
                              <div className="col-md-3 leader_namenphoto">
                                <img src="images/masc1.png" />
                                <h4>Monica Breadford </h4>
                              </div>
                              <div className="col-md-3 leader_car">
                                <img src="images/car.png" />
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>292</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Test Drive Completed</span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="col-md-12 point_box">
                                  <span className="orange">
                                    <i>99,580</i>
                                  </span>
                                </div>
                                <div className="col-md-12 drive_status">
                                  <span className="gray_count">Total Points</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="regional">
                    <h1>tab2</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 footer" style={{ height: "50px", background: "#000" }}>
          <p className="text-right">&copy; 2018 Equinix inc. All rights reserved.</p>
        </div>
      </div>
    </div>)
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    globalLeaders: state.homeState.leaderBoard,
    regionLeaders: state.homeState.regionLeaderBoard,
  }
};

export default connect(mapStateToProps)(LeaderBoard);
