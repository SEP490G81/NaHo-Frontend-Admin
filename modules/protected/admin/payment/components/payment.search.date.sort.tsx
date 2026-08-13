"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { usePaymentFilter } from "../providers/payment.filter.provider";
import { PaymentSortColumn, SortDirection } from "@/types/enums/payment.enum";
import { PAYMENT_SORT_OPTIONS } from "../constants/payment.table.constants";

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

export function PaymentSearchDateSort() {
    const t = useTranslations("paymentManagement.searchBox");
    const {
        filter,
        setSortColumn,
        toggleSortDirection,
        setCreatedTimeFrom,
        setCreatedTimeTo,
    } = usePaymentFilter();

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Left group: Date range */}
            <div className="flex flex-wrap items-center gap-3">
                <TextField
                    size="small"
                    type="date"
                    label={t("fromLabel")}
                    value={
                        filter.createdTimeFrom
                            ? filter.createdTimeFrom.split("T")[0]
                            : ""
                    }
                    onChange={(e) => {
                        const val = e.target.value;
                        setCreatedTimeFrom(val ? `${val}T00:00:00Z` : "");
                    }}
                    sx={{ ...inputSx, minWidth: 160 }}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                    size="small"
                    type="date"
                    label={t("toLabel")}
                    value={
                        filter.createdTimeTo
                            ? filter.createdTimeTo.split("T")[0]
                            : ""
                    }
                    onChange={(e) => {
                        const val = e.target.value;
                        setCreatedTimeTo(val ? `${val}T23:59:59Z` : "");
                    }}
                    sx={{ ...inputSx, minWidth: 160 }}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
            </div>

            {/* Right group: Sort column + direction toggle */}
            <div className="flex items-center gap-2">
                <FormControl size="small" sx={{ ...inputSx, minWidth: 160 }}>
                    <InputLabel>{t("sortColumnLabel")}</InputLabel>
                    <Select
                        label={t("sortColumnLabel")}
                        value={filter.sortColumn}
                        onChange={(e) =>
                            setSortColumn(e.target.value as PaymentSortColumn)
                        }
                    >
                        {PAYMENT_SORT_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {t(opt.labelKey)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Tooltip
                    title={
                        filter.sortDirection === SortDirection.ASC
                            ? t("sortDirectionAsc")
                            : t("sortDirectionDesc")
                    }
                >
                    <IconButton
                        onClick={toggleSortDirection}
                        sx={{
                            border: "1px solid var(--color-bdc-primary)",
                            borderRadius: "10px",
                            color: "var(--color-bgc-highlight)",
                            "&:hover": {
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {filter.sortDirection === SortDirection.ASC ? (
                            <ArrowDownAZ className="h-5 w-5" />
                        ) : (
                            <ArrowUpZA className="h-5 w-5" />
                        )}
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

export default PaymentSearchDateSort;
