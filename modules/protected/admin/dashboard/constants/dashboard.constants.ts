import { TimeRangePreset } from "../types/dashboard.type";

export const TIME_RANGE_OPTIONS: Array<{
    value: TimeRangePreset;
    labelKey: string;
}> = [
    { value: "all", labelKey: "all" },
    { value: "7d", labelKey: "last7Days" },
    { value: "30d", labelKey: "last30Days" },
    { value: "12m", labelKey: "last12Months" },
];

export const STATUS_COLORS = {
    PAID: "#ec4899",
    PENDING: "#f472b6",
    CANCELLED: "#fda4af",
    EXPIRED: "#db2777",
    FAILED: "#be185d",
};

export const PINK_CHART_GRADIENT = {
    primary: "#ff99ac",
    secondary: "#ec4899",
    accent: "#f472b6",
    dark: "#db2777",
};
