import { handleActions, Action } from 'redux-actions';

import { TestDrive, TestCase, Question, IState } from './model';
import {
    LOAD_TestDrive_PENDING,
    LOAD_TestDrive_FULFILLED,
    LOAD_TestDrives_PENDING,
    LOAD_TestDrives_FULFILLED,
    DELETE_TestDrive,
    DELETE_TestDrive_FULFILLED,
    DELETE_TestDrive_PENDING,
    EDIT_TestDrive,
    UPDATE_TestDrive,
    SAVE_TestDrive,
    SUBMIT_TestDrive,
    SAVE_TestDrive_PENDING,
    SAVE_TestDrive_FULFILLED,
    SAVE_TestDrive_REJECTED,
    SUBMIT_TestDrive_PENDING,
    SUBMIT_TestDrive_FULFILLED,
    LOAD_Configurations_FULFILLED,
    LOAD_Configurations_PENDING,
    UPDATE_MaxPoints,

    LOAD_TestCases_PENDING,
    LOAD_TestCases_FULFILLED,
    ADD_TestCase,
    DELETE_TestCase,
    EDIT_TestCase,
    SAVE_TestCase,
    UPDATE_TestCase,

    LOAD_Questions_PENDING,
    LOAD_Questions_FULFILLED,
    ADD_Question,
    DELETE_Question,
    EDIT_Question,
    SAVE_Question,
    SUBMIT_Question,
    UPDATE_Question,
    SWITCH_Tab,
    UPDATE_Date,
    DATE_FocusChange,
    LOAD_Configurations

} from './constants/ActionTypes';
import { access, stat } from 'fs';
import TestDrives from './components/TestDrives';
import { loadTestDrives } from './index';

const initialState: IState = {
    testDrive: {
        id: -1,
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
    activeTab: '1',
    configurationLoaded: false,
    configurations: {
        testCasePoints: 10,
        fieldDescription: {},
        testDriveLevelsConfig: {}
    }
};

export default handleActions<IState, any>({
    [UPDATE_TestDrive]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            testDrive: { ...state.testDrive, ...action.payload },
            loading: false,
        }
    },

    [LOAD_Configurations_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            configurationLoaded: false,
        }
    },

    [LOAD_Configurations_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            configurations: { ...state.configurations, ...action.payload },
            configurationLoaded: true,
        }
    },

    [LOAD_TestDrive_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true,
        }
    },

    [LOAD_TestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrive: { ...state.testDrive, ...action.payload },
            loading: false,
        }
    },

    [LOAD_TestDrives_PENDING]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: true,
        }
    },

    [LOAD_TestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrives: action.payload,
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

    [DELETE_TestDrive_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [DELETE_TestDrive_FULFILLED]: (state: IState, action: Action<number>): IState => {
        const testDrives = state.testDrives;
        return {
            ...state,
            testDrives: testDrives.filter((testDrive) => {
                return testDrive.id !== action.payload;
            }),
            loading: false

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
                testDrive.id == action.payload.id ? action.payload : testDrive),
            loading: false
        }
    },

    [SAVE_TestDrive_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
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

    [LOAD_TestCases_PENDING]: (state: IState, action: Action<TestCase>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [LOAD_TestCases_FULFILLED]: (state: IState, action: Action<TestCase[]>): IState => {
        return {
            ...state,
            testDrive: { ...state.testDrive, testCases: action.payload },
            loading: false
        }
    },

    [LOAD_Questions_PENDING]: (state: IState, action: Action<Question>): IState => {
        return {
            ...state,
            loading: true
        }
    },

    [LOAD_Questions_FULFILLED]: (state: IState, action: Action<Question[]>): IState => {
        return {
            ...state,
            testDrive: { ...state.testDrive, questions: action.payload },
            loading: false
        }
    },

    [UPDATE_MaxPoints]: (state: IState, action: Action<any>): IState => {
        let poinstForLevle = state.configurations.testDriveLevelsConfig[state.testDrive.level] ?
            state.configurations.testDriveLevelsConfig[state.testDrive.level].points : 0;
        let numberOfTestCases = state.testDrive.testCases && state.testDrive.testCases.length;
        numberOfTestCases = numberOfTestCases == undefined ?
            state.testDrive.testCaseIDs && state.testDrive.testCaseIDs.length : numberOfTestCases;
        let pointsForTestCase = state.configurations.testCasePoints || 10 ;
        return {
            ...state,
            testDrive: {
                ...state.testDrive,
                maxPoints: poinstForLevle + numberOfTestCases * pointsForTestCase
            },
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
            points: 100,
            newItem: true
        }
        return {
            ...state,

            testDrive: {
                ...state.testDrive,
                testCases: state.testDrive.testCases.map(testCase => {
                    return { ...testCase, isInEditMode: false }
                }).concat(testCase),
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
                ...testDrive,
                testCases: testDrive.testCases && testDrive.testCases.filter(testCase => {
                    return testCase.id !== action.payload
                }),
                testCaseIDs: testDrive.testCaseIDs && testDrive.testCaseIDs.filter(testCaseID => {
                    return testCaseID !== action.payload
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
            isInEditMode: true,
            newItem: true
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
                ...testDrive,
                questions: testDrive.questions.filter(question => {
                    return question.id !== action.payload
                }),
                questionIDs: testDrive.questionIDs.filter(id => {
                    return id !== action.payload
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
