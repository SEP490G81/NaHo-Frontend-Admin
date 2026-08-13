export type TimeRangePreset = "7d" | "30d" | "12m" | "all";

export interface DashboardMetrics {
    totalRevenue: number;
    currency: string;
    totalOrdersCount: number;
    paidOrdersCount: number;
    pendingOrdersCount: number;
    cancelledOrdersCount: number;
    expiredOrdersCount: number;
    failedOrdersCount: number;
    successRate: number;
    unrealizedRevenue: number;
    averageOrderValue: number;
}

export interface RevenueChartPoint {
    dateLabel: string;
    revenue: number;
    paidCount: number;
}

export interface StatusDistributionPoint {
    name: string;
    value: number;
    color: string;
    statusKey: string;
}
