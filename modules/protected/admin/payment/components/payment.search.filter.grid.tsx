"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { usePaymentFilter } from "../providers/payment.filter.provider";
import { PaymentProvider, PaymentStatus } from "@/types/enums/payment.enum";

const ALL = "__ALL__";

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

export function PaymentSearchFilterGrid() {
    const t = useTranslations("paymentManagement.searchBox");
    const { filter, setStatusFilter, setProviderFilter, setUserIdFilter } =
        usePaymentFilter();

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Status Select */}
            <FormControl size="small" sx={inputSx}>
                <InputLabel>{t("statusLabel")}</InputLabel>
                <Select
                    label={t("statusLabel")}
                    value={filter.status ?? ALL}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value === ALL ? null : e.target.value,
                        )
                    }
                >
                    <MenuItem value={ALL}>{t("all")}</MenuItem>
                    <MenuItem value={PaymentStatus.PAID}>
                        {t("statusPaid")}
                    </MenuItem>
                    <MenuItem value={PaymentStatus.PENDING}>
                        {t("statusPending")}
                    </MenuItem>
                    <MenuItem value={PaymentStatus.FAILED}>
                        {t("statusFailed")}
                    </MenuItem>
                    <MenuItem value={PaymentStatus.CANCELLED}>
                        {t("statusCancelled")}
                    </MenuItem>
                    <MenuItem value={PaymentStatus.EXPIRED}>
                        {t("statusExpired")}
                    </MenuItem>
                </Select>
            </FormControl>

            {/* Provider Select */}
            <FormControl size="small" sx={inputSx}>
                <InputLabel>{t("providerLabel")}</InputLabel>
                <Select
                    label={t("providerLabel")}
                    value={filter.provider ?? ALL}
                    onChange={(e) =>
                        setProviderFilter(
                            e.target.value === ALL ? null : e.target.value,
                        )
                    }
                >
                    <MenuItem value={ALL}>{t("all")}</MenuItem>
                    <MenuItem value={PaymentProvider.VNPAY}>VNPAY</MenuItem>
                </Select>
            </FormControl>

            {/* User ID Filter */}
            <TextField
                size="small"
                type="number"
                label={t("userIdLabel")}
                placeholder={t("userIdPlaceholder")}
                value={filter.userId ?? ""}
                onChange={(e) => {
                    const val = e.target.value.trim();
                    setUserIdFilter(val ? Number(val) : null);
                }}
                sx={inputSx}
            />
        </div>
    );
}

export default PaymentSearchFilterGrid;
