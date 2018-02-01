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
  updateUI: (any) => any;
  ui: any;
  globalLeaderBoard: model.globalLeaderBoard
  regionalLeaderBoard: model.regionalLeaderBoard
};

class LeaderBoardContainer extends React.Component<LeaderBoardContainerProps> {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { dispatch, globalLeaderBoard, regionalLeaderBoard, ui, updateUI } = this.props;
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
                      leaders={globalLeaderBoard.globalLeaders}
                      loadGlobalLeaderBoard={() => dispatch(loadGlobalLeaderBoard())} 
                      ui={ui}
                      updateUI={updateUI}/>
                  </div>
                  <div className="tab-pane fade" id="regional">
                    <RegionalLeaderBoard
                      leaders={regionalLeaderBoard.regionalLeaders}
                      loadRegionalLeaderBoard={(region: string) => dispatch(loadRegionalLeaderBoard(region))}
                      region={regionalLeaderBoard.selectedRegion}
                      regions={regionalLeaderBoard.regions} 
                      ui={ui}
                      updateUI={updateUI}/>
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
    globalLeaderBoard: state.leaderBoardState.globalLeaderBoard,
    regionalLeaderBoard: state.leaderBoardState.regionalLeaderBoard,

  }
};

export default connect(mapStateToProps)(LeaderBoardContainer);
