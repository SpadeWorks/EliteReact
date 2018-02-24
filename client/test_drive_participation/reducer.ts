import { handleActions, Action } from 'redux-actions';
import * as Constants from '../common/services/constants';
import { TestDriveInstance, TestCaseInstance, QuestionInstance, IState } from './model';
import {
    LOAD_TestDriveInstanceByID_PENDING,
    LOAD_TestDriveInstanceByID_FULFILLED,
    LOAD_TestDriveInstanceByID_REJECTED,
    LOAD_Questions_PENDING,
    LOAD_Questions_FULFILLED,
    LOAD_Questions_REJECTED,
    CREATE_TestDriveInstance_PENDING,
    CREATE_TestDriveInstance_FULFILLED,
    CREATE_TestDriveInstance_REJECTED,
    CREATE_TestCaseInstance,
    CREATE_TestCaseInstance_FULFILLED,
    CREATE_TestCaseInstance_REJECTED,
    CREATE_QuestionInstance_FULFILLED,
    CREATE_TestCaseInstance_PENDING,
    CREATE_QuestionInstance_PENDING,
    CREATE_QuestionInstance_REJECTED,
    DELETE_Attachment,
    DELETE_Attachment_FULFILLED,
    SUBMIT_TestDriveInstance_PENDING,
    SUBMIT_TestDriveInstance_FULFILLED,
    SUBMIT_TestDriveInstance_REJECTED

} from './constants/ActionTypes';
import { submitTestDrive } from '../test_drive/index';

const initialState: IState = {
    testDriveInstance: {
        testDriveID: 0,
        instanceID: 0,
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
        status: Constants.ColumnsValues.INPROGRESS,
        level: 'Level1',
        currentPoint: 0,
        dateJoined: "",
        department: "",
        numberOfTestCasesCompleted: 0,
        questionIDs: [],
        testCaseIDs: [],
        questionLoaded: false,
        loading: false,
        loadingMessage: 'Loading...',
        questionSaveInProgress: false,
        testCaseSaveInProgress: false,
        isSumbitInProgress: false

    },
    loading: true,
};

export default handleActions<IState, any>({
    [LOAD_TestDriveInstanceByID_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true
        }
    },
    [LOAD_TestDriveInstanceByID_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: action.payload,
            loading: false
        }
    },

    [LOAD_TestDriveInstanceByID_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [LOAD_Questions_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                loading: true,
                loadingMessage: 'Loading questions...'
            }
        }
    },
    [LOAD_Questions_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                questions: action.payload,
                questionLoaded: true
            },
            loading: false
        }
    },

    [LOAD_Questions_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [CREATE_TestDriveInstance_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true
        }
    },
    [CREATE_TestDriveInstance_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance, ...action.payload
            },
            loading: false
        }
    },

    [CREATE_TestDriveInstance_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false
        }
    },

    [CREATE_TestCaseInstance_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                testCaseSaveInProgress: true
            }

        }
    },
    [CREATE_TestCaseInstance_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                testCaseSaveInProgress: false,
                numberOfTestCasesCompleted: action.payload.testDriveInstance.numberOfTestCasesCompleted,
                currentPoint: action.payload.testDriveInstance.currentPoint,
                testCases: state.testDriveInstance.testCases.map(testCase => {
                    return testCase.testCaseId == action.payload.testCaseInstance.testCaseId ?
                        action.payload.testCaseInstance : testCase;
                })
            },
            loading: false
        }
    },

    [CREATE_TestCaseInstance_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                testCaseSaveInProgress: false
            }
        }
    },

    [CREATE_QuestionInstance_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                questionSaveInProgress: true
            }
        }
    },
    [CREATE_QuestionInstance_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                questionSaveInProgress: false,
                questions: state.testDriveInstance.questions.map(question => {
                    return question.questionID == action.payload.questionID ?
                        action.payload : question;
                })
            },
            loading: false
        }
    },

    [CREATE_QuestionInstance_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                questionSaveInProgress: false
            }
        }
    },

    [SUBMIT_TestDriveInstance_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                isTestDriveSubmissionCompleted: false,
                isSumbitInProgress: true
                
            }
        }
    },
    [SUBMIT_TestDriveInstance_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                currentPoint: action.payload.currentPoint,
                numberOfTestCasesCompleted: action.payload.numberOfTestCasesCompleted,
                isTestDriveSubmissionCompleted: true,
                status: action.payload.status,
                isSumbitInProgress: false
            },
            loading: false
        }
    },

    [SUBMIT_TestDriveInstance_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                isTestDriveSubmissionCompleted: false,
                isSumbitInProgress: false
            }
        }
    },

    [DELETE_Attachment_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDriveInstance: {
                ...state.testDriveInstance,
                testCases: state.testDriveInstance.testCases.map(testCase => {
                    if (testCase.testCaseId == action.payload.testCaseId) {
                        return testCase.files = action.payload.files
                    }
                    else {
                        return testCase
                    }
                })
            }
        }
    },
}, initialState);
