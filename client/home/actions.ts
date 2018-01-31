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
} from './constants/ActionTypes';

// Test Drives action creators.

const loadMyTestDrive = createAction<any>(
  LOAD_MyTestDrive, 
  () => Services.getMyTestDrives()
)

const loadTestDriveThatIRun = createAction<any>(
  LOAD_TestDriveIRun, 
  () => Services.getTestDrivesIRun()
)

const loadUpcomingTestDrive = createAction<any>(
  LOAD_UpcomingTestDrive, 
  () => Services.getUpcomingTestDrives()
)

const loadActiveTestDrive = createAction<any>(
  LOAD_ActiveTestDrive, 
  () => Services.getActiveTestDrives()
)

const loadLeaderBoard = createAction<any>(
  LOAD_LeaderBoard, 
  () => Services.getLeaderBoard()  
)

const loadRegionLeaderBoard = createAction<any>(
  LOAD_RegionLeaderBoard, 
  () => Services.getLeaderBoardRegion()  
)

const loadCurrentUserCarImage = createAction<any>(
  LOAD_UserCarImage, 
  () => Services.getCurrentUserCarImage()  
)

const loadTotalUserCount = createAction<any>(
  LOAD_TotalUserCount, 
  () => Services.getListItemCount(GlobalConstants.Lists.USER_INFORMATION)  
)

const loadUserPoints = createAction<any>(
  LOAD_UserPoints, 
  () => Services.getCurrentUserPoints()  
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
  loadTestDriveThatIRun
}
