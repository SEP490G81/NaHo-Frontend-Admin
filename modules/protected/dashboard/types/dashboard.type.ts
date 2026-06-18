import { DashboardOverviewResponse } from "@/types/responses/dashboard.response";

/** Time-window options for the trend charts. */
export type DashboardPeriod = 7 | 14 | 30;

export interface DashboardContextType {
    overview: DashboardOverviewResponse | null;
    isLoading: boolean;
    isError: boolean;
    /** Currently selected trend window (days); affects the chart widgets only. */
    period: DashboardPeriod;
    setPeriod: (period: DashboardPeriod) => void;
}
