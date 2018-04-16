import { handleActions, Action } from 'redux-actions';

import { IState } from './model';
import {
    LOAD_OnBoardingDetails,
    LOAD_OnBoardingDetails_FULFILLED,
    LOAD_OnBoardingDetails_PENDING,
    LOAD_OnBoardingDetails_REJECTED,

    CREATE_EliteProfile_PENDING,
    CREATE_EliteProfile_FULFILLED,
    CREATE_EliteProfile_REJECTED

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
            region: '',
            role: ''
        },
        totalUsers: 0,
    },
    introComplete: false,
    loading: false,
    isUserCreated: false
};

export default handleActions<IState, any>({
    [LOAD_OnBoardingDetails_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true,
            isUserCreated: false,
        }
    },

    [LOAD_OnBoardingDetails_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            OnBoardingDetails: action.payload,
            isUserCreated: true,
            loading: false
        }
    },

    [LOAD_OnBoardingDetails_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [CREATE_EliteProfile_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true,
            isUserCreated: false,
        }
    },

    [CREATE_EliteProfile_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            isUserCreated: true,
            loading: false
        }
    },

    [CREATE_EliteProfile_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

}, initialState);
