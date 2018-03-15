export type ReportBug = {
    id: number;
    title: string;
    description: string;
    attachments: string;
    files: any[];
    testDriveID: number;
}

export type IState = {
    reportBug: ReportBug,
    loading: boolean
}

