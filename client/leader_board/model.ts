export type IState = {
    globalLeaderBoard: {
        globalLeaders: Leader[];
        loading: boolean;
    }
    regionalLeaderBoard: {
        regionalLeaders: Leader[];
        loading: boolean;
        selectedRegion: string;
        regions: string[]; 
    }
}

export type Leader = {
    id: number;
    name: string;
    avatar: string;
    totalPoints: number;
    completedTestDrives: number;
    car: string;
};

