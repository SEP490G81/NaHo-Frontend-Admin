"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { DollarSign, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDashboardPayment } from "../hooks/use.dashboard.payment";
import { DashboardKpiCard } from "../components/dashboard.kpi.card";
import { DashboardRevenueChart } from "../components/dashboard.revenue.chart";
import { DashboardStatusPie } from "../components/dashboard.status.pie";
import { DashboardRecentTransactions } from "../components/dashboard.recent.transactions";
import { TIME_RANGE_OPTIONS } from "../constants/dashboard.constants";
import { TimeRangePreset } from "../types/dashboard.type";

export default function DashboardView() {
    const t = useTranslations("dashboard");
    const tTimeRange = useTranslations("dashboard.timeRange");
    const {
        isLoading,
        timeRange,
        setTimeRange,
        metrics,
        revenueTrend,
        statusDistribution,
        recentPaidOrders,
    } = useDashboardPayment();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: metrics.currency || "VND",
        }).format(val);
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header & Time Range Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {t("pageTitle")}
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="w-full sm:w-48">
                    <TextField
                        select
                        fullWidth
                        size="small"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value as TimeRangePreset)}
                    >
                        {TIME_RANGE_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {tTimeRange(opt.labelKey as "all" | "last7Days" | "last30Days" | "last12Months")}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardKpiCard
                    title={t("kpi.totalRevenue")}
                    value={formatCurrency(metrics.totalRevenue)}
                    subtitle={t("kpi.revenueSubtitle")}
                    icon={<DollarSign className="h-6 w-6" />}
                    isLoading={isLoading}
                    isPrimary
                    accentColorClass="bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300"
                />

                <DashboardKpiCard
                    title={t("kpi.successRate")}
                    value={`${metrics.successRate}%`}
                    subtitle={t("kpi.successRateSubtitle", {
                        count: metrics.paidOrdersCount,
                        total: metrics.totalOrdersCount,
                    })}
                    icon={<CheckCircle className="h-6 w-6" />}
                    isLoading={isLoading}
                    accentColorClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                />

                <DashboardKpiCard
                    title={t("kpi.averageOrderValue")}
                    value={formatCurrency(metrics.averageOrderValue)}
                    subtitle={t("kpi.aovSubtitle")}
                    icon={<TrendingUp className="h-6 w-6" />}
                    isLoading={isLoading}
                    accentColorClass="bg-purple-500/10 text-purple-600 dark:text-purple-400"
                />

                <DashboardKpiCard
                    title={t("kpi.unrealizedRevenue")}
                    value={formatCurrency(metrics.unrealizedRevenue)}
                    subtitle={t("kpi.unrealizedSubtitle")}
                    icon={<AlertTriangle className="h-6 w-6" />}
                    isLoading={isLoading}
                    accentColorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                />
            </div>

            {/* Recent 5 Successful Transactions (Placed ABOVE charts) */}
            <DashboardRecentTransactions
                orders={recentPaidOrders}
                isLoading={isLoading}
            />

            {/* Charts Section (Equal Height) */}
            <div className="grid grid-cols-1 gap-6 items-stretch lg:grid-cols-3">
                <div className="lg:col-span-2 flex flex-col">
                    <DashboardRevenueChart
                        data={revenueTrend}
                        isLoading={isLoading}
                        currency={metrics.currency}
                        className="h-full"
                    />
                </div>
                <div className="flex flex-col">
                    <DashboardStatusPie
                        data={statusDistribution}
                        isLoading={isLoading}
                        className="h-full"
                    />
                </div>
            </div>
        </div>
    );
}
