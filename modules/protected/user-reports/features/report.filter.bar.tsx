"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { InputAdornment, MenuItem, Select } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { ReportType } from "@/types/enums/report.enum";
import { REPORT_TYPES, TYPE_KEY } from "../constants/user.reports.constant";
import { useUserReports } from "../providers/user.reports.provider";

const ReportFilterBar = () => {
    const t = useTranslations("userReports");
    const tType = useTranslations("userReports.type");
    const { filters, setFilters } = useUserReports();

    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <TextFieldCustom
                fullWidth
                size="small"
                placeholder={t("searchPlaceholder")}
                value={filters.search}
                onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                }
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon
                                    fontSize="small"
                                    className="text-text-muted"
                                />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Select
                size="small"
                value={filters.type}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        type: e.target.value as ReportType | "ALL",
                    })
                }
                className="min-w-56"
            >
                <MenuItem value="ALL">{t("filter.allTypes")}</MenuItem>
                {REPORT_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                        {tType(TYPE_KEY[type])}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default ReportFilterBar;
