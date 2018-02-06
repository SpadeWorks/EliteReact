import { createAction } from 'redux-actions';

import { TestDriveInstance, TestCase, Question } from './model';
import Services from '../common/services/services';

import {
  LOAD_TestDriveInstanceByID,
  CREATE_TestDriveInstance

} from './constants/ActionTypes';

// Test Drives action creators.

const loadTestDriveInstanceByID = createAction<any, number>(
  LOAD_TestDriveInstanceByID,
  (testDriveId: number) => Services.getTestDriveInstanceById(testDriveId)
)

const createOrSaveTestDriveInstance = createAction<any, TestDriveInstance>(
  CREATE_TestDriveInstance,
  (testDriveInstance: TestDriveInstance) => Services.createOrSaveTestDriveInstance(testDriveInstance)
)



export {
  loadTestDriveInstanceByID,
  createOrSaveTestDriveInstance
}
