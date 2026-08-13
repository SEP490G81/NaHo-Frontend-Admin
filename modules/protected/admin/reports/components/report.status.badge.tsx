"use client";

import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReportStatusBadgeProps {
    readonly isResolved: boolean;
}

export function ReportStatusBadge({ isResolved }: ReportStatusBadgeProps) {
    const t = useTranslations("reportManagement.status");

    if (isResolved) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100/90 px-3 py-1 text-xs font-extrabold text-emerald-800 shadow-2xs dark:border-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{t("resolved")}</span>
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/90 px-3 py-1 text-xs font-extrabold text-amber-800 shadow-2xs dark:border-amber-700 dark:bg-amber-950/80 dark:text-amber-300">
            <Clock className="h-3.5 w-3.5 shrink-0 animate-pulse text-amber-600 dark:text-amber-400" />
            <span>{t("unresolved")}</span>
        </span>
    );
}
