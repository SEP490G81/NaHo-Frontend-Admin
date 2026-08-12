import { ReportType } from "../enums/report.enum";

export interface ReportFileResponse {
    id: number;
    objectKey: string;
    accessUrl: string;
    originalFileName: string;
    contentType: string;
    size: number;
    checksum: string;
    operationType: string;
    operationStatus: string;
}

export interface ReportResponse {
    id: number;
    userId: number;
    fullName: string;
    title: string;
    description: string;
    reportType: ReportType | string;
    isResolved: boolean;
    adminReply?: string | null;
    questionId?: number | null;
    commentId?: number | null;
    files: ReportFileResponse[];
}
