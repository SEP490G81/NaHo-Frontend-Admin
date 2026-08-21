"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { ContentReportDetailProvider } from "../providers/content.report.detail.provider";
import { ContentReportFilterProvider } from "../providers/content.report.filter.provider";
import { ContentReportTableContent } from "./content.report.table.content";

export default function ContentReportManagementView() {
    const t = useTranslations("contentReportManagement");

    return (
        <ContentReportFilterProvider>
            <ContentReportDetailProvider>
                <div className="flex w-full flex-col gap-y-4">
                    <ContainerBox>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-8 w-8 items-center justify-center rounded-xl font-bold">
                                    <ShieldAlert className="h-4 w-4" />
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

                    <ContentReportTableContent />
                </div>
            </ContentReportDetailProvider>
        </ContentReportFilterProvider>
    );
}
