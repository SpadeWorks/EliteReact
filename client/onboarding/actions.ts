import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import * as GlobalConstants from '../common/services/constants';
import {
  LOAD_OnBoardingDetails,
  CompleteIntro,
  CREATE_EliteProfile
} from './constants/ActionTypes';

import {User} from './model';
// Test Drives action creators.

const loadOnBoardingDetails = createAction<any>(
  LOAD_OnBoardingDetails, 
  () => Services.getOnboardingDetails()
)

const createEliteUserProfile = createAction<any, User, string>(
  CREATE_EliteProfile, 
  (user: User, referrerID: string) => Services.createEliteUserProfile(user, referrerID)
)

const completeIntro = createAction<any>(
  CompleteIntro
)

export {
  loadOnBoardingDetails,
  createEliteUserProfile,
  completeIntro
}
