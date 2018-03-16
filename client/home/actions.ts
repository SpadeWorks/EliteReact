import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import * as GlobalConstants from '../common/services/constants';
import {
  LOAD_MyTestDrive, 
  LOAD_UpcomingTestDrive, 
  LOAD_LeaderBoard, 
  LOAD_TotalUserCount, 
  LOAD_UserPoints, 
  LOAD_TotalTestDrives, 
  LOAD_TestDriveCompleted, 
  LOAD_TotalTasks, 
  LOAD_ActiveTestDrive,
  LOAD_RegionLeaderBoard,
  LOAD_UserCarImage,
  LOAD_TestDriveIRun,
  LOAD_EliteProfile,
  LOAD_Rank,
  LOAD_CurrentUser,
  LOAD_Video,
  LOAD_Prizes
} from './constants/ActionTypes';

// Test Drives action creators.

const loadMyTestDrive = createAction<any>(
  LOAD_MyTestDrive, 
  () => Services.getMyTestDrives()
)

const loadVideo = createAction(
  LOAD_Video, 
  () => Services.getVideoUrl()
)


const loadTestDriveThatIRun = createAction<any, number, number>(
  LOAD_TestDriveIRun, 
  (skip: number, top: number) => Services.getActiveTestDrivesIRun(skip, top)
)

const loadUpcomingTestDrive = createAction<any>(
  LOAD_UpcomingTestDrive, 
  () => Services.getUpcomingTestDrives()
)

const loadActiveTestDrive = createAction<any>(
  LOAD_ActiveTestDrive, 
  () => Services.getActiveTestDrives()
)

const loadLeaderBoard = createAction<any, number, number>(
  LOAD_LeaderBoard, 
  (skip: number, top: number) => Services.getGlobalLeaders(skip, top)  
)

const loadRegionLeaderBoard = createAction<any, string, number, number>(
  LOAD_RegionLeaderBoard, 
  (region: string, skip: number, top: number) => Services.getRegionalLeaders(region, skip, top)  
)

const loadCurrentUserCarImage = createAction<any>(
  LOAD_UserCarImage, 
  () => Services.getCurrentUserCarImage()  
)

const loadTotalUserCount = createAction<any>(
  LOAD_TotalUserCount, 
  () => Services.getListItemCount(GlobalConstants.Lists.USER_INFORMATION)  
)

const loadUserPoints = createAction<any, number>(
  LOAD_UserPoints, 
  (id: number) => Services.getUserPoints(id)  
)

const loadTotalTestDrives = createAction<any>(
  LOAD_TotalTestDrives, 
  () => Services.getListItemCount(GlobalConstants.Lists.TEST_DRIVES)  
)

const loadTestDrivesCompleted = createAction<any>(
  LOAD_TestDriveCompleted, 
  () => Services.getTestDrivesCompleted()  
)

const loadTotalTasks = createAction<any>(
  LOAD_TotalTasks, 
  () => Services.getListItemCount(GlobalConstants.Lists.TEST_CASES)  
)

const loadEliteProfile = createAction<any, number>(
  LOAD_EliteProfile, 
  (id: number) => Services.getEliteProfile()  
)

const getUserRank = createAction<any, number>(
  LOAD_Rank, 
  (userID: number) => Services.getUserRank(userID)  
)

const loadCurrentUser = createAction<any>(
  LOAD_CurrentUser, 
  () => Services.getUserProfileProperties()  
)

const loadPrizes = createAction<any>(
  LOAD_Prizes, 
  () => Services.getPrizes()  
)
export {
  loadMyTestDrive,
  loadUpcomingTestDrive,
  loadActiveTestDrive,
  loadLeaderBoard,
  loadRegionLeaderBoard,
  loadTotalUserCount,
  loadUserPoints,
  loadTotalTestDrives,
  loadTestDrivesCompleted,
  loadTotalTasks,
  loadCurrentUserCarImage,
  loadTestDriveThatIRun,
  loadEliteProfile,
  getUserRank,
  loadCurrentUser,
  loadVideo,
  loadPrizes
}
