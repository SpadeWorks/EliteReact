import { handleActions, Action } from 'redux-actions';
import { IState, EliteProfile } from '../home/model';
import {
    LOAD_EliteProfile_PENDING,
    LOAD_EliteProfile_FULFILLED,
    LOAD_EliteProfile_REJECTED,
    LOAD_Userrank_PENDING,
    LOAD_Userrank_FULFILLED,
    LOAD_Userrank_REJECTED,
    LOAD_UserPoints_FULFILLED,
    LOAD_UserPoints_PENDING,
    LOAD_CurrentTestDrives_PENDING,
    LOAD_CurrentTestDrives_FULFILLED,
    UPDATE_EliteProfile,
    SAVE_EliteProfile_PENDING,
    SAVE_EliteProfile_FULFILLED,
    SAVE_EliteProfile_REJECTED,
    LOAD_Avatars_PENDING,
    LOAD_Avatars_FULFILLED,
    LOAD_Avatars_REJECTED,
    LOAD_SetEditMode,
    LOAD_Cars_PENDING,
    LOAD_Cars_FULFILLED,
    LOAD_Cars_REJECTED,
    RESET_EliteProfile
} from './constants/ActionTypes';

import {    
    LOAD_TotalUserCount_FULFILLED,
    LOAD_TotalUserCount_PENDING    
} from '../home/constants/ActionTypes';
import { access, stat } from 'fs';
import { totalmem } from 'os';
import { loadEliteProfile } from './index';


const initialState: IState = {
    myTestDrive: { homeTestDrives: [], loading: false },
    testDriveThatIRun: { homeTestDrives: [], loading: false },
    upcomingTestDrive: { homeTestDrives: [], loading: false },
    activeTestDrive: { homeTestDrives: [], loading: false },
    leaderBoard: [],
    regionLeaderBoard: [],
    loading: true,
    totalCount: 0,
    userPoints: 0,
    totalTasks: 0,
    testDrivesCompleted: 0,
    totalTestDrives: 0,
    eliteProfile: {
        eliteProfileID: -1,
        accountName: "",
        firstName: "",
        lastName: "",
        displayName: "",
        location: "",
        department: "",
        sipAddress: "",
        workEmail: "",
        languages: "",
        region: "",
        carImage: "",
        carName: "",
        carID: -1,
        avatarName: "",
        avatarImage: "",
        avatarID: -1,
        role: "",
        dateJoined: "",
        completedTestCases: 0,
        completedTestDrives: 0,
        availableOS: [],
        availableDevices: [],
        isInEditMode: false,
        levelName: ""
    },
    currentUser: {},
    rank: -1,
    currentTestDrives: 0,
    avatars: [],
    cars: []
};

export default handleActions<IState, any>({
    [LOAD_EliteProfile_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            eliteProfile: state.eliteProfile,
            loading: true
        }
    },
    [LOAD_EliteProfile_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            eliteProfile: action.payload,
            loading: false
        }
    },
    [LOAD_EliteProfile_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [RESET_EliteProfile]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            eliteProfile: undefined
        }
    },

    [LOAD_Userrank_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true
        }
    },
    [LOAD_Userrank_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            rank: action.payload.rank,
            totalTestDrives: action.payload.totalTestDrives,
            loading: false
        }
    },
    [LOAD_Userrank_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [LOAD_UserPoints_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_UserPoints_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            userPoints: action.payload,
        }
    },

    [LOAD_TotalUserCount_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_TotalUserCount_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            totalCount: action.payload,
        }
    },

    [LOAD_CurrentTestDrives_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_CurrentTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            currentTestDrives: action.payload,
        }
    },
    [UPDATE_EliteProfile]: (state: IState, action: Action<EliteProfile>): IState => {
        return {
            ...state,
            eliteProfile: { ...state.eliteProfile, ...action.payload },
            loading: false,
        }
    },

    [LOAD_Avatars_PENDING]: (state: IState, action: Action<EliteProfile>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [LOAD_Avatars_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            avatars: action.payload,
            loading: false
        }
    },

    [LOAD_Avatars_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [LOAD_Cars_PENDING]: (state: IState, action: Action<EliteProfile>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [LOAD_Cars_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            cars: action.payload,
            loading: false
        }
    },

    [LOAD_Cars_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [LOAD_SetEditMode]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            eliteProfile: {
                ...state.eliteProfile,
                isInEditMode: true
            }
        }
    },

}, initialState);
