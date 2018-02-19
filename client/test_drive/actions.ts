import { createAction } from 'redux-actions';

import { TestDrive, TestCase, Question } from './model';
import Services from '../common/services/services';

import {
  LOAD_TestDrive,
  LOAD_TestDrives,
  DELETE_TestDrive,
  EDIT_TestDrive,
  UPDATE_TestDrive,
  SAVE_TestDrive,
  SUBMIT_TestDrive,
  LOAD_TestCases,
  ADD_TestCase,
  DELETE_TestCase,
  EDIT_TestCase,
  SAVE_TestCase,
  SUBMIT_TestCase,
  LOAD_Questions,
  ADD_Question,
  DELETE_Question,
  EDIT_Question,
  SAVE_Question,
  SUBMIT_Question,
  UPDATE_TestCase,
  SWITCH_Tab,
  UPDATE_Date,
  DATE_FocusChange,
  UPDATE_Question,
  LOAD_Configurations,
  UPDATE_MaxPoints,
  LOAD_ActiveTestDrives,
  LOAD_UpCommingTestDrives,
  LOAD_TestDrivesWaitingFormApproval,
  LOAD_ApprovedTestDrives,
  LOAD_InProgressTestDrivesIRun,
  LOAD_UpcommingTestDrivesIRun,
  LOAD_CompletedTestDrivesIRun,
  LOAD_DraftedTestDrivesIRun,
  LOAD_SubmittedTestDrivesIRun,
  LOAD_MyCompletedTestDrives,
  LOAD_MyInprogressTestDrives,
  SAVE_TestDriveApproval

} from './constants/ActionTypes';
import { LOAD_ActiveTestDrive, LOAD_UpcomingTestDrive } from '../home/constants/ActionTypes';

// Test Drives action creators.

const loadTestDrive = createAction<any, number>(
  LOAD_TestDrive,
  (testDriveId: number) => Services.getTestDriveById(testDriveId)
)

const loadTestDrives = createAction<any, number>(
  LOAD_TestDrives,
  (ownerID: number) => Services.getTestDrivesByOwerneID(ownerID, 0, 100)
);

const saveTestDrive = createAction<any, TestDrive>(
  SAVE_TestDrive,
  (testDrive: TestDrive) => {
    return Services.createOrSaveTestDrive(testDrive)
  }
);

const submitTestDrive = createAction<any, TestDrive>(
  SUBMIT_TestDrive,
  (testDrive: TestDrive) => Services.createOrSaveTestDrive(testDrive)
);

const editTestDrive = createAction<TestDrive, TestDrive>(
  EDIT_TestDrive,
  (testDrive: TestDrive) => {
    return testDrive;
  }
);

const updateTestDrive = createAction<TestDrive, any, TestDrive>(
  UPDATE_TestDrive,
  (e: any, testDrive: TestDrive) => {
    if (e.target.type && e.target.type.toLowerCase() === "select-multiple") {
      let list = e.target.selectedOptions;
      let selectedItems = [];
      for (let i = 0; i < list.length; i++) {
        selectedItems.push(list[i].value);
      }

      testDrive[e.target.name] = selectedItems;
    } else {
      testDrive[e.target.name] = e.target.value;
    }
    return testDrive;
  }
);

const updateMultiSelect = createAction<any, any, string, TestDrive>(
  UPDATE_TestDrive,
  (value: any, controlName: string, testDrive: TestDrive) => {
    testDrive[controlName] = value;
    return testDrive;
  }
)

const deleteTestDrive = createAction<any, number>(
  DELETE_TestDrive,
  (id: number) => Services.deleteTestDrive(id)
);

const updateMaxPoints = createAction(
  UPDATE_MaxPoints
);

// Test Drives Action creator ends here.

// Test Cases Action creator starts here.

const loadTestCases = createAction<any, number[]>(
  LOAD_TestCases,
  (testCaseIds: number[]) => Services.getTestCasesByIds(testCaseIds)
);

const loadConfigurations = createAction<any>(
  LOAD_Configurations,
  () => Services.getConfigurations()
)

const addTestCase = createAction(
  ADD_TestCase,
);

const editTestCase = createAction<TestCase, TestCase>(
  EDIT_TestCase,
  (testCase: TestCase) => {
    return testCase;
  }
)

const saveTestCase = createAction<TestCase, TestCase>(
  SAVE_TestCase,
  (testCase: TestCase) => {
    return testCase
  }
)

const deleteTestCase = createAction<number, number>(
  DELETE_TestCase,
  (id: number) => {
    return id;
  }
)

const updateTestCase = createAction<TestCase, any, TestCase>(
  UPDATE_TestCase,
  (e: any, testCase: TestCase) => {
    if (e.target.type && e.target.type.toLowerCase() === "select-multiple") {
      let list = e.target.selectedOptions;
      let selectedItems = [];
      for (let i = 0; i < list.length; i++) {
        selectedItems.push(list[i].value);
      }

      testCase[e.target.name] = selectedItems;
    } else {
      testCase[e.target.name] = e.target.value;
    }
    return testCase;
  }
)

///////Questions///////////

const loadQuestions = createAction<any, number[]>(
  LOAD_Questions,
  (questionIds: number[]) => Services.getQuestonsByIds(questionIds)
);

const addQuestion = createAction(
  ADD_Question
);

const editQuestion = createAction<Question, Question>(
  EDIT_Question,
  (question: Question) => {
    return question;
  }
)

const saveQuestion = createAction<Question, Question>(
  SAVE_Question,
  (question: Question) => {
    return question;
  }
)

const deleteQuestion = createAction<number, number>(
  DELETE_Question,
  (id: number) => {
    return id;
  }
)

const updateQuestion = createAction<Question, any, Question>(
  UPDATE_Question,
  (e: any, question: Question) => {
    question[e.target.name] = e.target.value;
    return question;
  }
)

/////////



const switchTab = createAction<string, string>(
  SWITCH_Tab,
  (key: string) => {
    return key;
  }
)

const updateDate = createAction<any, any>(
  UPDATE_Date,
  (dates: any) => {
    return dates;
  }
)

const onDateFocusChange = createAction<any, any>(
  DATE_FocusChange,
  (dates: any) => {
    return dates;
  }
)


// Approval related actions //

const loadTestDrivesWaitingForApproval = createAction<any, number, number>(
  LOAD_TestDrivesWaitingFormApproval,
  (skip: number, top: number) => Services.getTestDrivesWaitingForApproval(skip, top)
);

const loadApprovedTestDrives = createAction<any, number, number>(
  LOAD_ApprovedTestDrives,
  (skip: number, top: number) => Services.getApprovedTestDrives(skip, top)
);

const approveTestDrive = createAction<any, number>(
  SAVE_TestDriveApproval,
  (id: number) => Services.approveTestdrive(id)
);

// Approval related actions ends here//

// Active Test drives related action //
const loadActiveTestDrives = createAction<any, number, number>(
  LOAD_ActiveTestDrives,
  (skip: number, top: number) => Services.getActiveTestDrives(skip, top)
);
// Active Test drives related action ends here//

// Upcomming Test drives related action //
const loadUpCommingTestDrives = createAction<any, number, number>(
  LOAD_UpCommingTestDrives,
  (skip: number, top: number) => Services.getUpcomingTestDrives(skip, top)
);
// Active Test drives related action ends here//

// Test Drives I Run related action //

const loadInProgressTestDrivesIRun = createAction<any, number, number, number>(
  LOAD_InProgressTestDrivesIRun,
  (ownerID: number, skip: number, top: number) => 
    Services.getInProgressTestDrivesIRun(ownerID, skip, top)
);

const loadCompletedTestDrivesIRun = createAction<any, number, number, number>(
  LOAD_CompletedTestDrivesIRun,
  (ownerID: number, skip: number, top: number) => 
    Services.getCompletedTestDriveIRun(ownerID, skip, top)
);

const loadUpcommingTestDrivesIRun = createAction<any, number, number, number>(
  LOAD_UpcommingTestDrivesIRun,
  (ownerID: number, skip: number, top: number) => 
    Services.getUpCommingTestDriveIRun(ownerID, skip, top)
);

const loadDraftedTestDrivesIRun = createAction<any, number, number, number>(
  LOAD_DraftedTestDrivesIRun,
  (ownerID: number, skip: number, top: number) => 
    Services.getDraftedTestDrivesIRun(ownerID, skip, top)
);

const loadSubmittedTestDrivesIRun = createAction<any, number, number, number>(
  LOAD_SubmittedTestDrivesIRun,
  (ownerID: number, skip: number, top: number) => 
    Services.getDraftedTestDrivesIRun(ownerID, skip, top)
);

// Active Test drives related action ends here//

// My Test Drives related action //

const loadMyCompletedTestDrives = createAction<any, number, number>(
  LOAD_MyCompletedTestDrives,
  (skip: number, top: number) => 
    Services.getMyCompletedTestDrives(skip, top)
);

const loadMyInprogressTestDrives = createAction<any, number, number>(
  LOAD_MyInprogressTestDrives,
  (skip: number, top: number) => 
    Services.getMyTestDrives(skip, top)
);

// My Test Drives related action ends here//


export {

  deleteTestDrive,
  editTestDrive,
  saveTestDrive,
  submitTestDrive,
  updateTestDrive,
  editTestCase,
  deleteTestCase,
  saveTestCase,
  updateTestCase,
  switchTab,
  updateMultiSelect,
  updateDate,
  onDateFocusChange,
  addTestCase,
  loadTestDrive,
  editQuestion,
  saveQuestion,
  deleteQuestion,
  addQuestion,
  updateQuestion,
  loadTestDrives,
  loadTestCases,
  loadQuestions,
  loadConfigurations,
  updateMaxPoints,
  loadMyCompletedTestDrives,
  loadMyInprogressTestDrives,
  loadInProgressTestDrivesIRun,
  loadUpcommingTestDrivesIRun,
  loadCompletedTestDrivesIRun,
  loadDraftedTestDrivesIRun,
  loadSubmittedTestDrivesIRun,
  loadActiveTestDrives,
  loadUpCommingTestDrives,
  loadApprovedTestDrives,
  loadTestDrivesWaitingForApproval,
  approveTestDrive
}
