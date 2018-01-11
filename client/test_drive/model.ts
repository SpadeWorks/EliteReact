export type TestCase = {
    id: number;
    title: string;
    description: string;
    expectedOutcome: string;
    isInEditMode: boolean;
    testCaseType: string;
}

export type Question = {
    id: number;
    title: string;
    questionType: string;
    options: Array<string>;
    isInEditMode: boolean;
}


export type TestDrive = {
    id: number;
    title: string;
    description?: string;
    maxPoints?: number;
    startDate: string;
    endDate: string;
    expectedBusinessValue: string;
    function: Array<string>;
    location: Array<string>;
    requiredDevices: Array<string>;
    requiredOs: Array<string>;
    maxTestDrivers: number;
    testCases: Array<TestCase>;
    questions: Array<Question>;
    status: string;
};


export type IState = {
    testDrives: TestDrive[],
    testDrive: TestDrive,
    testCase: TestCase,
    question: Question,
    loading: boolean,
    activeTab: string
}

