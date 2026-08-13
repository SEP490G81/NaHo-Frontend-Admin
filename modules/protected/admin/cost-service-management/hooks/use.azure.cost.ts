"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import {
    fetchAzureCostChartClient,
    fetchAzureCostSummaryClient,
    triggerAzureCostSyncClient,
} from "@/services/client/azure.cost.service";
import { DEFAULT_PRESET_RANGE } from "../constants/cost.service.constants";
import {
    AzureCostChartParams,
    AzureCostGranularity,
    AzureCostPresetRange,
    FormattedChartPoint,
    ServiceProviderTab,
} from "../types/azure.cost.type";
import { processChartPoints } from "../utils/cost.service.util";
import { ApiError } from "@/libs/api.error";

function getDefaultDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const toDate = today.toISOString().split("T")[0];
    const fromDate = thirtyDaysAgo.toISOString().split("T")[0];
    return { fromDate, toDate };
}

export function useAzureCost() {
    const [activeTab, setActiveTab] = useState<ServiceProviderTab>("azure");
    const [presetRange, setPresetRange] =
        useState<AzureCostPresetRange>(DEFAULT_PRESET_RANGE);
    const [customGranularity, setCustomGranularity] =
        useState<AzureCostGranularity>("Daily");

    const defaults = useMemo(() => getDefaultDates(), []);
    const [fromDate, setFromDate] = useState<string>(defaults.fromDate);
    const [toDate, setToDate] = useState<string>(defaults.toDate);

    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const [syncMessage, setSyncMessage] = useState<string | null>(null);

    // Deterministic chart parameters based on preset rules
    const chartParams = useMemo<AzureCostChartParams>(() => {
        switch (presetRange) {
            case "last30Days":
                return {
                    timeframe: "Custom",
                    granularity: "Daily",
                    fromDate: defaults.fromDate,
                    toDate: defaults.toDate,
                };
            case "last6Months":
                return {
                    timeframe: "Last6Months",
                    granularity: "Monthly",
                };
            case "last12Months":
                return {
                    timeframe: "Last12Months",
                    granularity: "Monthly",
                };
            case "custom":
            default:
                return {
                    timeframe: "Custom",
                    granularity: customGranularity,
                    fromDate: fromDate || undefined,
                    toDate: toDate || undefined,
                };
        }
    }, [presetRange, customGranularity, fromDate, toDate, defaults]);

    // Active granularity for displaying chart & table labels
    const currentGranularity: AzureCostGranularity =
        chartParams.granularity || "Monthly";

    // Fetch Summary (Month to Date cost - API #1)
    const {
        data: summaryResponse,
        isLoading: isLoadingSummary,
        isFetching: isFetchingSummary,
        isError: isErrorSummary,
        error: errorSummary,
        refetch: refetchSummary,
    } = useQuery({
        queryKey: queryKeys.azureCost.summary,
        queryFn: fetchAzureCostSummaryClient,
        staleTime: 1000 * 60 * 5, // 5 mins
        retry: (failureCount, error) => {
            if (
                error instanceof ApiError &&
                (error.status === 502 || error.status === 429)
            ) {
                return failureCount < 1;
            }
            return failureCount < 2;
        },
    });

    // Fetch Chart Data (Preset / Custom - API #2 & API #3)
    const {
        data: chartResponse,
        isLoading: isLoadingChart,
        isFetching: isFetchingChart,
        isError: isErrorChart,
        error: errorChart,
        refetch: refetchChart,
    } = useQuery({
        queryKey: queryKeys.azureCost.chart(
            chartParams as Record<string, unknown>,
        ),
        queryFn: () => fetchAzureCostChartClient(chartParams),
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error) => {
            if (
                error instanceof ApiError &&
                (error.status === 502 || error.status === 429)
            ) {
                return failureCount < 1;
            }
            return failureCount < 2;
        },
    });

    const summary = summaryResponse?.data;
    const chartData = chartResponse?.data;

    // Process and format points for chart and table
    const formattedPoints = useMemo<FormattedChartPoint[]>(() => {
        const rawPoints = chartData?.points || [];
        const curr = chartData?.currency || summary?.currency || "USD";
        const monthsCount = presetRange === "last12Months" ? 12 : 6;

        return processChartPoints(
            rawPoints,
            currentGranularity,
            presetRange !== "custom" && presetRange !== "last30Days",
            monthsCount,
            curr,
        );
    }, [chartData, summary, currentGranularity, presetRange]);

    const activeError = errorSummary || errorChart;
    const isError = isErrorSummary || isErrorChart;
    const isFetching = isFetchingSummary || isFetchingChart;

    const refetchAll = async () => {
        await Promise.all([refetchSummary(), refetchChart()]);
    };

    const handleSync = async () => {
        try {
            setIsSyncing(true);
            setSyncMessage(null);
            await triggerAzureCostSyncClient();
            await refetchAll();
        } catch (err) {
            if (err instanceof ApiError) {
                setSyncMessage(err.message);
            } else {
                setSyncMessage("Đồng bộ thất bại");
            }
        } finally {
            setIsSyncing(false);
        }
    };

    return {
        activeTab,
        setActiveTab,
        presetRange,
        setPresetRange,
        granularity: currentGranularity,
        customGranularity,
        setCustomGranularity,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        summary,
        chartData,
        formattedPoints,
        isLoading: isLoadingSummary || isLoadingChart,
        isFetching,
        isError,
        activeError,
        isSyncing,
        syncMessage,
        handleSync,
        refetchAll,
    };
}
