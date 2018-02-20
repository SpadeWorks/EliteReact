import { createAction } from 'redux-actions';
import Services from '../common/services/services';
import * as GlobalConstants from '../common/services/constants';
import {
  LOAD_EliteProfile,
  LOAD_Userrank,
  LOAD_UserPoints,
  LOAD_CurrentTestDrives,
  UPDATE_EliteProfile,
  LOAD_Configurations,
  SAVE_EliteProfile,
  LOAD_Avatars,
  LOAD_SetEditMode,
  LOAD_Cars,
  RESET_EliteProfile
} from './constants/ActionTypes';
import { EliteProfile } from '../home/model';

// My Profile action creators.
const loadEliteProfile = createAction<any, number>(
  LOAD_EliteProfile, 
  (id: number) => Services.getEliteProfileByID(id)  
)

const loadUserRank = createAction<any, number>(
  LOAD_Userrank, 
  (id: number) => Services.getUserRank(id)  
)

const loadUserPoints = createAction<any, number>(
  LOAD_UserPoints, 
  (id: number) => Services.getUserPoints(id)  
)

const loadCurrentTestDrives = createAction<any, number>(
  LOAD_CurrentTestDrives, 
  (id: number) => Services.getCurrentTestDrivesNotCompleted(id)  
)

const updateMultiSelect = createAction<any, any, string, EliteProfile>(
  UPDATE_EliteProfile,
  (value: any, controlName: string, eliteProfile: EliteProfile) => {
    eliteProfile[controlName] = value;
    return eliteProfile;
  }
)

const loadConfigurations = createAction<any>(
  LOAD_Configurations,
  () => Services.getConfigurationsEliteProfile()
)

const setEditMode = createAction(
  LOAD_SetEditMode  
)

const resetEliteProfile = createAction(
  RESET_EliteProfile
)

const loadAvatars = createAction<any>(
  LOAD_Avatars,
  () => Services.getAvatars()
)

const loadCars = createAction<any>(
  LOAD_Cars,
  () => Services.getCars()
)

const saveEliteProfile = createAction<any, EliteProfile>(
  SAVE_EliteProfile,
  (eliteProfile: EliteProfile) => {
    return Services.createOrSaveEliteProfile(eliteProfile)
  }
);

export {
  loadEliteProfile,
  loadUserRank,
  loadUserPoints,
  loadCurrentTestDrives,
  updateMultiSelect,
  loadConfigurations,
  saveEliteProfile,
  loadAvatars,
  loadCars,
  setEditMode,
  resetEliteProfile
}
