import {
    REPORT_TYPE_FILTER_ALL,
    ReportStatusFilter,
    ReportType,
} from "@/types/enums/report.enum";
import {
    ContentReport,
    ContentReportFilterState,
    ContentReportStats,
} from "../types/content.report.type";

function matchStatus(
    report: ContentReport,
    isResolved: ReportStatusFilter | string,
): boolean {
    if (isResolved === ReportStatusFilter.RESOLVED) {
        return report.isResolved;
    }
    if (isResolved === ReportStatusFilter.UNRESOLVED) {
        return !report.isResolved;
    }
    return true;
}

function matchKeyword(report: ContentReport, keyword: string): boolean {
    const kw = keyword.toLowerCase().trim();
    if (!kw) {
        return true;
    }

    return (
        Boolean(report.title?.toLowerCase().includes(kw)) ||
        Boolean(report.description?.toLowerCase().includes(kw)) ||
        Boolean(report.fullName?.toLowerCase().includes(kw)) ||
        String(report.id).includes(kw) ||
        String(report.userId).includes(kw)
    );
}

export function filterContentReports(
    reports: ContentReport[],
    filter: ContentReportFilterState,
): ContentReport[] {
    return reports.filter(
        (report) =>
            matchStatus(report, filter.isResolved) &&
            (filter.reportType === REPORT_TYPE_FILTER_ALL ||
                report.reportType === filter.reportType) &&
            matchKeyword(report, filter.searchKeyword),
    );
}

/**
 * Báo cáo chờ xử lý luôn đứng trước, trong cùng nhóm thì báo cáo mới nhất
 * (id lớn hơn) đứng trước. Backend trả về danh sách không sắp xếp.
 */
export function sortContentReports(reports: ContentReport[]): ContentReport[] {
    return [...reports].sort((a, b) => {
        if (a.isResolved !== b.isResolved) {
            return a.isResolved ? 1 : -1;
        }
        return b.id - a.id;
    });
}

export function buildContentReportStats(
    reports: ContentReport[],
): ContentReportStats {
    return reports.reduce<ContentReportStats>(
        (stats, report) => ({
            total: stats.total + 1,
            unresolved: stats.unresolved + (report.isResolved ? 0 : 1),
            resolved: stats.resolved + (report.isResolved ? 1 : 0),
            question:
                stats.question +
                (report.reportType === ReportType.QUESTION ? 1 : 0),
            comment:
                stats.comment +
                (report.reportType === ReportType.COMMENT ? 1 : 0),
        }),
        { total: 0, unresolved: 0, resolved: 0, question: 0, comment: 0 },
    );
}
