export type OpenAiCostGranularity = "Daily" | "Monthly";
export type OpenAiCostPresetRange =
    | "last30Days"
    | "last3Months"
    | "last6Months"
    | "last12Months"
    | "custom";

export interface OpenAiCostChartParams {
    timeframe?: string;
    granularity?: OpenAiCostGranularity;
    fromDate?: string;
    toDate?: string;
}

export interface OpenAiCostSummaryData {
    cost: number;
    currency: string;
    period: string;
}

export interface OpenAiCostChartPoint {
    dateOrMonth: string;
    cost: number;
    currency: string;
}

export interface OpenAiCostChartData {
    totalCost: number;
    currency: string;
    granularity: OpenAiCostGranularity | string;
    points: OpenAiCostChartPoint[];
}

export interface FormattedOpenAiChartPoint extends OpenAiCostChartPoint {
    formattedDate: string;
    sharePercent: number;
}
