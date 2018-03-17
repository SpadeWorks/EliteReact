
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, Store, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import * as asyncInitialState from 'redux-async-initial-state';
import Promise from "ts-promise";
import ManageTestDrive from './test_drive/components/ManageTestDrive';
import Home from './home/components/Home';
import rootReducer from './main/reducer';
import TestDrivesCentralContainer from './main/components/TestDrivesCentralContainer';
import Prizes from './home/components/Prizes';
import Video from './home/components/Video';
import ReportBugHome from './report_bug/components/ReportBugHome';
import LeaderBoardContainer from './leader_board/components/LeaderBoardContainer';
import Profile from './profile/components/Profile';
import MyProfile from './profile/components/MyProfile';
import Services from './common/services/services';
import Intro from './onboarding/components/Intro';
import OnBoarding from './onboarding/components/OnBoarding';
import TestDriveParticipation from './test_drive_participation/components/TestDriveParticipation';
import TestDriveParticipationContainer from './main/components/TestDriveParticipationContainer';
const initialState = {};

const loadStore = (currentState) => {
  return new Promise(resolve => {
    Services.getApplicationConfigurations().then((data) => {
      resolve({
        ...currentState,
        testDriveState: {
          ...currentState.testDriveState,
          appConfig: data,
          loading: false
        }
      });
    });
  });
}

const store: Store<any> = createStore(rootReducer,
  compose(applyMiddleware(
    // asyncInitialState.middleware(loadStore),
    thunkMiddleware,
    promiseMiddleware()
  )));

let user = Services.getUserProfileProperties();
let application;
if (user.eliteProfileID) {
  application = (<Provider store={store}>
    <HashRouter basename="/" >
      <div> 
        <Switch>
          <Route exact path="/testdrive" component={ManageTestDrive} />
          <Route exact path="/testdrive/:id" component={ManageTestDrive} />
          <Route exact path="/testdrives" component={TestDrivesCentralContainer} />
          <Route exact path="/testdrives/:activeTab" component={TestDrivesCentralContainer} />
          <Route exact path="/leaderboard/" component={LeaderBoardContainer} />
          <Route exact path="/leaderboard/:activeTab" component={LeaderBoardContainer} />
          <Route exact path="/video" component={Video} />
          <Route exact path="/prizes" component={Prizes} />
          <Route exact path="/profile/:id" component={MyProfile} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/participation/:id" component={TestDriveParticipationContainer} />
          <Route exact path="/testDriveDetails/:id/:instanceID" component={TestDriveParticipationContainer} />
          <Route path="/reportbug/:id" component={ReportBugHome} />
          <Route path="/" component={Home} />          
        </Switch>
      </div>
    </HashRouter>
  </Provider>)
} else {
  application = (<Provider store={store}>
    <HashRouter basename="/" >
      <div>
        <Switch>
          <Route exact path="/" component={OnBoarding} />
          <Route exact path="/:referrerID" component={OnBoarding} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>)
}

ReactDOM.render(
  application,
  document.getElementById('app')
);