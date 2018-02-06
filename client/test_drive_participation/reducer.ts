import { handleActions, Action } from 'redux-actions';
import { TestDriveInstance, TestCase, Question, IState } from './model';
import {
    LOAD_TestDriveInstanceByID_PENDING,
    LOAD_TestDriveInstanceByID_FULFILLED,
    LOAD_TestDriveInstanceByID_REJECTED,
    CREATE_TestDriveInstance_PENDING,
    CREATE_TestDriveInstance_FULFILLED,
    CREATE_TestDriveInstance_REJECTED

} from './constants/ActionTypes';

const initialState: IState = {
    testDriveInstance: {
        testDriveID: -1,
        instanceID: -1,
        title: "",
        description: "",
        maxPoints: 0,
        startDate: "",
        endDate: "",
        expectedBusinessValue: "",
        region: [],
        location: [],
        requiredDevices: [],
        requiredOs: [],
        maxTestDrivers: 5000,
        testCases: [],
        questions: [],
        status: 'Draft',
        level: 'Level1',
        currentPoint: 0,
        dateJoined: "",
        department: "",
        numberOfTestCasesCompleted: 0,
        questionIDs: [],
        testCaseIDs: []
        
    },
    testCase: {
        id: -1,
        title: "",
        description: "",
        expectedOutcome: "",
        isInEditMode: false,
        testCaseType: "",
        scenario: "",
        priority: "High",
        reTest: false,
        points: 100

    },
    question: {
        id: -1,
        title: '',
        questionType: '',
        options: [],
        isInEditMode: false
    },
    loading: true,
    activeTab: '1',
    configurationLoaded: false,
    configurations: {
        testCasePoints: 10,
        fieldDescription: {},
        testDriveLevelsConfig: {}
    }
};

export default handleActions<IState, any>({
    [LOAD_TestDriveInstanceByID_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading:true
        }
    },
    [LOAD_TestDriveInstanceByID_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: action.payload,
            loading:false
        }
    },

    [LOAD_TestDriveInstanceByID_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [CREATE_TestDriveInstance_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading:true
        }
    },
    [CREATE_TestDriveInstance_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: action.payload,
            loading:false
        }
    },

    [CREATE_TestDriveInstance_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },
}, initialState);
