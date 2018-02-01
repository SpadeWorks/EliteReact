export type IState = {
    globalLeaderBoard: globalLeaderBoard;
    regionalLeaderBoard: regionalLeaderBoard;
}

export type globalLeaderBoard = {
    globalLeaders: Leader[];
    loading: boolean;
}

export type regionalLeaderBoard = {
    regionalLeaders: Leader[];
    loading: boolean;
    selectedRegion: string;
    regions: string[]; 
}

export type Leader = {
    id: number;
    name: string;
    avatar: string;
    totalPoints: number;
    completedTestDrives: number;
    car: string;
};

