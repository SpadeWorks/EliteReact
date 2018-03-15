import { handleActions, Action } from 'redux-actions';
import { IState, ReportBug } from './model';
import {
    LOAD_REPORTBUG_PENDING,
    LOAD_REPORTBUG_FULFILLED,
    LOAD_REPORTBUG_REJECTED,   
    SAVE_REPORTBUG,
    UPDATE_REPORTBUG
} from './constants/ActionTypes';
import ReportBugHome from './components/ReportBugHome';


const initialState: IState = {
    reportBug: {
        id:-1, title:"", description:"", attachments:"", testDriveID:0,
        files: [], reportedBy:0, status:""
    },
    loading: true
};

export default handleActions<IState, any>({
    [UPDATE_REPORTBUG]: (state: IState, action: Action<ReportBug>): IState => {
        return {
            ...state,
            reportBug: { ...state.reportBug, ...action.payload },
            loading: false,
        }
    },

    [LOAD_REPORTBUG_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            reportBug: state.reportBug,
            loading: true
        }
    },
    [LOAD_REPORTBUG_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            reportBug: action.payload,
            loading: false
        }
    },
    [LOAD_REPORTBUG_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },
}, initialState);
