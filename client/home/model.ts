export type IState = {
    myTestDrive: HomeTestDriveObj;
    testDriveThatIRun: HomeTestDriveObj;
    upcomingTestDrive: HomeTestDriveObj;
    activeTestDrive: HomeTestDriveObj;
    leaderBoard: Leaders[];
    regionLeaderBoard: Leaders[];
    loading: boolean;
    totalCount: number;
    userPoints: number;
    totalTasks: number;
    totalTestDrives: number;
    testDrivesCompleted: number;
    eliteProfile: EliteProfile;
    rank: number;
    currentUser: any;
    currentTestDrives: number;
    avatars: string[];
    cars: string[];
    videoUrl?: string;
    profileState?: any;
}

export type HomeTestDriveObj = {
    homeTestDrives: HomeTestDrive[];
    loading: boolean;
}

export type HomeTestDrive = {
    id?: number;
    title?: string;
    enddate?: string;
    participants?: number;
    testDrive: TestDrive;
    testDriveResponse?: TestDriveResponse;
};

export type TestDriveResponse = {
    instanceID: number;
    status: string;
    currentPoint: number;
    dateJoined: string;
    numberOfTestCasesCompleted: number;
}

export type Leaders = {
    id: number;
    name: string;
    totalPoints: number;
    avatar: string;
};

export type Leader = {
    id: number;
    name: string;
    points: number;
    avatar: string;
    totalPoints: number;
    completedTestDrives: number;
    car: string;
};

export type EliteProfile = {
    eliteProfileID: number;
    accountName: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    department: string;
    sipAddress: string;
    workEmail: string;
    languages: string;
    region: string;
    carImage: string;
    carName: string;
    carID: number;
    avatarName: string;
    avatarImage: string;
    avatarID: number;
    role: string;
    dateJoined: string;
    completedTestDrives: number;
    completedTestCases: number;
    availableOS: string[];
    availableDevices: string[];
    isInEditMode: boolean;
    levelName: string;
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
    testCases: any[];
    testCaseIDs?: number[];
    questions: any[];
    questionIDs?: number[];
    status: string;
    level: string;
    owner?: string;
    newItem?: boolean;
};