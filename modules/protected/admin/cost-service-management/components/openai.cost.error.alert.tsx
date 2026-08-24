"use client";

import React from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { getErrorMessage } from "../utils/cost.service.util";

interface OpenAiCostErrorAlertProps {
    readonly error: unknown;
    readonly onRetry: () => void;
    readonly isRetrying?: boolean;
}

export function OpenAiCostErrorAlert({
    error,
    onRetry,
    isRetrying = false,
}: OpenAiCostErrorAlertProps) {
    const t = useTranslations("costServiceManagement.errorOpenAi");
    const message = getErrorMessage(error);

    return (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-300/80 bg-emerald-500/10 p-5 dark:border-emerald-700/60 dark:bg-emerald-950/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                            {t("title")}
                        </h4>
                        <p className="mt-1 text-xs text-emerald-800/90 dark:text-emerald-300/80">
                            {t("desc")}
                        </p>
                        {message && (
                            <p className="mt-1.5 font-mono text-[11px] text-emerald-700/80 dark:text-emerald-400/70">
                                Lỗi chi tiết: {message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex shrink-0 items-center justify-end">
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={onRetry}
                        disabled={isRetrying}
                        startIcon={
                            <RefreshCw
                                className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
                            />
                        }
                        className="!rounded-xl !text-xs !font-bold"
                    >
                        {isRetrying ? t("retrying") : t("retryBtn")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
