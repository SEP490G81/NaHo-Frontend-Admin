export enum ReportType {
    QUESTION = "QUESTION",
    COMMENT = "COMMENT",
    SYSTEM = "SYSTEM",
    SPAM = "SPAM",
    HARASSMENT = "HARASSMENT",
    INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT",
    OTHER = "OTHER",
}

export enum ReportStatusFilter {
    ALL = "ALL",
    RESOLVED = "RESOLVED",
    UNRESOLVED = "UNRESOLVED",
}

/** Giá trị "tất cả" cho bộ lọc theo loại báo cáo. */
export const REPORT_TYPE_FILTER_ALL = "ALL";

/**
 * Vai trò tiếp nhận báo cáo. Mỗi scope tương ứng một endpoint riêng ở backend:
 * ADMIN → GET /reports/admin, CONTENT_MANAGER → GET /reports/content-manager.
 */
export enum ReportScope {
    ADMIN = "ADMIN",
    CONTENT_MANAGER = "CONTENT_MANAGER",
}
