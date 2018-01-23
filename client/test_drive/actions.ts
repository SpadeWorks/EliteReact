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
  UPDATE_Question

} from './constants/ActionTypes';

// Test Drives action creators.

const loadTestDrive = createAction<any, number>(
  LOAD_TestDrive,
  (testDriveId: number) => Services.getTestDriveById(testDriveId)
)

const loadTestDrives = createAction<any, number>(
  LOAD_TestDrives,
  (ownerID: number) => Services.getTestDrivesByOwerneID(ownerID)
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

const updateMultiSelect = createAction<any, any, TestDrive>(
  UPDATE_TestDrive,
  (value: any, testDrive: TestDrive) => {
    if (value[0].hasOwnProperty('function') === true) {
      testDrive['function'] = value;
    } else if (value[0].hasOwnProperty('location') === true) {
      testDrive['location'] = value;
    } else if (value[0].hasOwnProperty('device') === true) {
      testDrive['requiredDevices'] = value;
    } else if (value[0].hasOwnProperty('os') === true) {
      testDrive['requiredOs'] = value;
    }
    return testDrive;
  }
)

const deleteTestDrive = createAction<number, number>(
  DELETE_TestDrive,
  (id: number) => {
    return id;
  }
);

// Test Drives Action creator ends here.

// Test Cases Action creator starts here.

const loadTestCases = createAction<any, number[]>(
  LOAD_TestCases,
  (testCaseIds: number[]) => Services.getTestCasesByIds(testCaseIds)
);

const addTestCase = createAction(
  ADD_TestCase
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
    if (e.target.type && e.target.type.toLowerCase() === "select-multiple") {
      let list = e.target.selectedOptions;
      let selectedItems = [];
      for (let i = 0; i < list.length; i++) {
        selectedItems.push(list[i].value);
      }

      question[e.target.name] = selectedItems;
    } else {
      question[e.target.name] = e.target.value;
    }
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
  loadQuestions
}
