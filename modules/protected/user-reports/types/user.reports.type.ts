import { ReportStatus, ReportType } from "@/types/enums/report.enum";
import { ReportResponse } from "@/types/responses/report.response";

export interface ReportFilters {
    /** Free-text query over sender name, email and description */
    search: string;
    /** Selected error type, or "ALL" for no type filter */
    type: ReportType | "ALL";
    /** Selected status, or "ALL" for no status filter */
    status: ReportStatus | "ALL";
}

export interface UserReportsContextType {
    /** Reports after the active filters are applied (unresolved first) */
    reports: ReportResponse[];
    /** Total number of reports before filtering */
    totalCount: number;
    /** Count of all reports per status (ignores the active filters) */
    statusCounts: Record<ReportStatus, number>;
    isLoading: boolean;
    filters: ReportFilters;
    setFilters: (filters: ReportFilters) => void;
    /** Toggle the status filter from a stat card (same value clears it) */
    toggleStatusFilter: (status: ReportStatus) => void;
    selectedReport: ReportResponse | null;
    openDetail: (report: ReportResponse) => void;
    closeDetail: () => void;
    isUpdating: boolean;
    /** PENDING → IN_PROGRESS */
    startProcessing: (id: string) => Promise<boolean>;
    /** → RESOLVED */
    resolveReport: (id: string) => Promise<boolean>;
    /** RESOLVED → IN_PROGRESS */
    reopenReport: (id: string) => Promise<boolean>;
}
