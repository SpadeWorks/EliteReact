import { createAction } from 'redux-actions';

import { TestDriveInstance, TestCase, Question } from './model';
import Services from '../common/services/services';

import {
  LOAD_TestDriveInstanceByID

} from './constants/ActionTypes';

// Test Drives action creators.

const loadTestDriveInstanceByID = createAction<any, number, number>(
  LOAD_TestDriveInstanceByID,
  (testDriveId: number, instanceID: number) => Services.getTestDriveInstanceById(testDriveId, instanceID)
)

export {
  loadTestDriveInstanceByID
}
