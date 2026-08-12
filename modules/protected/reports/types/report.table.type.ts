import { ReportStatusFilter } from "@/types/enums/report.enum";

export interface ReportFilterState {
    searchKeyword: string;
    isResolved: ReportStatusFilter | string;
}
