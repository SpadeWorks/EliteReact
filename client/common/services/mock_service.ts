
import Promise from "ts-promise";
import delay from './delay';
import { TestDrive, Question, TestCase } from '../../test_drive/model';

export const data = [
  {
    id: 1,
    title: "Test Drive 1",
    description: "Test Drive Description",
    maxPoints: 100,
    startDate: "2017-12-27",
    endDate: "2017-12-27",
    expectedBusinessValue: "Expected Business Values 1",
    function: [],
    location: ["India", "USA"],
    requiredDevices: ["Device1", "Device2"],
    requiredOs: ["OS1", "OS2"],
    maxTestDrivers: 5000,
    status: "Draft",
    testCases: [{
      id: 1,
      title: "Test Case 1",
      description: "Test Case Description",
      expectedOutcome: "Test Case expected values.",
      isInEditMode: false,
      testCaseType: "Choice",
      scenario: "Test Case Senario 1",
      priority: "High",
      points: 100,
      reTest: false

    },
    {
      id: 2,
      title: "Test Case 2",
      description: "Test Case Description",
      expectedOutcome: "Test Case expected values.",
      isInEditMode: false,
      testCaseType: "Choice",
      scenario: "Test Case Senario 1",
      priority: "High",
      points: 100,
      reTest: false

    },
    {
      id: 3,
      title: "Test Case 3",
      description: "Test Case Description",
      expectedOutcome: "Test Case expected values.",
      isInEditMode: false,
      testCaseType: "Choice",
      scenario: "Test Case Senario 1",
      priority: "High",
      points: 100,
      reTest: false

    }
    ],
    questions: [{
      id: 1,
      title: "Question1",
      questionType: "choice",
      options: ["yes", "no"],
      isInEditMode: false
    },
    {
      id: 2,
      title: "Comments",
      questionType: "comments",
      options: [],
      isInEditMode: false
    }]
  }
];

class Services {
  private static KEYS = {
    TEST_DRIVE_ID: "TEST_DRIVE",
    TEST_CASE_ID: "TEST_CASE_ID"
  }

  static getCurrentUserID() {
    return 1; //TODO 
  }

  static getTestDrivesByOwerneID(ownerID: number) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  static getTestCasesByIds(testCaseIDs: number[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data[0].testCases);
      }, delay);
    });
  }

  static getQuestonsByIds(questionIDs: number[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data[0].questions);
      }, delay);
    });
  }

  static createOrSaveTestDrive(testDrive: TestDrive) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 'OK', testDrive });
      }, delay);
    });
  }

  static createTestCase(testCases: TestCase[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 'OK', testCases });
      }, delay);
    });
  }

  static createQuestions(questions: Question[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 'OK', questions });
      }, delay);
    });
  }

  static uploadImage() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { link: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' } });
      }, delay);
    });
  }


  static generateID(key: string) {
    const id = localStorage.getItem(key);
    if (id) {
      return parseInt(id, 10) + 1;
    } else {
      localStorage.setItem(key, "0");
      return 0;
    }
  }

  static createTestDrive(testDrive: TestDrive) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        testDrive.id = this.generateID(this.KEYS.TEST_DRIVE_ID);
        resolve({ status: 'OK', testDrive });
      }, delay);
    });
  }

  static submitTestDrive(testDrive: TestDrive) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 'OK', testDrive });
      }, delay);
    });
  }


  static getTestDrives() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getTestDriveById(id: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ...data[0], id: id });
      }, delay);
    });
  }

  static getRegions() {
    return new Promise((resolve, reject) => {
      const data = [
        { Label: 'Region 1', TermGuid: 'Region 1' },
        { Label: 'Region 2', TermGuid: 'Region 2' },
        { Label: 'Region 3', TermGuid: 'Region 3' },
        { Label: 'Region 4', TermGuid: 'Region 4' },
        { Label: 'Region 5', TermGuid: 'Region 5' },
        { Label: 'Region 6', TermGuid: 'Region 6' },
        { Label: 'Region 7', TermGuid: 'Region 7' },
        { Label: 'Region 8', TermGuid: 'Region 8' },
        { Label: 'Region 9', TermGuid: 'Region 9' },
      ];
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getLocations() {
    return new Promise((resolve, reject) => {
      const data = [
        { Label: 'Location 1', TermGuid: 'Location 1' },
        { Label: 'Location 2', TermGuid: 'Location 2' },
        { Label: 'Location 3', TermGuid: 'Location 3' },
        { Label: 'Location 4', TermGuid: 'Location 4' },
        { Label: 'Location 5', TermGuid: 'Location 5' },
        { Label: 'Location 6', TermGuid: 'Location 6' },
        { Label: 'Location 7', TermGuid: 'Location 7' },
        { Label: 'Location 8', TermGuid: 'Location 8' },
        { Label: 'Location 9', TermGuid: 'Location 9' },
      ]

      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getDevices() {
    return new Promise((resolve, reject) => {
      const data = [
        { Label: 'Device 1', TermGuid: 'Device 1' },
        { Label: 'Device 2', TermGuid: 'Device 2' },
        { Label: 'Device 3', TermGuid: 'Device 3' },
        { Label: 'Device 4', TermGuid: 'Device 4' },
        { Label: 'Device 5', TermGuid: 'Device 5' },
        { Label: 'Device 6', TermGuid: 'Device 6' },
        { Label: 'Device 7', TermGuid: 'Device 7' },
        { Label: 'Device 8', TermGuid: 'Device 8' },
        { Label: 'Device 9', TermGuid: 'Device 9' },
      ]

      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getOSes() {
    return new Promise((resolve, reject) => {
      const data = [
        { Label: 'OS 1', TermGuid: 'OS 1' },
        { Label: 'OS 2', TermGuid: 'OS 2' },
        { Label: 'OS 3', TermGuid: 'OS 3' },
        { Label: 'OS 4', TermGuid: 'OS 4' },
        { Label: 'OS 5', TermGuid: 'OS 5' },
        { Label: 'OS 6', TermGuid: 'OS 6' },
        { Label: 'OS 7', TermGuid: 'OS 7' },
        { Label: 'OS 8', TermGuid: 'OS 8' },
        { Label: 'OS 9', TermGuid: 'OS 9' },
      ]

      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static formatDate(date: string) {
    let today = date && date.toLowerCase() !== "today" ? new Date(date) : new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }
}

export default Services;
