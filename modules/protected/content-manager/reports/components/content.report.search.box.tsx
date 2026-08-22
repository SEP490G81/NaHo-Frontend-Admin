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
import ContainerBox from "@/components/ui/container.box";
import {
    REPORT_TYPE_FILTER_ALL,
    ReportStatusFilter,
    ReportType,
} from "@/types/enums/report.enum";
import { CONTENT_REPORT_TYPES } from "../constants/content.report.constants";
import { useContentReportFilter } from "../providers/content.report.filter.provider";
import { ContentReportTypeFilter } from "../types/content.report.type";

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontSize: "0.85rem",
        backgroundColor: "var(--color-bgc-app)",
        color: "var(--color-text-contrast)",
        "& fieldset": { borderColor: "var(--color-bdc-primary)" },
        "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
        "&.Mui-focused fieldset": { borderColor: "var(--color-bgc-highlight)" },
    },
    "& .MuiInputLabel-root": {
        color: "var(--color-text-muted)",
        fontSize: "0.85rem",
        "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
    },
    "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
};

const TYPE_LABEL_KEY: Record<string, "question" | "comment"> = {
    [ReportType.QUESTION]: "question",
    [ReportType.COMMENT]: "comment",
};

export function ContentReportSearchBox() {
    const t = useTranslations("contentReportManagement.searchBox");
    const tType = useTranslations("contentReportManagement.type");
    const {
        filter,
        pendingKeyword,
        setPendingKeyword,
        setIsResolved,
        setReportType,
        applySearch,
        resetFilter,
    } = useContentReportFilter();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") applySearch();
    };

    return (
        <ContainerBox>
            <div className="flex flex-col items-center gap-3 lg:flex-row">
                <div className="w-full flex-1">
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

                <div className="w-full lg:w-52">
                    <FormControl size="small" fullWidth sx={inputSx}>
                        <InputLabel>{t("reportTypeLabel")}</InputLabel>
                        <Select
                            label={t("reportTypeLabel")}
                            value={filter.reportType}
                            onChange={(e) =>
                                setReportType(
                                    e.target.value as ContentReportTypeFilter,
                                )
                            }
                        >
                            <MenuItem value={REPORT_TYPE_FILTER_ALL}>
                                {t("all")}
                            </MenuItem>
                            {CONTENT_REPORT_TYPES.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {tType(TYPE_LABEL_KEY[type])}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="w-full lg:w-52">
                    <FormControl size="small" fullWidth sx={inputSx}>
                        <InputLabel>{t("statusLabel")}</InputLabel>
                        <Select
                            label={t("statusLabel")}
                            value={filter.isResolved}
                            onChange={(e) => setIsResolved(e.target.value)}
                        >
                            <MenuItem value={ReportStatusFilter.ALL}>
                                {t("all")}
                            </MenuItem>
                            <MenuItem value={ReportStatusFilter.UNRESOLVED}>
                                {t("statusUnresolved")}
                            </MenuItem>
                            <MenuItem value={ReportStatusFilter.RESOLVED}>
                                {t("statusResolved")}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>

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
        </ContainerBox>
    );
}
