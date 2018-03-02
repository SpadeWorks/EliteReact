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

const createEliteUserProfile = createAction<any, User>(
  CREATE_EliteProfile, 
  (user: User) => Services.createEliteUserProfile(user)
)

const completeIntro = createAction<any>(
  CompleteIntro
)

export {
  loadOnBoardingDetails,
  createEliteUserProfile,
  completeIntro
}
