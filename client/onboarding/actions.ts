import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import * as GlobalConstants from '../common/services/constants';
import {
  LOAD_OnBoardingDetails
} from './constants/ActionTypes';

// Test Drives action creators.

const loadOnBoardingDetails = createAction<any>(
  LOAD_OnBoardingDetails, 
  () => Services.getOnboardingDetails()
)

export {
  loadOnBoardingDetails
}
