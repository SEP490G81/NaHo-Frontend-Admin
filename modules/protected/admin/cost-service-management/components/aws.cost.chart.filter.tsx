"use client";

import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Calendar, RefreshCw } from "lucide-react";
import {
    GRANULARITY_OPTIONS,
    PRESET_RANGE_OPTIONS,
} from "../constants/cost.service.constants";
import {
    AwsCostGranularity,
    AwsCostPresetRange,
} from "../types/aws.cost.type";

interface AwsCostChartFilterProps {
    readonly presetRange: AwsCostPresetRange;
    readonly onPresetRangeChange: (range: AwsCostPresetRange) => void;
    readonly customGranularity: AwsCostGranularity;
    readonly onCustomGranularityChange: (val: AwsCostGranularity) => void;
    readonly fromDate: string;
    readonly onFromDateChange: (val: string) => void;
    readonly toDate: string;
    readonly onToDateChange: (val: string) => void;
    readonly onRefresh: () => void;
    readonly isLoading?: boolean;
}

export function AwsCostChartFilter({
    presetRange,
    onPresetRangeChange,
    customGranularity,
    onCustomGranularityChange,
    fromDate,
    onFromDateChange,
    toDate,
    onToDateChange,
    onRefresh,
    isLoading = false,
}: AwsCostChartFilterProps) {
    const t = useTranslations("costServiceManagement.filters");

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Left controls group */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Calendar className="h-4 w-4 text-amber-500" />
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
                                    e.target.value as AwsCostPresetRange,
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
                                                .value as AwsCostGranularity,
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
                        disabled={isLoading}
                        startIcon={
                            <RefreshCw
                                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                            />
                        }
                        className="!rounded-xl !text-xs !font-semibold !capitalize"
                    >
                        {t("refresh")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
