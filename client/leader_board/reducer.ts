import { handleActions, Action } from 'redux-actions';

import { IState, Leader } from './model';
import {
    LOAD_GlobalLeaders,
    LOAD_GlobalLeaders_FULFILLED,
    LOAD_GlobalLeaders_PENDING,
    LOAD_GlobalLeaders_REJECTED,
    LOAD_RegionLeaderBoard,
    LOAD_RegionLeaderBoard_PENDING,
    LOAD_RegionLeaderBoard_FULFILLED,
    LOAD_RegionLeaderBoard_REJECTED,
    LOAD_CurrentUserPosition,
    LOAD_CurrentUserPosition_PENDING,
    LOAD_CurrentUserPosition_FULFILLED,
    LOAD_CurrentUserRegionalPosition,
    LOAD_CurrentUserRegionalPosition_PENDING,
    LOAD_CurrentUserRegionalPosition_FULFILLED,
    LOAD_CurrentUserRegionalPosition_REJECTED
} from './constants/ActionTypes';
import { loadCurrentLeaderBoardPosition } from './index';

const initialState: IState = {
    globalLeaderBoard: {
        globalLeaders: [],
        currentUserPosition: {
            id: -1,
            name: "",
            avatar: "",
            totalPoints: 0,
            completedTestDrives: 0,
            car: "",
            rank: 0,
            region: ''
        },
        loading: false
    },

    regionalLeaderBoard: {
        regionalLeaders: [],
        currentUserPosition: {
            id: -1,
            name: "",
            avatar: "",
            totalPoints: 0,
            completedTestDrives: 0,
            car: "",
            rank: 0,
            region: ''
        },
        loading: false,
        regions: [],
        selectedRegion: ''
    }
};

export default handleActions<IState, any>({
    [LOAD_GlobalLeaders_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, loading: true }
        }
    },
    [LOAD_GlobalLeaders_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, globalLeaders: action.payload, loading: false }
        }
    },

    [LOAD_GlobalLeaders_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, loading: true }
        }
    },
    [LOAD_RegionLeaderBoard_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: { ...state.regionalLeaderBoard, regionalLeaders: [], loading: true }
        }
    },
    [LOAD_RegionLeaderBoard_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: {
                ...state.regionalLeaderBoard,
                regionalLeaders: action.payload,
                loading: false
            }
        }
    },

    [LOAD_RegionLeaderBoard_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: { ...state.regionalLeaderBoard, loading: true }
        }
    },

    [LOAD_CurrentUserPosition_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, loading: true }
        }
    },
    [LOAD_CurrentUserPosition_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: {
                ...state.globalLeaderBoard,
                currentUserPosition: action.payload,
                loading: false
            }
        }
    },

    [LOAD_RegionLeaderBoard_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, loading: false }
        }
    },


    [LOAD_CurrentUserRegionalPosition_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: { ...state.regionalLeaderBoard, loading: true }
        }
    },
    [LOAD_CurrentUserRegionalPosition_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: {
                ...state.regionalLeaderBoard,
                currentUserPosition: action.payload,
                loading: false
            }
        }
    },

    [LOAD_CurrentUserRegionalPosition_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: { ...state.regionalLeaderBoard, loading: false }
        }
    },

}, initialState);
