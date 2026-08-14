"use client";

import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Calendar, RefreshCw } from "lucide-react";
import ContainerBox from "@/components/ui/container.box";
import {
    GRANULARITY_OPTIONS,
    PRESET_RANGE_OPTIONS,
} from "../constants/cost.service.constants";
import { AwsCostGranularity, AwsCostPresetRange } from "../types/aws.cost.type";

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontSize: "0.85rem",
        backgroundColor: "var(--color-bgc-app)",
        color: "var(--color-text-contrast)",
        "& fieldset": { borderColor: "var(--color-bdc-primary)" },
        "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-bgc-highlight)",
        },
    },
    "& .MuiInputLabel-root": {
        color: "var(--color-text-muted)",
        fontSize: "0.85rem",
        "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
    },
};

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
        <ContainerBox>
            <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Left controls group */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                        <Calendar className="text-bgc-highlight h-4 w-4" />
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
                            sx={inputSx}
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
                        <div className="border-bdc-primary flex flex-wrap items-center gap-3 border-l pl-3">
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
                                    sx={inputSx}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </div>
                            <span className="text-text-muted text-xs">-</span>
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
                                    sx={inputSx}
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
                                    sx={inputSx}
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
                        size="small"
                        onClick={onRefresh}
                        disabled={isLoading}
                        startIcon={
                            <RefreshCw
                                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                            />
                        }
                        sx={{
                            borderRadius: "10px",
                            borderColor: "var(--color-bdc-primary)",
                            color: "var(--color-text-contrast)",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            px: 2,
                            "&:hover": {
                                borderColor: "var(--color-bgc-highlight)",
                                color: "var(--color-bgc-highlight)",
                                backgroundColor:
                                    "color-mix(in srgb, var(--color-bgc-highlight) 8%, transparent)",
                            },
                        }}
                    >
                        {t("refresh")}
                    </Button>
                </div>
            </div>
        </ContainerBox>
    );
}
