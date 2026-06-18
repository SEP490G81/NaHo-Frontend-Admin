import { JlptLevel, UserStatus } from "@/types/enums/user.enum";
import { NotificationLogResponse } from "@/types/responses/notification.response";
import { ReportResponse } from "@/types/responses/report.response";

/** A single point in a daily time series (date = "YYYY-MM-DD"). */
export interface TimeSeriesPoint {
    date: string;
    value: number;
}

/**
 * Headline numbers shown in the KPI cards. Each `*DeltaPct` is the percentage
 * change versus the previous equivalent period (e.g. last 7 days vs the 7 days
 * before that); positive = growth, negative = decline.
 */
export interface DashboardKpis {
    totalUsers: number;
    totalUsersDeltaPct: number;
    activeLearners: number;
    activeLearnersDeltaPct: number;
    teachers: number;
    teachersDeltaPct: number;
    newUsersThisWeek: number;
    newUsersDeltaPct: number;
}

/** Number of learners at each JLPT level (for the distribution chart). */
export interface JlptDistributionItem {
    level: JlptLevel;
    count: number;
}

/** Aggregated bug-report counts derived live from the report mock store. */
export interface DashboardReportSummary {
    pending: number;
    inProgress: number;
    resolved: number;
    /** Oldest unresolved reports first, capped to a few rows for the panel. */
    recent: ReportResponse[];
}

/** Aggregated notification stats derived live from the notification store. */
export interface DashboardNotificationSummary {
    sentThisMonth: number;
    totalRecipients: number;
    /** Most recently sent/scheduled notifications, capped for the panel. */
    recent: NotificationLogResponse[];
}

/**
 * Everything the admin overview screen needs in one payload. Mirrors what a
 * future `GET /api/dashboard/overview` endpoint would return; today it is
 * composed from a static analytics mock + the live report/notification stores.
 */
export interface DashboardOverviewResponse {
    kpis: DashboardKpis;
    /** New users per day, last 30 days (chart slices to the chosen period). */
    userGrowth: TimeSeriesPoint[];
    /** Speaking-practice (Kaiwa) sessions per day, last 30 days. */
    practiceActivity: TimeSeriesPoint[];
    jlptDistribution: JlptDistributionItem[];
    usersByStatus: Record<UserStatus, number>;
    reports: DashboardReportSummary;
    notifications: DashboardNotificationSummary;
}
