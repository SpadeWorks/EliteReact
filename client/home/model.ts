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
    testDrivesCompleted: number;
    totalTestDrives: number;
    userCarImage: string;
}

export type HomeTestDriveObj = {
    homeTestDrives: HomeTestDrive[];
    loading: boolean;
}

export type HomeTestDrive = {
    id: number;
    title: string;
    enddate: string;    
    participants: number;
};

export type Leaders = {
    id: number;
    name: string;
    points: number;
    avatar: string;
};

