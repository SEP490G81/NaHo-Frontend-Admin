"use client";

import React, { useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { ContentReportSearchBox } from "../components/content.report.search.box";
import { ContentReportStatCards } from "../components/content.report.stat.cards";
import { ContentReportTable } from "../components/content.report.table";
import { useContentReportQuery } from "../hooks/use.content.report.query";
import { useContentReportFilter } from "../providers/content.report.filter.provider";
import {
    buildContentReportStats,
    filterContentReports,
    sortContentReports,
} from "../utils/content.report.filter";
import { ContentReportDetailsModal } from "./content.report.details.modal";
import { ContentReportResolveModal } from "./content.report.resolve.modal";

export function ContentReportTableContent() {
    const t = useTranslations("contentReportManagement");
    const { data, isLoading, isError } = useContentReportQuery();
    const { filter } = useContentReportFilter();

    const reports = useMemo(() => data?.data ?? [], [data]);

    const stats = useMemo(() => buildContentReportStats(reports), [reports]);

    const visibleReports = useMemo(
        () => sortContentReports(filterContentReports(reports, filter)),
        [reports, filter],
    );

    return (
        <div className="flex flex-col gap-y-4">
            <ContentReportStatCards stats={stats} />
            <ContentReportSearchBox />

            {isError ? (
                <ContainerBox className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{t("loadError")}</span>
                </ContainerBox>
            ) : (
                <>
                    <p className="text-text-muted px-1 text-xs">
                        {t("resultCount", {
                            shown: visibleReports.length,
                            total: stats.total,
                        })}
                    </p>
                    <ContentReportTable
                        reports={visibleReports}
                        isLoading={isLoading}
                    />
                </>
            )}

            <ContentReportDetailsModal />
            <ContentReportResolveModal />
        </div>
    );
}
