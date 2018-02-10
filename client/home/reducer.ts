import { handleActions, Action } from 'redux-actions';

import { IState, HomeTestDrive, Leaders } from './model';
import {
    LOAD_MyTestDrive_FULFILLED,
    LOAD_MyTestDrive_PENDING,
    LOAD_MyTestDrive_REJECTED,
    LOAD_UpcomingTestDrive_PENDING,
    LOAD_UpcomingTestDrive_FULFILLED,
    LOAD_UpcomingTestDrive_REJECTED,
    LOAD_LeaderBoard_FULFILLED,
    LOAD_LeaderBoard_PENDING,
    LOAD_LeaderBoard_REJECTED,
    LOAD_TotalUserCount_FULFILLED,
    LOAD_TotalUserCount_PENDING,
    LOAD_UserPoints_FULFILLED,
    LOAD_UserPoints_PENDING,
    LOAD_TestDriveCompleted_FULFILLED,
    LOAD_TestDriveCompleted_PENDING,
    LOAD_TestDriveIRun_REJECTED,
    LOAD_ActiveTestDrive_FULFILLED,
    LOAD_ActiveTestDrive_PENDING,
    LOAD_ActiveTestDrive_REJECTED,
    LOAD_TotalTasks_FULFILLED,
    LOAD_TotalTasks_PENDING,
    LOAD_TotalTestDrives_FULFILLED,
    LOAD_TotalTestDrives_PENDING,
    LOAD_RegionLeaderBoard_PENDING,
    LOAD_RegionLeaderBoard_FULFILLED,
    LOAD_TestDriveIRun_PENDING,
    LOAD_TestDriveIRun_FULFILLED,
    LOAD_UserCarImage_PENDING,
    LOAD_EliteProfile,
    LOAD_EliteProfile_PENDING,
    LOAD_EliteProfile_FULFILLED,
    LOAD_EliteProfile_REJECTED,
    LOAD_Rank_PENDING,
    LOAD_Rank_FULFILLED,
    LOAD_Rank_REJECTED,
    LOAD_CurrentUser,
    LOAD_RegionLeaderBoard_REJECTED
} from './constants/ActionTypes';
import { access, stat } from 'fs';
import { totalmem } from 'os';
import { LOAD_TestDrive_FULFILLED } from '../test_drive/constants/ActionTypes';
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
    },
    currentUser: {},
    rank: -1

};

export default handleActions<IState, any>({
    [LOAD_MyTestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myTestDrive: { ...state.myTestDrive, loading: true },
        }
    },
    [LOAD_MyTestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myTestDrive: { homeTestDrives: action.payload, loading: false },
        }
    },
    [LOAD_MyTestDrive_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myTestDrive: { ...state.myTestDrive, loading: false },
        }
    },

    [LOAD_TestDriveIRun_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveThatIRun: { ...state.testDriveThatIRun, loading: true }
        }
    },
    [LOAD_TestDriveIRun_FULFILLED]: (state: IState, action: Action<any>): IState => {

        return {
            ...state,
            testDriveThatIRun: {
                homeTestDrives: action.payload,
                loading: false,
            },
        }
    },

    [LOAD_TestDriveIRun_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveThatIRun: { ...state.testDriveThatIRun, loading: false },
        }
    },

    [LOAD_UpcomingTestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcomingTestDrive: { ...state.upcomingTestDrive, loading: true },
        }
    },
    [LOAD_UpcomingTestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcomingTestDrive: { homeTestDrives: action.payload, loading: false },
            loading: false,
        }
    },

    [LOAD_UpcomingTestDrive_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcomingTestDrive: { ...state.upcomingTestDrive, loading: false },
        }
    },

    [LOAD_ActiveTestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrive: { ...state.upcomingTestDrive, loading: true },
        }
    },
    [LOAD_ActiveTestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrive: { homeTestDrives: action.payload, loading: false },
        }
    },

    [LOAD_ActiveTestDrive_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrive: { ...state.upcomingTestDrive, loading: false },
        }
    },

    [LOAD_LeaderBoard_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true,
        }
    },
    [LOAD_LeaderBoard_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            leaderBoard: action.payload,
            loading: false,
        }
    },

    [LOAD_RegionLeaderBoard_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true,
        }
    },
    [LOAD_RegionLeaderBoard_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionLeaderBoard: action.payload,
            loading: false,
        }
    },

    [LOAD_RegionLeaderBoard_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false,
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

    [LOAD_TotalTasks_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_TotalTasks_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            totalTasks: action.payload,
        }
    },

    [LOAD_TotalTestDrives_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_TotalTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            totalTestDrives: action.payload,
        }
    },

    [LOAD_TestDriveCompleted_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_TestDriveCompleted_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrivesCompleted: action.payload,
        }
    },

    [LOAD_EliteProfile_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
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

    [LOAD_Rank_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true
        }
    },
    [LOAD_Rank_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            rank: action.payload,
            loading: false
        }
    },
    [LOAD_Rank_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [LOAD_CurrentUser]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            currentUser: action.payload
        }
    },

}, initialState);
