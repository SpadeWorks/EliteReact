import { handleActions, Action } from 'redux-actions';
import { TestDrive, TestCase, Question, IState } from './model';
import { ColumnsValues } from '../common/services/constants';
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
    LOAD_Configurations,

    LOAD_TestDrivesWaitingFormApproval_PENDING,
    LOAD_TestDrivesWaitingFormApproval_FULFILLED,
    LOAD_TestDrivesWaitingFormApproval_REJECTED,
    SAVE_TestDriveApproval_PENDING,
    SAVE_TestDriveApproval_FULFILLED,
    SAVE_TestDriveApproval_REJECTED,

    LOAD_ApprovedTestDrives_PENDING,
    LOAD_ApprovedTestDrives_FULFILLED,
    LOAD_ApprovedTestDrives_REJECTED,

    LOAD_UpCommingTestDrives_PENDING,
    LOAD_UpCommingTestDrives_FULFILLED,
    LOAD_UpCommingTestDrives_REJECTED,

    LOAD_ActiveTestDrives_PENDING,
    LOAD_ActiveTestDrives_FULFILLED,
    LOAD_ActiveTestDrives_REJECTED,

    LOAD_InProgressTestDrivesIRun_PENDING,
    LOAD_InProgressTestDrivesIRun_FULFILLED,
    LOAD_InProgressTestDrivesIRun_REJECTED,
    LOAD_CompletedTestDrivesIRun_PENDING,
    LOAD_CompletedTestDrivesIRun_FULFILLED,
    LOAD_CompletedTestDrivesIRun_REJECTED,
    LOAD_UpcommingTestDrivesIRun_PENDING,
    LOAD_UpcommingTestDrivesIRun_FULFILLED,
    LOAD_UpcommingTestDrivesIRun_REJECTED,
    LOAD_DraftedTestDrivesIRun_PENDING,
    LOAD_DraftedTestDrivesIRun_FULFILLED,
    LOAD_DraftedTestDrivesIRun_REJECTED,
    LOAD_SubmittedTestDrivesIRun_PENDING,
    LOAD_SubmittedTestDrivesIRun_FULFILLED,
    LOAD_SubmittedTestDrivesIRun_REJECTED,

    LOAD_MyInprogressTestDrives_PENDING,
    LOAD_MyInprogressTestDrives_FULFILLED,
    LOAD_MyInprogressTestDrives_REJECTED,
    LOAD_MyCompletedTestDrives_PENDING,
    LOAD_MyCompletedTestDrives_FULFILLED,
    LOAD_MyCompletedTestDrives_REJECTED,
    LOAD_CompletedTestDrivesIRun


} from './constants/ActionTypes';
import { LOAD_ActiveTestDrive_PENDING, LOAD_ActiveTestDrive_FULFILLED, LOAD_ActiveTestDrive_REJECTED, LOAD_UpcomingTestDrive_PENDING } from '../home/constants/ActionTypes';
import { UPDATE_Points_FULFILLED } from '../test_drive_participation/constants/ActionTypes';

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
        saveIsInProgress: false
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
    },
    myCompletedTestDrivesLoading: false,
    myInprogressTestDrivesLoading: false,
    inProgressTestDrivesIRunLoading: false,
    upcommingTestDrivesIRunLoading: false,
    completedTestDrivesIRunLoading: false,
    draftedTestDrivesIRunLoading: false,
    submittedTestDrivesIRunLoading: false,
    activeTestDrivesLoading: false,
    upCommingTestDrivesLoading: false,
    approvedTestDrivesLoading: false,
    testDrivesWaitingForApprovalLoading: false,
    saveTestDriveApprovalLoading: false
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
            testDrives: testDrives.filter((testDrive: any) => {
                return testDrive.testDrive.id !== action.payload;
            }),
            loading: false

        }
    },


    [SAVE_TestDrive_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            loading: true,
            isTestDriveSaveComplet: false,
            testDrive: {...state.testDrive, saveIsInProgress: true}
        }
    },

    [SAVE_TestDrive_FULFILLED]: (state: IState, action: Action<any>): IState => {
        const newTestDrive = action.payload;
        const testDrives = state.testDrives && state.testDrives.length &&
            state.testDrives.map((testDriveObj: any) => {
                if (testDriveObj.testDrive.id == newTestDrive.id) {
                    return { ...testDriveObj, testDrive: newTestDrive }
                } else {
                    return testDriveObj;
                }
            });
        return {
            ...state,
            testDrive: { ...state.testDrive, ...newTestDrive, saveIsInProgress: false },
            testDrives: testDrives || [],
            loading: false,
            isTestDriveSaveComplet: true            
        }
    },

    [SAVE_TestDrive_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            loading: false,
            isTestDriveSaveComplet: true,
            errorSaveMessage: action.payload.message
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
        let pointsForTestCase = state.configurations.testCasePoints || 10;

        return {
            ...state,
            testDrive: {
                ...state.testDrive,
                maxPoints: poinstForLevle + numberOfTestCases * pointsForTestCase + 100
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
                        <Question>{
                            isInEditMode: false,
                            questionType: action.payload.questionType,
                            id: action.payload.id,
                            newItem: action.payload.newItem,
                            options: action.payload.options,
                            title: action.payload.title,
                        } : question;
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

    [LOAD_TestDrivesWaitingFormApproval_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            testDrivesWaitingForApprovalLoading: true
        }
    },

    [LOAD_TestDrivesWaitingFormApproval_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrivesWaitingForApproval: action.payload,
            testDrivesWaitingForApprovalLoading: false
        }
    },

    [LOAD_TestDrivesWaitingFormApproval_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            testDrivesWaitingForApprovalLoading: false
        }
    },

    [SAVE_TestDriveApproval_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            saveTestDriveApprovalLoading: true
        }
    },

    [SAVE_TestDriveApproval_FULFILLED]: (state: IState, action: Action<any>): IState => {
        const readyForLaunch = ColumnsValues.READY_FOR_LAUNCH;
        const approvedTestDrives = state.testDrivesWaitingForApproval.filter(testdrive => {
            if (testdrive.id == action.payload.id &&
                action.payload.TestDriveStatus == readyForLaunch) {
                testdrive.status = action.payload.TestDriveStatus;
                return testdrive
            }
        })
        return {
            ...state,
            testDrivesWaitingForApproval: state.testDrivesWaitingForApproval &&
                state.testDrivesWaitingForApproval.filter(testdrive => {
                    return (testdrive.id != action.payload.id)
                }),
            approvedTestDrives: [...approvedTestDrives, ...state.approvedTestDrives],
            saveTestDriveApprovalLoading: false
        }
    },

    [SAVE_TestDriveApproval_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            saveTestDriveApprovalLoading: false
        }
    },

    [LOAD_ApprovedTestDrives_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            approvedTestDrivesLoading: true
        }
    },

    [LOAD_ApprovedTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            approvedTestDrives: action.payload,
            approvedTestDrivesLoading: true
        }
    },

    [LOAD_ApprovedTestDrives_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            approvedTestDrivesLoading: false
        }
    },

    [LOAD_ActiveTestDrives_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            activeTestDrivesLoading: true
        }
    },

    [LOAD_ActiveTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrives: action.payload,
            activeTestDrivesLoading: false
        }
    },

    [LOAD_ActiveTestDrives_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            activeTestDrivesLoading: false
        }
    },

    [LOAD_UpcomingTestDrive_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            upCommingTestDrivesLoading: true
        }
    },

    [LOAD_UpCommingTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upCommingTestDrives: action.payload,
            upCommingTestDrivesLoading: false
        }
    },

    [LOAD_UpCommingTestDrives_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upCommingTestDrivesLoading: false
        }
    },

    [LOAD_CompletedTestDrivesIRun_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            completedTestDrivesIRunLoading: true
        }
    },

    [LOAD_CompletedTestDrivesIRun_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            completedTestDrivesIRun: action.payload,
            completedTestDrivesIRunLoading: false
        }
    },

    [LOAD_CompletedTestDrivesIRun_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            completedTestDrivesIRunLoading: false
        }
    },

    [LOAD_UpcommingTestDrivesIRun_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            upcommingTestDrivesIRunLoading: true
        }
    },

    [LOAD_UpcommingTestDrivesIRun_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcommingTestDrivesIRun: action.payload,
            upcommingTestDrivesIRunLoading: false
        }
    },

    [LOAD_UpcommingTestDrivesIRun_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            upcommingTestDrivesIRunLoading: false
        }
    },




    [LOAD_InProgressTestDrivesIRun_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            inProgressTestDrivesIRunLoading: true
        }
    },

    [LOAD_InProgressTestDrivesIRun_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            inProgressTestDrivesIRun: action.payload,
            inProgressTestDrivesIRunLoading: false
        }
    },

    [LOAD_InProgressTestDrivesIRun_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            inProgressTestDrivesIRunLoading: false
        }
    },

    [LOAD_DraftedTestDrivesIRun_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            draftedTestDrivesIRunLoading: true
        }
    },

    [LOAD_DraftedTestDrivesIRun_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            draftedTestDrivesIRun: action.payload,
            draftedTestDrivesIRunLoading: false
        }
    },

    [LOAD_DraftedTestDrivesIRun_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            draftedTestDrivesIRunLoading: false
        }
    },

    [LOAD_SubmittedTestDrivesIRun_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            submittedTestDrivesIRunLoading: true
        }
    },

    [UPDATE_Points_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            submittedTestDrivesIRun: action.payload,
            submittedTestDrivesIRunLoading: false
        }
    },

    [LOAD_SubmittedTestDrivesIRun_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            submittedTestDrivesIRunLoading: false
        }
    },

    [LOAD_MyCompletedTestDrives_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            myCompletedTestDrivesLoading: true
        }
    },

    [LOAD_MyCompletedTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myCompletedTestDrives: action.payload,
            myCompletedTestDrivesLoading: false
        }
    },

    [LOAD_MyCompletedTestDrives_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myCompletedTestDrivesLoading: false
        }
    },

    [LOAD_MyInprogressTestDrives_PENDING]: (state: IState, action: Action<TestDrive>): IState => {
        return {
            ...state,
            myInprogressTestDrivesLoading: true
        }
    },

    [LOAD_MyInprogressTestDrives_FULFILLED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myInprogressTestDrives: action.payload,
            myInprogressTestDrivesLoading: false
        }
    },

    [LOAD_MyInprogressTestDrives_REJECTED]: (state: IState, action: Action<any>): IState => {
        return {
            ...state,
            myInprogressTestDrivesLoading: false
        }
    },


}, initialState);
