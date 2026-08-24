export type AwsCostGranularity = "Daily" | "Monthly";
export type AwsCostPresetRange =
    | "last30Days"
    | "last6Months"
    | "last12Months"
    | "custom";

export interface AwsCostChartParams {
    timeframe?: string;
    granularity?: AwsCostGranularity;
    fromDate?: string;
    toDate?: string;
}

export interface AwsCostSummaryData {
    cost: number;
    currency: string;
    period: string;
}

export interface AwsCostChartPoint {
    dateOrMonth: string;
    cost: number;
    currency: string;
}

export interface AwsCostChartData {
    totalCost: number;
    currency: string;
    granularity: AwsCostGranularity | string;
    points: AwsCostChartPoint[];
}

export interface FormattedAwsChartPoint extends AwsCostChartPoint {
    formattedDate: string;
    sharePercent: number;
}
