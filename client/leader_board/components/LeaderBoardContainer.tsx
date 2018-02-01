import * as React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GlobalLeaderBoard from './GlobalLeaderBoard';
import RegionalLeaderBoard from './RegionalLeaderBoard'

import {
  model,
  loadGlobalLeaderBoard,
  loadRegionalLeaderBoard,
} from '../../leader_board';

interface LeaderBoardContainerProps {
  dispatch: Dispatch<{}>;
  globalLeaders: model.Leader[];
  regionLeaders: model.Leader[];
  region: string;
};

class LeaderBoardContainer extends React.Component<LeaderBoardContainerProps> {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {dispatch, globalLeaders, regionLeaders, region} = this.props;
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
                    <GlobalLeaderBoard 
                      leaders={globalLeaders}
                      loadGlobalLeaderBoard = {() => dispatch(loadGlobalLeaderBoard)}/>
                  </div>
                  <div className="tab-pane fade" id="regional">
                    <RegionalLeaderBoard 
                      leaders={regionLeaders}
                      loadRegionalLeaderBoard = {(region: string) => dispatch(loadRegionalLeaderBoard(region))}
                      region={region}/>
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
    globalLeaders: state.leaderBoardState.leaderBoard,
    regionLeaders: state.leaderBoardState.regionLeaderBoard,
    
  }
};

export default connect(mapStateToProps)(LeaderBoardContainer);
