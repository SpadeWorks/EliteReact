import { createAction } from 'redux-actions';

import { TestDriveInstance, TestCaseInstance, Question } from './model';
import Services from '../common/services/services';

import {
  LOAD_TestDriveInstanceByID,
  CREATE_TestDriveInstance

} from './constants/ActionTypes';

// Test Drives action creators.

const loadTestDriveInstanceByID = createAction<any, number, number>(
  LOAD_TestDriveInstanceByID,
  (testDriveId: number, userID: number) => Services.getTestDriveInstance(testDriveId, userID)
)

const createOrSaveTestDriveInstance = createAction<any, TestDriveInstance>(
  CREATE_TestDriveInstance,
  (testDriveInstance: TestDriveInstance) => Services.createOrSaveTestDriveInstance(testDriveInstance)
)



export {
  loadTestDriveInstanceByID,
  createOrSaveTestDriveInstance
}
