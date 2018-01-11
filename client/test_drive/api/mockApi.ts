import Promise from "ts-promise";
import delay from './delay';
import { TestDrive } from '../model';


const data = [
  {
    id: 1,
    title: "Test Drive 1",
    description: "Test Drive Description",
    maxPoints: 100,
    startDate: "2017-12-27",
    endDate: "2017-12-27",
    expectedBusinessValue: "Expected Business Values 1",
    function: [{ function: 'function 1', name: 'function 1' },
    { function: 'function 2', name: 'function 2' }],
    location: ["India", "USA"],
    requiredDevices: ["Device1", "Device2"],
    requiredOs: ["OS1", "OS2"],
    maxTestDrivers: 5000,
    testCases: [{
      id: 1,
      title: "Test Case 1",
      description: "Test Case Description",
      expectedOutcome: "Test Case expected values.",
      isInEditMode: false,
      testCaseType: "Choice"
    },
    {
      id: 2,
      title: "Test Case 2",
      description: "Test Case Description",
      expectedOutcome: "Test Case expected values.",
      isInEditMode: false,
      testCaseType: "Choice"
    },
    {
      id: 3,
      title: "Test Case 3",
      description: "Test Case Description",
      expectedOutcome: "Test Case expected values.",
      isInEditMode: false,
      testCaseType: "Choice"
    }
    ],
    questions: []
  },
  {
    id: 2,
    title: "Test Drive 2",
    description: "Test Drive Description",
    maxPoints: 100,
    startDate: "2017-12-27",
    endDate: "2017-12-27",
    expectedBusinessValue: "Expected Business Values 1",
    function: ["Management", "Development"],
    location: ["India", "USA"],
    requiredDevices: ["Device1", "Device2"],
    requiredOs: ["OS1", "OS2"],
    maxTestDrivers: 5000,
    testCases: [],
    questions: []
  },
  {
    id: 3,
    title: "Test Drive 3",
    description: "Test Drive Description",
    maxPoints: 100,
    startDate: "2017-12-27",
    endDate: "2017-12-27",
    expectedBusinessValue: "Expected Business Values 1",
    function: ["Management", "Development"],
    location: ["India", "USA"],
    requiredDevices: ["Device1"],
    requiredOs: ["OS1", "OS2"],
    maxTestDrivers: 5000,
    testCases: [],
    questions: []
  },
  {
    id: 4,
    title: "Test Drive 4",
    description: "Test Drive Description",
    maxPoints: 100,
    startDate: "2017-12-27",
    endDate: "2017-12-27",
    expectedBusinessValue: "Expected Business Values 1",
    function: ["Management", "Development"],
    location: ["India", "USA"],
    requiredDevices: ["Device1", "Device2"],
    requiredOs: ["OS1", "OS2"],
    maxTestDrivers: 5000,
    testCases: [],
    questions: []
  },
];

class TestDriveApi {
  private static KEYS = {
    TEST_DRIVE_ID: "TEST_DRIVE",
    TEST_CASE_ID: "TEST_CASE_ID"
  }

  static saveTestDrive(testDrive: TestDrive) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 'OK', testDrive });
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
        resolve({...data[0], id: id });
      }, delay);
    });
  }

  static getFunctions() {
    return new Promise((resolve, reject) => {
      const data = [
        { function: 'Function 1', name: 'Function 1' },
        { function: 'Function 2', name: 'Function 2' },
        { function: 'Function 3', name: 'Function 3' },
        { function: 'Function 4', name: 'Function 4' },
        { function: 'Function 5', name: 'Function 5' },
        { function: 'Function 6', name: 'Function 6' },
        { function: 'Function 7', name: 'Function 7' },
        { function: 'Function 8', name: 'Function 8' },
        { function: 'Function 9', name: 'Function 9' },
      ];
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getLocations() {
    return new Promise((resolve, reject) => {
      const data = [
        { location: 'Location 1', name: 'Location 1' },
        { location: 'Location 2', name: 'Location 2' },
        { location: 'Location 3', name: 'Location 3' },
        { location: 'Location 4', name: 'Location 4' },
        { location: 'Location 5', name: 'Location 5' },
        { location: 'Location 6', name: 'Location 6' },
        { location: 'Location 7', name: 'Location 7' },
        { location: 'Location 8', name: 'Location 8' },
        { location: 'Location 9', name: 'Location 9' },
      ]

      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getDevices() {
    return new Promise((resolve, reject) => {
      const data = [
        { device: 'Device 1', name: 'Device 1' },
        { device: 'Device 2', name: 'Device 2' },
        { device: 'Device 3', name: 'Device 3' },
        { device: 'Device 4', name: 'Device 4' },
        { device: 'Device 5', name: 'Device 5' },
        { device: 'Device 6', name: 'Device 6' },
        { device: 'Device 7', name: 'Device 7' },
        { device: 'Device 8', name: 'Device 8' },
        { device: 'Device 9', name: 'Device 9' },
      ]

      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }

  static getOSes() {
    return new Promise((resolve, reject) => {
      const data = [
        { os: 'OS 1', name: 'OS 1' },
        { os: 'OS 2', name: 'OS 2' },
        { os: 'OS 3', name: 'OS 3' },
        { os: 'OS 4', name: 'OS 4' },
        { os: 'OS 5', name: 'OS 5' },
        { os: 'OS 6', name: 'OS 6' },
        { os: 'OS 7', name: 'OS 7' },
        { os: 'OS 8', name: 'OS 8' },
        { os: 'OS 9', name: 'OS 9' },
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

export default TestDriveApi;
