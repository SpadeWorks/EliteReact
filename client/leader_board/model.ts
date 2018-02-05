export type IState = {
    globalLeaderBoard: globalLeaderBoard;
    regionalLeaderBoard: regionalLeaderBoard;
}

export type globalLeaderBoard = {
    globalLeaders: Leader[];
    currentUserPosition: Leader;
    loading: boolean;
}

export type regionalLeaderBoard = {
    regionalLeaders: Leader[];
    loading: boolean;
    selectedRegion: string;
    regions: string[]; 
    currentUserPosition: Leader;
}

export type Leader = {
    id: number;
    name: string;
    avatar: string;
    totalPoints: number;
    completedTestDrives: number;
    car: string;
    rank: number;
};

