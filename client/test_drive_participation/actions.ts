import { createAction } from 'redux-actions';

import { TestDriveInstance, TestCaseInstance, QuestionInstance } from './model';
import Services from '../common/services/services';

import {
  LOAD_TestDriveInstanceByID,
  LOAD_Questions,
  CREATE_TestDriveInstance,
  CREATE_QuestionInstance,
  CREATE_TestCaseInstance,
  DELETE_Attachment,
  SUBMIT_TestDriveInstance

} from './constants/ActionTypes';
import { TestCase } from '../test_drive/model';

// Test Drives action creators.

const loadTestDriveInstanceByID = createAction<any, number, number>(
  LOAD_TestDriveInstanceByID,
  (testDriveId: number, userID: number) => Services.getTestDriveInstance(testDriveId, userID)
)

const loadQuestions = createAction<any, number, number[], number>(
  LOAD_Questions,
  (testDriveID: number, questionIDs: number[], userID: number) => 
    Services.getSurveyQuestionWithResponses(testDriveID, questionIDs, userID)
)

const createOrSaveTestDriveInstance = createAction<any, TestDriveInstance>(
  CREATE_TestDriveInstance,
  (testDriveInstance: TestDriveInstance) => Services.createOrSaveTestDriveInstance(testDriveInstance)
)

const createOrSaveQuestionInstance = createAction<any, QuestionInstance>(
  CREATE_QuestionInstance,
  (QuestionInstance: QuestionInstance) => Services.createOrSaveQuestionInstance(QuestionInstance)
)

const createOrSaveTestCaseInstance = createAction<any, TestCaseInstance, TestDriveInstance>(
  CREATE_TestCaseInstance,
  (testCaseInstance: TestCaseInstance, testDriveInstance: TestDriveInstance) => 
    Services.createOrSaveTestCaseInstance(testCaseInstance, testDriveInstance)
)

const submitTestDriveInstance = createAction<any, TestDriveInstance>(
  SUBMIT_TestDriveInstance,
  (testDriveInstance) => testDriveInstance
  
    
)

const deleteAttachment = createAction(DELETE_Attachment)

export {
  loadTestDriveInstanceByID,
  loadQuestions,
  createOrSaveTestDriveInstance,
  createOrSaveQuestionInstance,
  createOrSaveTestCaseInstance,
  deleteAttachment,
  submitTestDriveInstance
}
