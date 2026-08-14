"use client";

import React from "react";
import { Flag } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { ReportFilterProvider } from "../providers/report.filter.provider";
import { ReportDetailProvider } from "../providers/report.detail.provider";
import { ReportTableContent } from "./report.table.content";

export default function ReportManagementView() {
    const t = useTranslations("reportManagement");

    return (
        <ReportFilterProvider>
            <ReportDetailProvider>
                <div className="flex w-full flex-col gap-y-4">
                    {/* Header */}
                    <ContainerBox>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-8 w-8 items-center justify-center rounded-xl font-bold">
                                    <Flag className="h-4 w-4" />
                                </div>
                                <h1 className="text-text-contrast text-2xl font-bold">
                                    {t("pageTitle")}
                                </h1>
                            </div>
                            <p className="text-text-muted mt-1 text-xs">
                                {t("pageSubtitle")}
                            </p>
                        </div>
                    </ContainerBox>

                    {/* Table Content */}
                    <ReportTableContent />
                </div>
            </ReportDetailProvider>
        </ReportFilterProvider>
    );
}

