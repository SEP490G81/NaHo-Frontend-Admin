"use client";

import React from "react";
import { AlertCircle, HelpCircle, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReportType } from "@/types/enums/report.enum";

interface Props {
    readonly reportType: ReportType | string;
}

const BADGE_BASE =
    "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-bold";

export function ContentReportTypeBadge({ reportType }: Props) {
    const t = useTranslations("contentReportManagement.type");

    if (reportType === ReportType.QUESTION) {
        return (
            <span
                className={`${BADGE_BASE} border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300`}
            >
                <HelpCircle className="h-3 w-3" />
                <span>{t("question")}</span>
            </span>
        );
    }

    if (reportType === ReportType.COMMENT) {
        return (
            <span
                className={`${BADGE_BASE} border-pink-200 bg-pink-100 text-pink-700 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300`}
            >
                <MessageSquare className="h-3 w-3" />
                <span>{t("comment")}</span>
            </span>
        );
    }

    return (
        <span
            className={`${BADGE_BASE} border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300`}
        >
            <AlertCircle className="h-3 w-3" />
            <span>{t("other")}</span>
        </span>
    );
}
