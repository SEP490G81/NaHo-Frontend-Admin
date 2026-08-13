"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
} from "@mui/material";
import { RotateCcw, Search } from "lucide-react";
import { usePaymentFilter } from "../providers/payment.filter.provider";
import PaymentSearchFilterGrid from "./payment.search.filter.grid";
import PaymentSearchDateSort from "./payment.search.date.sort";

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

export function PaymentSearchBox() {
    const t = useTranslations("paymentManagement.searchBox");
    const { pendingKeyword, setPendingKeyword, applySearch, resetFilter } =
        usePaymentFilter();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") applySearch();
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Row 1: Keyword search + Reset button */}
            <div className="flex items-center gap-2">
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

            {/* Row 2: Filter selects */}
            <PaymentSearchFilterGrid />

            {/* Row 3: Date range + Sort column & direction */}
            <PaymentSearchDateSort />
        </div>
    );
}
