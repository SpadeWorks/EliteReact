import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import * as GlobalConstants from '../common/services/constants';
import {
  LOAD_GlobalLeaders,
  LOAD_RegionLeaderBoard,
  LOAD_CurrentUserRegionalPosition_FULFILLED,
  LOAD_CurrentUserRegionalPosition,
  LOAD_CurrentUserPosition
} from './constants/ActionTypes';

// Test Drives action creators.

const loadGlobalLeaderBoard = createAction<any, number, number>(
  LOAD_GlobalLeaders, 
  (skip: number, top: number) => Services.getGlobalLeaders(skip, top)  
)

const loadRegionalLeaderBoard = createAction<any, string, number, number>(
  LOAD_RegionLeaderBoard, 
  (region: string, skip: number, top: number) => Services.getRegionalLeaders(region, skip, top)  
)

const loadCurrentLeaderBoardPosition = createAction<any>(
  LOAD_CurrentUserPosition, 
  () => Services.getCurrentLeaderBoardPosition()  
)

const loadCurrentRegionalPosition = createAction<any, string>(
  LOAD_CurrentUserRegionalPosition, 
  (region: string) => Services.getCurrentLeaderBoardPosition()  
)




export {
  loadGlobalLeaderBoard,
  loadRegionalLeaderBoard,
  loadCurrentLeaderBoardPosition,
  loadCurrentRegionalPosition
}
