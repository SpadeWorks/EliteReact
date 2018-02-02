export type IState = {
    OnBoardingDetails : {
        totalUsers: number;
        currentUser: User;
    },
    introComplete: boolean;
    loading: boolean
}


export type User = {
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
}