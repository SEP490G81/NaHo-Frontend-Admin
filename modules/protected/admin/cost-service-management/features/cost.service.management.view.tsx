"use client";

import React, { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { useAzureCost } from "../hooks/use.azure.cost";
import { useAwsCost } from "../hooks/use.aws.cost";
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
import { ServiceProviderTab } from "../types/azure.cost.type";
import Image from "next/image";
import openAiLogo from "../assets/openAI.jpg";

export default function CostServiceManagementView() {
    const t = useTranslations("costServiceManagement");
    const [activeTab, setActiveTab] = useState<ServiceProviderTab>("azure");

    const azureCost = useAzureCost();
    const awsCost = useAwsCost();

    const isFetching =
        activeTab === "azure"
            ? azureCost.isFetching
            : activeTab === "aws"
              ? awsCost.isFetching
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
                        onCustomGranularityChange={
                            awsCost.setCustomGranularity
                        }
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

            {/* Coming Soon Placeholders for OpenAI */}
            {activeTab === "openai" && (
                <ContainerBox className="border-dashed py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-16 w-16 items-center justify-center rounded-2xl p-2">
                            <Image
                                src={openAiLogo}
                                alt="OpenAI Logo"
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-xl object-contain"
                            />
                        </div>
                        <h3 className="text-text-contrast mt-4 text-base font-bold">
                            {t("comingSoonTitle")}
                        </h3>
                        <p className="text-text-muted mt-1 max-w-sm text-xs">
                            {t("comingSoonDesc")}
                        </p>
                    </div>
                </ContainerBox>
            )}
        </div>
    );
}

