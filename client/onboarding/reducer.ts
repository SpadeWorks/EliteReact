import { handleActions, Action } from 'redux-actions';

import { IState, HomeTestDrive, Leaders } from './model';
import {
    LOAD_OnBoardingDetails,
    LOAD_OnBoardingDetails_FULFILLED,
    LOAD_OnBoardingDetails_PENDING,
    LOAD_OnBoardingDetails_REJECTED
} from './constants/ActionTypes';

const initialState: IState = {
    OnBoardingDetails: {
        currentUser: '',
        totalUsers: 1
    },
    loading: false
};

export default handleActions<IState, any>({
    [LOAD_OnBoardingDetails_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [LOAD_OnBoardingDetails_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            OnBoardingDetails: action.payload,
            loading: false
        }
    },

    [LOAD_OnBoardingDetails_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    }

}, initialState);
