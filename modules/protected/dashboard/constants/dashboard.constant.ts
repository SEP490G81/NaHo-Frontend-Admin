import { JlptLevel } from "@/types/enums/user.enum";
import { DashboardPeriod } from "../types/dashboard.type";

/** Selectable trend windows for the chart widgets. */
export const PERIOD_OPTIONS: DashboardPeriod[] = [7, 14, 30];
export const DEFAULT_PERIOD: DashboardPeriod = 14;

/** JLPT levels ordered beginner → advanced for the distribution chart. */
export const JLPT_ORDER: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

/** Per-level accent (Tailwind bg) used by the JLPT distribution bars. */
export const JLPT_BAR_COLOR: Record<JlptLevel, string> = {
    N5: "bg-emerald-400",
    N4: "bg-teal-400",
    N3: "bg-sky-400",
    N2: "bg-indigo-400",
    N1: "bg-fuchsia-400",
};

/** Unresolved reports older than this many days are flagged as overdue. */
export const STALE_THRESHOLD_DAYS = 3;

/** Routes the dashboard widgets deep-link into. */
export const DASHBOARD_LINKS = {
    users: "/user-management",
    reports: "/user-reports",
    notifications: "/system-notifications",
} as const;
