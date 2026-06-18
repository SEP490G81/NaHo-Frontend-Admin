import { TimeSeriesPoint } from "@/types/responses/dashboard.response";

/** Group thousands with vi-VN separators, e.g. 1284 → "1.284". */
export const formatNumber = (value: number): string =>
    new Intl.NumberFormat("vi-VN").format(value);

/** Signed percentage label for a delta, e.g. 12.5 → "+12,5%", -3 → "-3%". */
export const formatDeltaPct = (pct: number): string => {
    const sign = pct > 0 ? "+" : "";
    const rounded = Math.round(pct * 10) / 10;
    return `${sign}${rounded.toLocaleString("vi-VN")}%`;
};

/** Short day/month label for a "YYYY-MM-DD" date, e.g. "2026-06-18" → "18/06". */
export const formatDayMonth = (isoDate: string): string => {
    const [, month, day] = isoDate.split("-");
    if (!month || !day) return isoDate;
    return `${day}/${month}`;
};

/** Take the last `count` points of a daily series (most recent window). */
export const sliceLastDays = (
    series: TimeSeriesPoint[],
    count: number,
): TimeSeriesPoint[] => series.slice(Math.max(0, series.length - count));

/** Sum the `value` of every point in a series. */
export const sumSeries = (series: TimeSeriesPoint[]): number =>
    series.reduce((total, point) => total + point.value, 0);
