import { createAction } from 'redux-actions';

import { TestDriveInstance, TestCaseInstance, QuestionInstance } from './model';
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

const createOrSaveQuestionInstance = createAction<any, QuestionInstance>(
  CREATE_TestDriveInstance,
  (QuestionInstance: QuestionInstance) => Services.createOrSaveQuestionInstance(QuestionInstance)
)


const createOrSaveTestCaseInstance = createAction<any, TestCaseInstance>(
  CREATE_TestDriveInstance,
  (testCaseInstance: TestCaseInstance) => Services.createOrSaveTestCaseInstance(testCaseInstance)
)

export {
  loadTestDriveInstanceByID,
  createOrSaveTestDriveInstance,
  createOrSaveQuestionInstance,
  createOrSaveTestCaseInstance
}
