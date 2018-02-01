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
    LOAD_RegionLeaderBoard_REJECTED
} from './constants/ActionTypes';

const initialState: IState = {
    globalLeaderBoard: {
        globalLeaders: [],
        loading: false
    },

    regionalLeaderBoard: {
        regionalLeaders: [],
        loading: false,
        regions: [],
        selectedRegion: ''
    }
};

export default handleActions<IState, any>({
    [LOAD_GlobalLeaders_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, loading: true}
        }
    },
    [LOAD_GlobalLeaders_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { globalLeaders: action.payload, loading: false}
        }
    },

    [LOAD_GlobalLeaders_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            globalLeaderBoard: { ...state.globalLeaderBoard, loading: true}
        }
    },
    [LOAD_RegionLeaderBoard_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            regionalLeaderBoard: { ...state.regionalLeaderBoard, loading: true}
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
            regionalLeaderBoard: { ...state.regionalLeaderBoard, loading: true}
        }
    },
}, initialState);
