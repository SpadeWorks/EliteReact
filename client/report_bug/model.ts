export type ReportBug = {
    id: number;
    title: string;
    description: string;
    attachments: string;
    files: any[];
    testDriveID: number;
    reportedBy: number;
    status: string;
}

export type IState = {
    reportBug: ReportBug,
    loading: boolean
}

