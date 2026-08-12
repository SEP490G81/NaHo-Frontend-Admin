"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { RotateCcw, Search } from "lucide-react";
import { useReportFilter } from "../providers/report.filter.provider";
import { ReportStatusFilter } from "@/types/enums/report.enum";

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
    "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
};

export function ReportSearchBox() {
    const t = useTranslations("reportManagement.searchBox");
    const {
        filter,
        pendingKeyword,
        setPendingKeyword,
        setIsResolved,
        applySearch,
        resetFilter,
    } = useReportFilter();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") applySearch();
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Keyword Search */}
            <div className="flex-1 w-full">
                <TextField
                    size="small"
                    fullWidth
                    placeholder={t("keywordPlaceholder")}
                    value={pendingKeyword}
                    onChange={(e) => setPendingKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={inputSx}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={applySearch}
                                        size="small"
                                        sx={{
                                            color: "var(--color-bgc-highlight)",
                                        }}
                                    >
                                        <Search className="h-4 w-4" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-60">
                <FormControl size="small" fullWidth sx={inputSx}>
                    <InputLabel>{t("statusLabel")}</InputLabel>
                    <Select
                        label={t("statusLabel")}
                        value={filter.isResolved}
                        onChange={(e) => setIsResolved(e.target.value)}
                    >
                        <MenuItem value={ReportStatusFilter.ALL}>{t("all")}</MenuItem>
                        <MenuItem value={ReportStatusFilter.UNRESOLVED}>{t("statusUnresolved")}</MenuItem>
                        <MenuItem value={ReportStatusFilter.RESOLVED}>{t("statusResolved")}</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Reset Button */}
            <Tooltip title={t("resetButton")}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={resetFilter}
                    startIcon={<RotateCcw className="h-4 w-4" />}
                    sx={{
                        minWidth: "auto",
                        whiteSpace: "nowrap",
                        borderRadius: "10px",
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-muted)",
                        textTransform: "none",
                        fontSize: "0.8rem",
                        px: 2,
                        py: 0.9,
                        "&:hover": {
                            borderColor: "var(--color-text-error)",
                            color: "var(--color-text-error)",
                            backgroundColor:
                                "color-mix(in srgb, var(--color-text-error) 8%, transparent)",
                        },
                    }}
                >
                    {t("resetButton")}
                </Button>
            </Tooltip>
        </div>
    );
}
