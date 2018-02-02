import { handleActions, Action } from 'redux-actions';

import { IState } from './model';
import {
    LOAD_OnBoardingDetails,
    LOAD_OnBoardingDetails_FULFILLED,
    LOAD_OnBoardingDetails_PENDING,
    LOAD_OnBoardingDetails_REJECTED,
    CompleteIntro
} from './constants/ActionTypes';

const initialState: IState = {
    OnBoardingDetails: {
        currentUser: {
            accountName: "",
            department: "",
            displayName: "",
            eliteProfileID: 3,
            firstName: "",
            languages: "",
            lastName: "",
            location: "",
            sipAddress: "",
            workEmail: '',
            region: ''
        },
        totalUsers: 0,
    },
    introComplete: false,
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
    },

    [CompleteIntro]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            introComplete: true
        }
    }

}, initialState);
