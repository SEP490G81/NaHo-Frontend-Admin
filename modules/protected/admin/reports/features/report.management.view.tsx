"use client";

import React from "react";
import { Flag } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReportFilterProvider } from "../providers/report.filter.provider";
import { ReportDetailProvider } from "../providers/report.detail.provider";
import { ReportTableContent } from "./report.table.content";

export default function ReportManagementView() {
    const t = useTranslations("reportManagement");

    return (
        <ReportFilterProvider>
            <ReportDetailProvider>
                <div className="flex flex-col gap-6 p-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1 rounded-xl border-2 border-gray-200 bg-white p-4 dark:bg-gray-900">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300">
                                <Flag className="h-4 w-4" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                {t("pageTitle")}
                            </h1>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t("pageSubtitle")}
                        </p>
                    </div>

                    {/* Table Content */}
                    <ReportTableContent />
                </div>
            </ReportDetailProvider>
        </ReportFilterProvider>
    );
}
