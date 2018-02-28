import * as React from 'react';
import { Link } from "react-router-dom";

interface HomeLeaderBoardProps {

};
class HomeLeaderBoard extends React.Component<HomeLeaderBoardProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="col-md-4 component-container">
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
                              <img src="/sites/elite/Style%20Library/Elite/images/masc1.png" className="img-responsive"
                              />
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
                              <img src="/sites/elite/Style%20Library/Elite/images/masc2.png" className="img-responsive"
                              />
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
                              <img src="/sites/elite/Style%20Library/Elite/images/masc3.png" className="img-responsive"
                              />
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
      </div>);
    }
}

export default HomeLeaderBoard;