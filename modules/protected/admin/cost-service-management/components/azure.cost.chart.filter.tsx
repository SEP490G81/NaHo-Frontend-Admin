"use client";

import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Calendar, CloudSync, RefreshCw } from "lucide-react";
import {
    GRANULARITY_OPTIONS,
    PRESET_RANGE_OPTIONS,
} from "../constants/cost.service.constants";
import {
    AzureCostGranularity,
    AzureCostPresetRange,
} from "../types/azure.cost.type";

interface AzureCostChartFilterProps {
    readonly presetRange: AzureCostPresetRange;
    readonly onPresetRangeChange: (range: AzureCostPresetRange) => void;
    readonly customGranularity: AzureCostGranularity;
    readonly onCustomGranularityChange: (val: AzureCostGranularity) => void;
    readonly fromDate: string;
    readonly onFromDateChange: (val: string) => void;
    readonly toDate: string;
    readonly onToDateChange: (val: string) => void;
    readonly onRefresh: () => void;
    readonly onSync: () => void;
    readonly isLoading?: boolean;
    readonly isSyncing?: boolean;
}

export function AzureCostChartFilter({
    presetRange,
    onPresetRangeChange,
    customGranularity,
    onCustomGranularityChange,
    fromDate,
    onFromDateChange,
    toDate,
    onToDateChange,
    onRefresh,
    onSync,
    isLoading = false,
    isSyncing = false,
}: AzureCostChartFilterProps) {
    const t = useTranslations("costServiceManagement.filters");

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Left controls group */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{t("rangeLabel")}</span>
                    </div>

                    {/* Single Main Preset Selector */}
                    <div className="w-64">
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={presetRange}
                            onChange={(e) =>
                                onPresetRangeChange(
                                    e.target.value as AzureCostPresetRange,
                                )
                            }
                        >
                            {PRESET_RANGE_OPTIONS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {t(opt.labelKey)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    {/* Conditional Custom Date Range Controls */}
                    {presetRange === "custom" && (
                        <div className="flex flex-wrap items-center gap-3 border-l border-gray-200 pl-3 dark:border-gray-700">
                            <div className="w-36">
                                <TextField
                                    type="date"
                                    size="small"
                                    fullWidth
                                    label={t("fromDate")}
                                    value={fromDate}
                                    onChange={(e) =>
                                        onFromDateChange(e.target.value)
                                    }
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </div>
                            <span className="text-xs text-gray-400">-</span>
                            <div className="w-36">
                                <TextField
                                    type="date"
                                    size="small"
                                    fullWidth
                                    label={t("toDate")}
                                    value={toDate}
                                    onChange={(e) =>
                                        onToDateChange(e.target.value)
                                    }
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </div>

                            {/* Granularity Selector when in Custom mode */}
                            <div className="w-36">
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label={t("granularityLabel")}
                                    value={customGranularity}
                                    onChange={(e) =>
                                        onCustomGranularityChange(
                                            e.target
                                                .value as AzureCostGranularity,
                                        )
                                    }
                                >
                                    {GRANULARITY_OPTIONS.map((opt) => (
                                        <MenuItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {t(opt.labelKey)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={onRefresh}
                        disabled={isLoading || isSyncing}
                        startIcon={
                            <RefreshCw
                                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                            />
                        }
                        className="!rounded-xl !text-xs !font-semibold !capitalize"
                    >
                        {t("refresh")}
                    </Button>

                    <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={onSync}
                        disabled={isLoading || isSyncing}
                        startIcon={
                            <CloudSync
                                className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
                            />
                        }
                        className="!rounded-xl !text-xs !font-semibold !capitalize"
                    >
                        {isSyncing ? t("syncing") : t("syncData")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
