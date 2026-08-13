export type AzureCostGranularity = "Daily" | "Monthly";
export type AzureCostPresetRange = "last30Days" | "last6Months" | "last12Months" | "custom";

export interface AzureCostChartParams {
    timeframe?: string;
    granularity?: AzureCostGranularity;
    fromDate?: string;
    toDate?: string;
}

export interface AzureCostSummaryData {
    cost: number;
    currency: string;
    period: string;
}

export interface AzureCostChartPoint {
    dateOrMonth: string;
    cost: number;
    currency: string;
}

export interface AzureCostChartData {
    totalCost: number;
    currency: string;
    granularity: AzureCostGranularity | string;
    points: AzureCostChartPoint[];
}

export type ServiceProviderTab = "azure" | "openai" | "aws";

export interface FormattedChartPoint extends AzureCostChartPoint {
    formattedDate: string;
    sharePercent: number;
}

