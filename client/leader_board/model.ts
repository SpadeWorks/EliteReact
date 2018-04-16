export type IState = {
    globalLeaderBoard: globalLeaderBoard;
    regionalLeaderBoard: regionalLeaderBoard;
}

export type globalLeaderBoard = {
    globalLeaders: Leader[];
    currentUserPosition: Leader;
    loading: boolean;
    currentUserPositionLoading: boolean
}

export type regionalLeaderBoard = {
    regionalLeaders: Leader[];
    loading: boolean;
    selectedRegion: string;
    regions: string[]; 
    currentUserPosition: Leader;
    currentUserPositionLoading: boolean
}

export type Leader = {
    id: number;
    name: string;
    avatar: string;
    totalPoints: number;
    completedTestDrives: number;
    car: string;
    rank: number;
    region: string;
};

