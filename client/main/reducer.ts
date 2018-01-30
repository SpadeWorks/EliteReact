import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import testDrive from '../test_drive';
import home from '../home';
import { reducer as uiReducer } from 'redux-ui'

const rootReducer = asyncInitialState.outerReducer(combineReducers({
  testDriveState: testDrive,
  homeState: home,
  asyncInitialState: asyncInitialState.innerReducer,
  ui: uiReducer
}));

export default rootReducer;