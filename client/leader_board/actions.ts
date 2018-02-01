import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import * as GlobalConstants from '../common/services/constants';
import {
  LOAD_GlobalLeaders,
  LOAD_RegionLeaderBoard
} from './constants/ActionTypes';

// Test Drives action creators.

const loadGlobalLeaderBoard = createAction<any>(
  LOAD_GlobalLeaders, 
  () => Services.getGlobalLeaders()  
)

const loadRegionalLeaderBoard = createAction<any, string>(
  LOAD_RegionLeaderBoard, 
  (region: string) => Services.getRegionalLeaders(region)  
)

export {
  loadGlobalLeaderBoard,
  loadRegionalLeaderBoard
}
