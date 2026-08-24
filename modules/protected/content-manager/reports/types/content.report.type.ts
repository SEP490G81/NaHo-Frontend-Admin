import {
    REPORT_TYPE_FILTER_ALL,
    ReportStatusFilter,
    ReportType,
} from "@/types/enums/report.enum";
import { ReportResponse } from "@/types/responses/report.response";

/** Giá trị của ô lọc "loại báo cáo": một ReportType cụ thể hoặc "ALL". */
export type ContentReportTypeFilter =
    | ReportType
    | typeof REPORT_TYPE_FILTER_ALL;

export interface ContentReportFilterState {
    searchKeyword: string;
    isResolved: ReportStatusFilter | string;
    reportType: ContentReportTypeFilter;
}

export interface ContentReportStats {
    total: number;
    unresolved: number;
    resolved: number;
    question: number;
    comment: number;
}

/** Bốn thẻ thống kê ở đầu trang, bấm vào sẽ áp bộ lọc tương ứng. */
export type ContentReportStatCardKey =
    | "total"
    | "unresolved"
    | "question"
    | "comment";

export type ContentReport = ReportResponse;
