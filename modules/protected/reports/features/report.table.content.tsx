"use client";

import React, { useMemo } from "react";
import { ReportSearchBox } from "../components/report.search.box";
import { ReportTable } from "../components/report.table";
import { ReportDetailsModal } from "../components/report.details.modal";
import { ReportResolveModal } from "../components/report.resolve.modal";
import { useReportQuery } from "../hooks/use.report.query";
import { useReportFilter } from "../providers/report.filter.provider";
import { ReportStatusFilter } from "@/types/enums/report.enum";

export function ReportTableContent() {
    const { data, isLoading } = useReportQuery();
    const { filter } = useReportFilter();

    const rawReports = useMemo(() => data?.data || [], [data]);

    const filteredReports = useMemo(() => {
        return rawReports.filter((report) => {
            // 1. Status Filter
            if (filter.isResolved === ReportStatusFilter.RESOLVED && !report.isResolved) {
                return false;
            }
            if (filter.isResolved === ReportStatusFilter.UNRESOLVED && report.isResolved) {
                return false;
            }

            // 2. Keyword Search
            if (filter.searchKeyword.trim()) {
                const kw = filter.searchKeyword.toLowerCase().trim();
                const matchTitle = report.title?.toLowerCase().includes(kw);
                const matchDesc = report.description?.toLowerCase().includes(kw);
                const matchName = report.fullName?.toLowerCase().includes(kw);
                const matchId = String(report.id).includes(kw) || String(report.userId).includes(kw);
                if (!matchTitle && !matchDesc && !matchName && !matchId) {
                    return false;
                }
            }

            return true;
        });
    }, [rawReports, filter]);

    return (
        <div className="flex flex-col gap-5">
            <ReportSearchBox />
            <ReportTable reports={filteredReports} isLoading={isLoading} />
            <ReportDetailsModal />
            <ReportResolveModal />
        </div>
    );
}
