import { ReportStatus, ReportType } from "@/types/enums/report.enum";

export interface UpdateReportStatusRequest {
    id: string;
    status: ReportStatus;
}

export interface ReportFilterRequest {
    /** Free-text query over sender name, email and description */
    search?: string;
    /** Filter by a single error type; omit for all types */
    type?: ReportType;
    /** Filter by a single status; omit for all statuses */
    status?: ReportStatus;
}
