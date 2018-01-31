import { handleActions, Action } from 'redux-actions';

import { IState, HomeTestDrive, Leaders } from './model';
import {
    LOAD_MyTestDrive_FULFILLED,
    LOAD_MyTestDrive_PENDING,
    LOAD_UpcomingTestDrive_PENDING,
    LOAD_UpcomingTestDrive_FULFILLED,
    LOAD_LeaderBoard_FULFILLED,
    LOAD_LeaderBoard_PENDING,
    LOAD_TotalUserCount_FULFILLED,
    LOAD_TotalUserCount_PENDING,
    LOAD_UserPoints_FULFILLED,
    LOAD_UserPoints_PENDING,
    LOAD_TestDriveCompleted_FULFILLED,
    LOAD_TestDriveCompleted_PENDING,
    LOAD_ActiveTestDrive_FULFILLED,
    LOAD_ActiveTestDrive_PENDING,
    LOAD_TotalTasks_FULFILLED,
    LOAD_TotalTasks_PENDING,
    LOAD_TotalTestDrives_FULFILLED,
    LOAD_TotalTestDrives_PENDING,
    LOAD_RegionLeaderBoard_PENDING,
    LOAD_RegionLeaderBoard_FULFILLED,        
    LOAD_TestDriveIRun_PENDING,
    LOAD_TestDriveIRun_FULFILLED,
    LOAD_UserCarImage_PENDING,
    LOAD_UserCarImage_FULFILLED
} from './constants/ActionTypes';
import { access, stat } from 'fs';
import { totalmem } from 'os';
import { LOAD_TestDrive_FULFILLED } from '../test_drive/constants/ActionTypes';

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
    userCarImage: "",
};

export default handleActions<IState, any>({
    [LOAD_MyTestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myTestDrive: { ...state.myTestDrive, loading: true }
        }
    },
    [LOAD_MyTestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myTestDrive: { homeTestDrives: action.payload, loading: false },
            loading: false,
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
            testDriveThatIRun: { homeTestDrives: action.payload, loading: false },
            loading: false,
        }
    },

    [LOAD_UpcomingTestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcomingTestDrive: { ...state.upcomingTestDrive, loading: false },
        }
    },
    [LOAD_UpcomingTestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcomingTestDrive: { homeTestDrives: action.payload, loading: false },
            loading: false,
        }
    },

    [LOAD_ActiveTestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrive: { ...state.upcomingTestDrive, loading: false },
        }
    },
    [LOAD_ActiveTestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrive: { homeTestDrives: action.payload, loading: false },
            loading: false,
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

    [LOAD_UserCarImage_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
        }
    },
    [LOAD_UserCarImage_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            userCarImage: action.payload,
        }
    },

}, initialState);
