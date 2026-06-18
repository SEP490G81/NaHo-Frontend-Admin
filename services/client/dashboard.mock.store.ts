import {
    DashboardNotificationSummary,
    DashboardOverviewResponse,
    DashboardReportSummary,
} from "@/types/responses/dashboard.response";
import {
    MOCK_DASHBOARD_KPIS,
    MOCK_JLPT_DISTRIBUTION,
    MOCK_USERS_BY_STATUS,
    buildPracticeActivitySeries,
    buildUserGrowthSeries,
} from "@/app/api/_mock/dashboard.data";
import { storeListReports } from "@/services/client/report.mock.store";
import { storeListNotificationLogs } from "@/services/client/notification.mock.store";

/**
 * Composes the dashboard overview from a static analytics mock plus LIVE reads
 * of the report & notification stores — so resolving a report or sending a
 * notification elsewhere is reflected here on the next refetch.
 * TODO: replace with a single `fetch("/api/dashboard/overview")` when BE is ready.
 */

const RECENT_LIMIT = 5;

const buildReportSummary = (): DashboardReportSummary => {
    const reports = storeListReports();
    const pending = reports.filter((r) => r.status === "PENDING").length;
    const inProgress = reports.filter((r) => r.status === "IN_PROGRESS").length;
    const resolved = reports.filter((r) => r.status === "RESOLVED").length;
    // Unresolved first, oldest (most overdue) at the top.
    const recent = reports
        .filter((r) => r.status !== "RESOLVED")
        .sort((a, b) => a.reportedAt.localeCompare(b.reportedAt))
        .slice(0, RECENT_LIMIT);
    return { pending, inProgress, resolved, recent };
};

const buildNotificationSummary = (): DashboardNotificationSummary => {
    const logs = storeListNotificationLogs();
    const now = new Date();
    const sameMonth = (iso: string): boolean => {
        const date = new Date(iso);
        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
        );
    };
    const sentThisMonth = logs.filter(
        (log) => log.status === "SENT" && sameMonth(log.sentAt),
    );
    const totalRecipients = sentThisMonth.reduce(
        (sum, log) => sum + log.recipientCount,
        0,
    );
    return {
        sentThisMonth: sentThisMonth.length,
        totalRecipients,
        recent: logs.slice(0, RECENT_LIMIT),
    };
};

export const buildDashboardOverview = (): DashboardOverviewResponse => ({
    kpis: MOCK_DASHBOARD_KPIS,
    userGrowth: buildUserGrowthSeries(),
    practiceActivity: buildPracticeActivitySeries(),
    jlptDistribution: MOCK_JLPT_DISTRIBUTION,
    usersByStatus: MOCK_USERS_BY_STATUS,
    reports: buildReportSummary(),
    notifications: buildNotificationSummary(),
});
