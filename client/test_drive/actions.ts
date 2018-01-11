import { createAction } from 'redux-actions';

import { TestDrive, TestCase, Question } from './model';
import TestDriveApi from './api/mockApi';

import {
  LOAD_TestDrive,
  DELETE_TestDrive,
  EDIT_TestDrive,
  UPDATE_TestDrive,
  SAVE_TestDrive,
  SUBMIT_TestDrive,
  ADD_TestCase,
  DELETE_TestCase,
  EDIT_TestCase,
  SAVE_TestCase,
  SUBMIT_TestCase,
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

const loadTestDrive = createAction<any, TestDrive>(
  LOAD_TestDrive,
  (testDrive: TestDrive) => {
    return testDrive;
  }
);

const saveTestDrive = createAction<any, TestDrive>(
  SAVE_TestDrive,
  (testDrive: TestDrive) => {
    return testDrive.id === -1 ? TestDriveApi.createTestDrive(testDrive) : TestDriveApi.saveTestDrive(testDrive)
  }
);

const submitTestDrive = createAction<any, TestDrive>(
  SUBMIT_TestDrive,
  (testDrive: TestDrive) => TestDriveApi.submitTestDrive(testDrive)
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
  updateQuestion
}
