import { ReportFilterState } from "../types/report.table.type";
import { ReportStatusFilter } from "@/types/enums/report.enum";

export const DEFAULT_REPORT_FILTER: ReportFilterState = {
    searchKeyword: "",
    isResolved: ReportStatusFilter.ALL,
};
