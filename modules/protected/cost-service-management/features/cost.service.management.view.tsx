"use client";

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAzureCost } from "../hooks/use.azure.cost";
import { ServiceProviderTabs } from "../components/service.provider.tabs";
import { AzureCostSummaryCard } from "../components/azure.cost.summary.card";
import { AzureCostChartFilter } from "../components/azure.cost.chart.filter";
import { AzureCostMainChart } from "../components/azure.cost.main.chart";
import { AzureCostBreakdownTable } from "../components/azure.cost.breakdown.table";
import { AzureCostErrorAlert } from "../components/azure.cost.error.alert";
import { Cpu, Server } from "lucide-react";

export default function CostServiceManagementView() {
    const t = useTranslations("costServiceManagement");
    const {
        activeTab,
        setActiveTab,
        presetRange,
        setPresetRange,
        granularity,
        customGranularity,
        setCustomGranularity,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        summary,
        chartData,
        formattedPoints,
        isLoading,
        isFetching,
        isError,
        activeError,
        isSyncing,
        handleSync,
        refetchAll,
    } = useAzureCost();

    return (
        <div className="relative flex flex-col gap-6 p-6">
            {/* Centered Screen Loading Backdrop */}
            <Backdrop
                open={isFetching}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    color: "#ffffff",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(4px)",
                }}
            >
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/90 p-6 shadow-2xl backdrop-blur-md dark:bg-gray-900/90">
                    <CircularProgress size={44} thickness={4} color="primary" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {t("loadingMessage")}
                    </span>
                </div>
            </Backdrop>

            {/* Header Title */}
            <div className="flex flex-col gap-1 bg-white p-4 rounded-xl border-2 border-gray-200 dark:bg-gray-900">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {t("pageTitle")}
                </h1>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {t("subtitle")}
                </p>
            </div>

            {/* Provider Tabs Switcher */}
            <ServiceProviderTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Content per active provider */}
            {activeTab === "azure" && (
                <div className="flex flex-col gap-6">
                    {/* Azure Rate Limit Error Alert if API error occurs */}
                    {isError && (
                        <AzureCostErrorAlert
                            error={activeError}
                            onRetry={refetchAll}
                            isRetrying={isFetching}
                        />
                    )}

                    {/* KPI Summary Cards */}
                    <AzureCostSummaryCard
                        mtdCost={summary?.cost}
                        periodCost={chartData?.totalCost}
                        currency={chartData?.currency || summary?.currency || "USD"}
                        dataPointsCount={formattedPoints.length}
                        isLoading={isLoading}
                    />

                    {/* Streamlined Timeframe Selector Bar */}
                    <AzureCostChartFilter
                        presetRange={presetRange}
                        onPresetRangeChange={setPresetRange}
                        customGranularity={customGranularity}
                        onCustomGranularityChange={setCustomGranularity}
                        fromDate={fromDate}
                        onFromDateChange={setFromDate}
                        toDate={toDate}
                        onToDateChange={setToDate}
                        onRefresh={refetchAll}
                        onSync={handleSync}
                        isLoading={isFetching}
                        isSyncing={isSyncing}
                    />

                    {/* Main Recharts Visualizer */}
                    <AzureCostMainChart
                        data={formattedPoints}
                        granularity={chartData?.granularity || granularity || "Monthly"}
                        currency={chartData?.currency || "USD"}
                        isLoading={isLoading}
                    />

                    {/* Data Points Breakdown Table */}
                    <AzureCostBreakdownTable
                        data={formattedPoints}
                        currency={chartData?.currency || "USD"}
                        isLoading={isLoading}
                    />
                </div>
            )}

            {/* Coming Soon Placeholders for OpenAI and AWS */}
            {activeTab !== "azure" && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] py-16 text-center shadow-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {activeTab === "openai" ? (
                            <Cpu className="h-7 w-7" />
                        ) : (
                            <Server className="h-7 w-7" />
                        )}
                    </div>
                    <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-gray-100">
                        {t("comingSoonTitle")}
                    </h3>
                    <p className="mt-1 max-w-sm text-xs text-gray-500 dark:text-gray-400">
                        {t("comingSoonDesc")}
                    </p>
                </div>
            )}
        </div>
    );
}
