import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import testDrive from '../test_drive';
import home from '../home';
import profile from '../profile';
import leaderBoard from '../leader_board';
import { reducer as uiReducer } from 'redux-ui';
import onBoarding from '../onboarding';
import participation from '../test_drive_participation';

const rootReducer = asyncInitialState.outerReducer(combineReducers({
  testDriveState: testDrive,
  homeState: home,
  asyncInitialState: asyncInitialState.innerReducer,
  leaderBoardState: leaderBoard,
  onBoardingState: onBoarding,
  participationState: participation,
  profileState: profile,
  ui: uiReducer
}));

export default rootReducer;
