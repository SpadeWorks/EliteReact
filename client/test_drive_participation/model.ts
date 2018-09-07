export type TestCaseInstance = {
    testCaseId: number;
    testDriveID?: number;
    responseID: number;
    userID: number;
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
    testCaseResponse: string;
    selectedResponse: string;
    responseStatus: string;   
    files?: any[];
    saveInProgress?: boolean;
    participants: number;
    testDriveStatus: string;
    edtiStatus: string;
    version: number;
}

export type QuestionInstance = {
    questionID: number;
    responseID: number;
    testDriveID?: number;
    title: string;
    questionType: string;
    options: Array<string>;
    isInEditMode?: boolean;
    newItem?: boolean
    responseStatus: string;
    questionResponse: string;
    selectedResponse: string;
    userID: number;
    saveInProgress: boolean;
    edtiStatus: string;
    responses: string;
    responseType: string;
    version: number;
    
}

export type RegistrationQuestionInstance = {
    questionID: number;
    responseID: number;
    testDriveID?: number;
    title: string;
    questionType: string;
    options: Array<string>;
    isInEditMode?: boolean;
    newItem?: boolean
    responseStatus: string;
    questionResponse: string;
    selectedResponse: string;
    userID: number;
    saveInProgress: boolean;
    files?: any[];
    editStatus?: string;
    version: number;
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
    department?: string[];
    region: string[];
    location: string[];
    requiredDevices: string[];
    requiredOs: string[];
    maxTestDrivers: number;
    testCases: TestCaseInstance[];
    testCaseIDs?: number[];
    questions: QuestionInstance[];
    questionIDs?: number[];
    status: string;
    level: string;
    levelName: string;
    owner?: string;
    newItem?: boolean;
    currentPoint: number;
    dateJoined: string;
    numberOfTestCasesCompleted: number;
    questionLoaded: boolean;
    loading: boolean;
    loadingMessage: string;
    testCaseSaveInProgress?: boolean;
    questionSaveInProgress?: boolean;
    isTestDriveSubmissionCompleted?: boolean;
    isSumbitInProgress: boolean;
    participants: number;
    ownerEmail: string;
    testDriveStatus: string;
    surveyStatus: string;
    joiningBonus: number;
    completionBonus: number;
    teamsChannelID?:string;
    hasRegistration: boolean;
    registrationStartDate?: string;
    registrationEndDate?: string;
    registrationQuestions?: RegistrationQuestionInstance[];
    registrationQuestionIDs?: number[];
    registrationQuestionSaveInProgress?: boolean;
    isRegistrationComplete?: boolean; 
    employeeType: string[];
    owners: owner[];
    approvalStatus: string;
    changeStatus: string;
};

export type owner = {
    ID: number;
    UserEMail: string;
    UserInfoName: string;
}

export type Configurations = {
    testCasePoints: number;
    testDriveLevelsConfig: object;
    fieldDescription: object
}

export type IState = {
    testDriveInstance: TestDriveInstance,
    loading: boolean,

}

