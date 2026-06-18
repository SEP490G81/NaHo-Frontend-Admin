import {
    DashboardKpis,
    JlptDistributionItem,
    TimeSeriesPoint,
} from "@/types/responses/dashboard.response";
import { UserStatus } from "@/types/enums/user.enum";

/**
 * Static analytics mock for the admin dashboard. These figures have no source
 * in the per-feature mocks (users come from a real BE proxy, growth/engagement
 * are not modelled), so they live here until a real `/dashboard/overview`
 * endpoint exists. The report & notification panels, by contrast, are composed
 * LIVE from their own stores — see dashboard.mock.store.ts.
 */

export const MOCK_DASHBOARD_KPIS: DashboardKpis = {
    totalUsers: 1284,
    totalUsersDeltaPct: 8.4,
    activeLearners: 947,
    activeLearnersDeltaPct: 5.1,
    teachers: 32,
    teachersDeltaPct: 6.7,
    newUsersThisWeek: 118,
    newUsersDeltaPct: 12.3,
};

export const MOCK_JLPT_DISTRIBUTION: JlptDistributionItem[] = [
    { level: "N5", count: 486 },
    { level: "N4", count: 372 },
    { level: "N3", count: 248 },
    { level: "N2", count: 124 },
    { level: "N1", count: 54 },
];

export const MOCK_USERS_BY_STATUS: Record<UserStatus, number> = {
    ACTIVE: 1187,
    UNACTIVE: 79,
    BANNED: 18,
};

/**
 * Build a deterministic daily series ending today (no Math.random, so the
 * chart is stable across reloads). A gentle upward drift plus a weekend dip
 * keeps it realistic. `base`/`amplitude` shape the magnitude per metric.
 */
const buildSeries = (
    days: number,
    base: number,
    amplitude: number,
    drift: number,
): TimeSeriesPoint[] => {
    const today = new Date();
    const series: TimeSeriesPoint[] = [];
    for (let offset = days - 1; offset >= 0; offset--) {
        const date = new Date(today);
        date.setDate(today.getDate() - offset);
        const index = days - 1 - offset;
        const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        // Smooth oscillation via two out-of-phase sines + linear drift.
        const wave =
            Math.sin(index / 2.3) * amplitude +
            Math.sin(index / 5.1) * (amplitude / 2);
        const weekendPenalty = isWeekend ? amplitude * 0.9 : 0;
        const value = Math.max(
            0,
            Math.round(base + drift * index + wave - weekendPenalty),
        );
        const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
        series.push({ date: iso, value });
    }
    return series;
};

/** New registrations per day, last 30 days. */
export const buildUserGrowthSeries = (): TimeSeriesPoint[] =>
    buildSeries(30, 14, 6, 0.25);

/** Speaking-practice (Kaiwa) sessions per day, last 30 days. */
export const buildPracticeActivitySeries = (): TimeSeriesPoint[] =>
    buildSeries(30, 240, 70, 2.4);
