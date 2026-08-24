"use client";

import React, { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { useAzureCost } from "../hooks/use.azure.cost";
import { useAwsCost } from "../hooks/use.aws.cost";
import { useOpenAiCost } from "../hooks/use.openai.cost";
import { ServiceProviderTabs } from "../components/service.provider.tabs";
import { AzureCostSummaryCard } from "../components/azure.cost.summary.card";
import { AzureCostChartFilter } from "../components/azure.cost.chart.filter";
import { AzureCostMainChart } from "../components/azure.cost.main.chart";
import { AzureCostBreakdownTable } from "../components/azure.cost.breakdown.table";
import { AzureCostErrorAlert } from "../components/azure.cost.error.alert";
import { AwsCostSummaryCard } from "../components/aws.cost.summary.card";
import { AwsCostChartFilter } from "../components/aws.cost.chart.filter";
import { AwsCostMainChart } from "../components/aws.cost.main.chart";
import { AwsCostBreakdownTable } from "../components/aws.cost.breakdown.table";
import { AwsCostErrorAlert } from "../components/aws.cost.error.alert";
import { OpenAiCostSummaryCard } from "../components/openai.cost.summary.card";
import { OpenAiCostChartFilter } from "../components/openai.cost.chart.filter";
import { OpenAiCostMainChart } from "../components/openai.cost.main.chart";
import { OpenAiCostBreakdownTable } from "../components/openai.cost.breakdown.table";
import { OpenAiCostErrorAlert } from "../components/openai.cost.error.alert";
import { ServiceProviderTab } from "../types/azure.cost.type";

export default function CostServiceManagementView() {
    const t = useTranslations("costServiceManagement");
    const [activeTab, setActiveTab] = useState<ServiceProviderTab>("azure");

    const azureCost = useAzureCost();
    const awsCost = useAwsCost();
    const openAiCost = useOpenAiCost();

    const isFetching =
        activeTab === "azure"
            ? azureCost.isFetching
            : activeTab === "aws"
              ? awsCost.isFetching
              : activeTab === "openai"
                ? openAiCost.isFetching
                : false;

    return (
        <div className="flex w-full flex-col gap-y-4">
            {/* Centered Screen Loading Backdrop */}
            <Backdrop
                open={isFetching}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    color: "var(--color-text-contrast)",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(4px)",
                }}
            >
                <div className="bg-bgc-app border-bdc-primary flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 shadow-2xl backdrop-blur-md">
                    <CircularProgress size={44} thickness={4} color="primary" />
                    <span className="text-text-contrast text-sm font-semibold">
                        {t("loadingMessage")}
                    </span>
                </div>
            </Backdrop>

            {/* Header Title */}
            <ContainerBox>
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-contrast text-2xl font-bold">
                        {t("pageTitle")}
                    </h1>
                    <p className="text-text-muted mt-1 text-xs">
                        {t("subtitle")}
                    </p>
                </div>
            </ContainerBox>

            {/* Provider Tabs Switcher */}
            <ServiceProviderTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Content for Azure Provider */}
            {activeTab === "azure" && (
                <div className="flex flex-col gap-y-4">
                    {/* Azure Rate Limit Error Alert if API error occurs */}
                    {azureCost.isError && (
                        <AzureCostErrorAlert
                            error={azureCost.activeError}
                            onRetry={azureCost.refetchAll}
                            isRetrying={azureCost.isFetching}
                        />
                    )}

                    {/* KPI Summary Cards */}
                    <AzureCostSummaryCard
                        mtdCost={azureCost.summary?.cost}
                        periodCost={azureCost.chartData?.totalCost}
                        currency={
                            azureCost.chartData?.currency ||
                            azureCost.summary?.currency ||
                            "USD"
                        }
                        dataPointsCount={azureCost.formattedPoints.length}
                        isLoading={azureCost.isLoading}
                    />

                    {/* Streamlined Timeframe Selector Bar */}
                    <AzureCostChartFilter
                        presetRange={azureCost.presetRange}
                        onPresetRangeChange={azureCost.setPresetRange}
                        customGranularity={azureCost.customGranularity}
                        onCustomGranularityChange={
                            azureCost.setCustomGranularity
                        }
                        fromDate={azureCost.fromDate}
                        onFromDateChange={azureCost.setFromDate}
                        toDate={azureCost.toDate}
                        onToDateChange={azureCost.setToDate}
                        onRefresh={azureCost.refetchAll}
                        onSync={azureCost.handleSync}
                        isLoading={azureCost.isFetching}
                        isSyncing={azureCost.isSyncing}
                    />

                    {/* Main Recharts Visualizer */}
                    <AzureCostMainChart
                        data={azureCost.formattedPoints}
                        granularity={
                            azureCost.chartData?.granularity ||
                            azureCost.granularity ||
                            "Monthly"
                        }
                        currency={azureCost.chartData?.currency || "USD"}
                        isLoading={azureCost.isLoading}
                    />

                    {/* Data Points Breakdown Table */}
                    <AzureCostBreakdownTable
                        data={azureCost.formattedPoints}
                        currency={azureCost.chartData?.currency || "USD"}
                        isLoading={azureCost.isLoading}
                    />
                </div>
            )}

            {/* Content for AWS Provider */}
            {activeTab === "aws" && (
                <div className="flex flex-col gap-y-4">
                    {/* AWS Error Alert if API error occurs */}
                    {awsCost.isError && (
                        <AwsCostErrorAlert
                            error={awsCost.activeError}
                            onRetry={awsCost.refetchAll}
                            isRetrying={awsCost.isFetching}
                        />
                    )}

                    {/* KPI Summary Cards */}
                    <AwsCostSummaryCard
                        mtdCost={awsCost.summary?.cost}
                        periodCost={awsCost.chartData?.totalCost}
                        currency={
                            awsCost.chartData?.currency ||
                            awsCost.summary?.currency ||
                            "USD"
                        }
                        dataPointsCount={awsCost.formattedPoints.length}
                        isLoading={awsCost.isLoading}
                    />

                    {/* Timeframe Selector Bar */}
                    <AwsCostChartFilter
                        presetRange={awsCost.presetRange}
                        onPresetRangeChange={awsCost.setPresetRange}
                        customGranularity={awsCost.customGranularity}
                        onCustomGranularityChange={awsCost.setCustomGranularity}
                        fromDate={awsCost.fromDate}
                        onFromDateChange={awsCost.setFromDate}
                        toDate={awsCost.toDate}
                        onToDateChange={awsCost.setToDate}
                        onRefresh={awsCost.refetchAll}
                        isLoading={awsCost.isFetching}
                    />

                    {/* Main Recharts Visualizer */}
                    <AwsCostMainChart
                        data={awsCost.formattedPoints}
                        granularity={
                            awsCost.chartData?.granularity ||
                            awsCost.granularity ||
                            "Monthly"
                        }
                        currency={awsCost.chartData?.currency || "USD"}
                        isLoading={awsCost.isLoading}
                    />

                    {/* Data Points Breakdown Table */}
                    <AwsCostBreakdownTable
                        data={awsCost.formattedPoints}
                        currency={awsCost.chartData?.currency || "USD"}
                        isLoading={awsCost.isLoading}
                    />
                </div>
            )}

            {/* Content for OpenAI Provider */}
            {activeTab === "openai" && (
                <div className="flex flex-col gap-y-4">
                    {/* OpenAI Error Alert if API error occurs */}
                    {openAiCost.isError && (
                        <OpenAiCostErrorAlert
                            error={openAiCost.activeError}
                            onRetry={openAiCost.refetchAll}
                            isRetrying={openAiCost.isFetching}
                        />
                    )}

                    {/* KPI Summary Cards */}
                    <OpenAiCostSummaryCard
                        mtdCost={openAiCost.summary?.cost}
                        periodCost={openAiCost.chartData?.totalCost}
                        currency={
                            openAiCost.chartData?.currency ||
                            openAiCost.summary?.currency ||
                            "USD"
                        }
                        dataPointsCount={openAiCost.formattedPoints.length}
                        isLoading={openAiCost.isLoading}
                    />

                    {/* Timeframe Selector Bar with Sync button */}
                    <OpenAiCostChartFilter
                        presetRange={openAiCost.presetRange}
                        onPresetRangeChange={openAiCost.setPresetRange}
                        customGranularity={openAiCost.customGranularity}
                        onCustomGranularityChange={
                            openAiCost.setCustomGranularity
                        }
                        fromDate={openAiCost.fromDate}
                        onFromDateChange={openAiCost.setFromDate}
                        toDate={openAiCost.toDate}
                        onToDateChange={openAiCost.setToDate}
                        onRefresh={openAiCost.refetchAll}
                        onSync={openAiCost.handleSync}
                        isLoading={openAiCost.isFetching}
                        isSyncing={openAiCost.isSyncing}
                    />

                    {/* Main Recharts Visualizer */}
                    <OpenAiCostMainChart
                        data={openAiCost.formattedPoints}
                        granularity={
                            openAiCost.chartData?.granularity ||
                            openAiCost.granularity ||
                            "Monthly"
                        }
                        currency={openAiCost.chartData?.currency || "USD"}
                        isLoading={openAiCost.isLoading}
                    />

                    {/* Data Points Breakdown Table */}
                    <OpenAiCostBreakdownTable
                        data={openAiCost.formattedPoints}
                        currency={openAiCost.chartData?.currency || "USD"}
                        isLoading={openAiCost.isLoading}
                    />
                </div>
            )}
        </div>
    );
}
