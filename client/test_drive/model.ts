import { TestDriveInstance } from "../test_drive_participation/model";
import { SAVE_TestDriveApproval_PENDING } from "./constants/ActionTypes";

export type TestCase = {
    id: number;
    title: string;
    description: string;
    expectedOutcome: string;
    isInEditMode?: boolean;
    testCaseType: string;
    scenario: string;
    priority: string;
    points: number;
    reTest: boolean;
    newItem?: boolean;
}

export type Question = {
    id: number;
    title: string;
    questionType: string;
    options: Array<string>;
    isInEditMode?: boolean;
    newItem?: boolean;
}


export type TestDrive = {
    id: number;
    title: string;
    description?: string;
    maxPoints?: number;
    startDate: string;
    endDate: string;
    expectedBusinessValue: string;
    department?: string;
    region: string[];
    location: string[];
    requiredDevices: string[];
    requiredOs: string[];
    maxTestDrivers: number;
    testCases: TestCase[];
    testCaseIDs?: number[];
    questions: Question[];
    questionIDs?: number[];
    status: string;
    level: string;
    owner?: string;
    newItem?: boolean;
    levelNumber?: number;
};

export type TestDriveIRun = {
    id: number;
    title: string;
    description?: string;
    maxPoints?: number;
    startDate: string;
    endDate: string;
    expectedBusinessValue: string;
    department?: string;
    region: string[];
    location: string[];
    requiredDevices: string[];
    requiredOs: string[];
    maxTestDrivers: number;
    testCases: TestCase[];
    testCaseIDs?: number[];
    questions: Question[];
    questionIDs?: number[];
    status: string;
    level: string;
    owner?: string;
    newItem?: boolean;
};

export type MyTestDrive = {
    id: number;
    title: string;
    description?: string;
    maxPoints?: number;
    startDate: string;
    endDate: string;
    expectedBusinessValue: string;
    department?: string;
    region: string[];
    location: string[];
    requiredDevices: string[];
    requiredOs: string[];
    maxTestDrivers: number;
    testCases: TestCase[];
    testCaseIDs?: number[];
    questions: Question[];
    questionIDs?: number[];
    status: string;
    level: string;
    owner?: string;
    newItem?: boolean;
};

export type Configurations = {
    testCasePoints: number;
    testDriveLevelsConfig: object;
    fieldDescription: object
}

export type IState = {
    testDrives: TestDrive[],
    testDrive: TestDrive,
    testCase: TestCase,
    question: Question,
    loading: boolean,
    activeTab: string,
    configurations: Configurations;
    configurationLoaded: boolean;
    myCompletedTestDrives?: MyTestDrive[],
    myCompletedTestDrivesLoading?: boolean;
    myInprogressTestDrives?: MyTestDrive[],
    myInprogressTestDrivesLoading?: boolean,
    inProgressTestDrivesIRun?: TestDriveIRun[],
    inProgressTestDrivesIRunLoading?: boolean,
    upcommingTestDrivesIRun?: TestDrive[]
    upcommingTestDrivesIRunLoading?: boolean,
    completedTestDrivesIRun?: TestDriveIRun[],
    completedTestDrivesIRunLoading?: boolean,
    draftedTestDrivesIRun?: TestDrive[],
    draftedTestDrivesIRunLoading?: boolean,
    submittedTestDrivesIRun?: TestDrive[],
    submittedTestDrivesIRunLoading?: boolean,
    activeTestDrives?: TestDrive[],
    activeTestDrivesLoading?: boolean,
    upCommingTestDrives?: TestDrive[],
    upCommingTestDrivesLoading?: boolean,
    approvedTestDrives?: TestDrive[],
    approvedTestDrivesLoading?: boolean,
    testDrivesWaitingForApproval?: TestDrive[],
    testDrivesWaitingForApprovalLoading?: boolean,
    saveTestDriveApprovalLoading?: boolean

}

