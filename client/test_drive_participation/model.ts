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


export type TestDriveInstance = {
    instanceID: number;
    testDriveID: number;
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
    currentPoint: number;
    dateJoined: string;
    numberOfTestCasesCompleted: number;
};

export type Configurations = {
    testCasePoints: number;
    testDriveLevelsConfig: object;
    fieldDescription: object
}

export type IState = {
    testDriveInstance: TestDriveInstance,
    testCase: TestCase,
    question: Question,
    loading: boolean,
    activeTab: string,
    configurations: Configurations;
    configurationLoaded: boolean;
}

