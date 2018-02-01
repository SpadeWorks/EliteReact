import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import testDrive from '../test_drive';
import home from '../home';
import leaderBoard from '../leader_board';
import { reducer as uiReducer } from 'redux-ui';
import onBoarding from '../onboarding';

const rootReducer = asyncInitialState.outerReducer(combineReducers({
  testDriveState: testDrive,
  homeState: home,
  asyncInitialState: asyncInitialState.innerReducer,
  leaderBoardState: leaderBoard,
  onBoardingState: onBoarding,
  ui: uiReducer
}));

export default rootReducer;