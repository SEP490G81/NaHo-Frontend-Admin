import {
    REPORT_TYPE_FILTER_ALL,
    ReportScope,
    ReportStatusFilter,
} from "@/types/enums/report.enum";
import { getReportTypesByScope } from "@/modules/protected/shared/reports/constants/report.scope.constants";
import {
    ContentReportFilterState,
    ContentReportStatCardKey,
} from "../types/content.report.type";

export const DEFAULT_CONTENT_REPORT_FILTER: ContentReportFilterState = {
    searchKeyword: "",
    isResolved: ReportStatusFilter.ALL,
    reportType: REPORT_TYPE_FILTER_ALL,
};

/** QUESTION + COMMENT — đúng bằng tập mà backend trả về cho content manager. */
export const CONTENT_REPORT_TYPES = getReportTypesByScope(
    ReportScope.CONTENT_MANAGER,
);

/** Số ký tự tối thiểu của nội dung phản hồi gửi cho người báo cáo. */
export const MIN_ADMIN_REPLY_LENGTH = 10;

export const CONTENT_REPORT_STAT_CARDS: ContentReportStatCardKey[] = [
    "total",
    "unresolved",
    "question",
    "comment",
];

export const CONTENT_REPORT_TABLE_SKELETON_ROWS = 5;

/** #, Người báo cáo, Nội dung, Loại, Đối tượng, Tệp, Trạng thái, Thao tác. */
export const CONTENT_REPORT_TABLE_COLUMN_COUNT = 8;
