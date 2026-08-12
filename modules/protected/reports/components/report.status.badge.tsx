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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border shadow-2xs bg-emerald-100/90 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t("resolved")}</span>
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border shadow-2xs bg-amber-100/90 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700">
            <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 animate-pulse shrink-0" />
            <span>{t("unresolved")}</span>
        </span>
    );
}
