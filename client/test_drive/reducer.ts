import { handleActions, Action } from 'redux-actions';

import { TestDrive, TestCase, Question, IState } from './model';
import {
    LOAD_TestDrive,
    DELETE_TestDrive,
    EDIT_TestDrive,
    UPDATE_TestDrive,
    SAVE_TestDrive,
    SUBMIT_TestDrive,
    SAVE_TestDrive_PENDING,
    SAVE_TestDrive_FULFILLED,
    SUBMIT_TestDrive_PENDING,
    SUBMIT_TestDrive_FULFILLED,
    ADD_TestCase,
    DELETE_TestCase,
    EDIT_TestCase,
    SAVE_TestCase,
    UPDATE_TestCase,
    ADD_Question,
    DELETE_Question,
    EDIT_Question,
    SAVE_Question,
    SUBMIT_Question,
    UPDATE_Question,
    SWITCH_Tab,
    UPDATE_Date,
    DATE_FocusChange

} from './constants/ActionTypes';
import { access, stat } from 'fs';
import TestDrives from './components/TestDrives';

const initialState: IState = {
    testDrive: {
        id: -1,
        title: "",
        description: "",
        maxPoints: 0,
        startDate: "",
        endDate: "",
        expectedBusinessValue: "",
        function: ["Management", "Development"],
        location: ["India", "USA"],
        requiredDevices: ["Device1"],
        requiredOs: ["OS1", "OS2"],
        maxTestDrivers: 5000,
        testCases: [],
        questions: [],
        status: 'Draft'
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
    testDrives: [],
    question: {
        id: -1,
        title: '',
        questionType: '',
        options: [],
        isInEditMode: false
    },
    loading: true,
    activeTab: '1'
};

export default handleActions<IState, any>({
    [UPDATE_TestDrive]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            testDrive: { ...state.testDrive, ...action.payload },
            loading: false,
        }
    },

    [LOAD_TestDrive]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrive: { ...state.testDrive, ...action.payload },
            loading: false,
        }
    },

    [EDIT_TestDrive]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            testDrive: action.payload,
            loading: false
        }
    },

    [DELETE_TestDrive]: (state: IState, action: Action<number>): IState => {
        const testDrives = state.testDrives;
        return {
            ...state,
            testDrives: testDrives.filter((testDrive) => {
                return testDrive.id !== action.payload;
            })

        }
    },


    [SAVE_TestDrive_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [SAVE_TestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrives: state.testDrives.map(testDrive =>
                testDrive.id === action.payload.testDrive.id ? action.payload.testDrive : testDrive),
            loading: false
        }
    },

    [SUBMIT_TestDrive_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [SUBMIT_TestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrives: state.testDrives.map(testDrive =>
                testDrive.id === action.payload.testDrive.id ? action.payload.testDrive : testDrive),
            loading: false
        }
    },

    [ADD_TestCase]: (state: IState, action: Action<any>): IState => {
        const testCase = {
            id: state.testDrive.testCases.length + 1,
            title: "",
            description: "",
            expectedOutcome: "",
            isInEditMode: true,
            testCaseType: "",
            scenario: "",
            priority: "High",
            reTest: false,
            points: 100
        }
        return {
            ...state,

            testDrive: {
                ...state.testDrive, testCases: state.testDrive.testCases.map(testCase => {
                    return { ...testCase, isInEditMode: false }
                }).concat(testCase)
            },
            testCase: testCase,
            loading: false
        }
    },

    [EDIT_TestCase]: (state: IState, action: Action<TestCase>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, testCases: testDrive.testCases.map(testCase => {
                    return testCase.id === action.payload.id ?
                        { ...testCase, isInEditMode: true } :
                        { ...testCase, isInEditMode: false }
                })
            },
            testCase: { ...action.payload, isInEditMode: true }
        }
    },
    [UPDATE_TestCase]: (state: IState, action: Action<TestCase>): IState => {
        return {
            ...state,
            testCase: { ...state.testCase, ...action.payload }
        }
    },

    [SAVE_TestCase]: (state: IState, action: Action<TestCase>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, testCases: testDrive.testCases.map(testCase => {
                    return testCase.id === action.payload.id ?
                        { ...action.payload, isInEditMode: false } : testCase;
                })
            }
        }
    },

    [DELETE_TestCase]: (state: IState, action: Action<number>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, testCases: testDrive.testCases.filter(testCase => {
                    return testCase.id !== action.payload
                })
            }
        }
    },

    /////////////////
    [ADD_Question]: (state: IState, action: Action<any>): IState => {
        const question = {
            id: state.testDrive.questions.length + 1,
            title: '',
            questionType: '',
            options: [],
            isInEditMode: true
        }
        return {
            ...state,
            testDrive: {
                ...state.testDrive, questions: state.testDrive.questions.map(question => {
                    return { ...question, isInEditMode: false }
                }).concat(question)
            },
            question: question,
            loading: false
        }
    },

    [EDIT_Question]: (state: IState, action: Action<Question>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, questions: testDrive.questions.map(question => {
                    return question.id === action.payload.id ?
                        { ...question, isInEditMode: true } :
                        { ...question, isInEditMode: false }
                })
            },
            question: { ...action.payload, isInEditMode: true }
        }
    },
    [UPDATE_Question]: (state: IState, action: Action<Question>): IState => {
        return {
            ...state,
            question: { ...state.question, ...action.payload }
        }
    },

    [SAVE_Question]: (state: IState, action: Action<Question>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, questions: testDrive.questions.map(question => {
                    return question.id === action.payload.id ?
                        { ...action.payload, isInEditMode: false } : question;
                })
            }
        }
    },

    [DELETE_Question]: (state: IState, action: Action<number>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, questions: testDrive.questions.filter(question => {
                    return question.id !== action.payload
                })
            }
        }
    },
    /////////////////
    [UPDATE_Date]: (state: IState, action: Action<any>): IState => {
        const testDrive = state.testDrive;
        return {
            ...state,
            testDrive: {
                ...testDrive, startDate: action.payload.startDate, endDate: action.payload.endDate
            }
        }
    },

    [SWITCH_Tab]: (state: IState, action: Action<string>): IState => {
        return {
            ...state,
            activeTab: action.payload
        }
    },



}, initialState);
