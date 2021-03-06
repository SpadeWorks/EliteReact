import * as React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GlobalLeaderBoard from './GlobalLeaderBoard';
import RegionalLeaderBoard from './RegionalLeaderBoard'
<<<<<<< HEAD
import { Tabs, Pane } from '../../common/components/Tabs';
import Services from '../../common/services/services';
=======
import Loader from 'react-loader-advanced';
import { Tabs, Pane } from '../../common/components/Tabs';
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
import {
  model,
  loadGlobalLeaderBoard,
  loadRegionalLeaderBoard,
  loadCurrentLeaderBoardPosition,
  loadCurrentRegionalPosition
} from '../../leader_board';

interface LeaderBoardContainerProps {
  dispatch: Dispatch<{}>;
  updateUI: (any) => any;
  ui: any;
  globalLeaderBoard: model.globalLeaderBoard
  regionalLeaderBoard: model.regionalLeaderBoard,
  activeTab: string;

};

class LeaderBoardContainer extends React.Component<LeaderBoardContainerProps> {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    document.body.className = "plane_back";
  }

  getSelectedTab() {
    switch (this.props.activeTab.toLowerCase()) {
      case 'global':
        return 0;
      case 'regional':
        return 1;
    }
  }

  render() {
    const { dispatch, globalLeaderBoard, regionalLeaderBoard, ui, updateUI } = this.props;
    return (<div className="col-md-12">
      <div className="row">
        <div className="container header_part">
<<<<<<< HEAD
          <h2 className="header_prevlink"> <a href="javascript:;" onClick={() => Services.goBack()}>
            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Leaderboard
                 </a>
          </h2>
          <h4 className="cancel-btn"><Link to={"/"}>CANCEL</Link></h4>
        </div>
        <div className="col-md-12">
=======
          <h2> <Link to={"/"} >

            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>Leaderboard
                 </Link>
          </h2>

        </div>
        <div className="col-md-12" style={{ overflow: "auto" }}>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
          <div className="container big_leaderbox">
            <div className="col-md-12 profile_box">
              <div className="well count_box">
                <Tabs selected={this.getSelectedTab()}>
                  <Pane label="Global Leaderboard">
<<<<<<< HEAD
                    <GlobalLeaderBoard
                      loading={globalLeaderBoard.loading}
                      leaders={globalLeaderBoard.globalLeaders}
                      loadGlobalLeaderBoard={(skip, top) => dispatch(loadGlobalLeaderBoard(skip, top))}
                      loadCurrentLeaderBoardPosition={() => dispatch(loadCurrentLeaderBoardPosition())}
                      ui={ui}
                      updateUI={updateUI}
                      currentUser={globalLeaderBoard.currentUserPosition}
                      currentUserPositionLoading = {globalLeaderBoard.currentUserPositionLoading} />
                  </Pane>
                  <Pane label="Regional Leaderboard">
                    <RegionalLeaderBoard
                      loading={regionalLeaderBoard.loading}
                      leaders={regionalLeaderBoard.regionalLeaders}
                      loadRegionalLeaderBoard={(region: string, skip: number, top: number) => dispatch(loadRegionalLeaderBoard(region, skip, top))}
                      ui={ui}
                      updateUI={updateUI}
                      currentUser={regionalLeaderBoard.currentUserPosition}
                      loadCurrentRegionalPosition={(region: string) => dispatch(loadCurrentRegionalPosition(region))} 
                      currentUserPositionLoading = {globalLeaderBoard.currentUserPositionLoading}/>
=======
                    <Loader show={globalLeaderBoard.loading} message={'Loading...'}>
                      <GlobalLeaderBoard
                        leaders={globalLeaderBoard.globalLeaders}
                        loadGlobalLeaderBoard={(skip, top) => dispatch(loadGlobalLeaderBoard(skip, top))}
                        loadCurrentLeaderBoardPosition={() => dispatch(loadCurrentLeaderBoardPosition())}
                        ui={ui}
                        updateUI={updateUI}
                        currentUser={globalLeaderBoard.currentUserPosition} />
                    </Loader>
                  </Pane>
                  <Pane label="Regional Leaderboard">
                    <Loader show={regionalLeaderBoard.loading} message={'Loading...'}>
                      <RegionalLeaderBoard
                        leaders={regionalLeaderBoard.regionalLeaders}
                        loadRegionalLeaderBoard={(region: string, skip: number, top: number) => dispatch(loadRegionalLeaderBoard(region, skip, top))}
                        ui={ui}
                        updateUI={updateUI}
                        currentUser={regionalLeaderBoard.currentUserPosition}
                        loadCurrentRegionalPosition={(region: string) => dispatch(loadCurrentRegionalPosition(region))} />
                    </Loader>
>>>>>>> 526be23a3863531322114b1396c62b6fc68d77cc
                  </Pane>
                </Tabs>
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
  let activeTab = ownProps.match.params.activeTab;
  return {
    globalLeaderBoard: state.leaderBoardState.globalLeaderBoard,
    regionalLeaderBoard: state.leaderBoardState.regionalLeaderBoard,
    activeTab: activeTab || 'global'
  }
};

export default connect(mapStateToProps)(LeaderBoardContainer);
