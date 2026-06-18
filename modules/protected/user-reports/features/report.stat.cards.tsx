"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { ReportStatus } from "@/types/enums/report.enum";
import {
    REPORT_STATUSES,
    STAT_CARD_ACCENT,
    STATUS_KEY,
} from "../constants/user.reports.constant";
import { useUserReports } from "../providers/user.reports.provider";

const ReportStatCards = () => {
    const tStatus = useTranslations("userReports.status");
    const { statusCounts, filters, toggleStatusFilter } = useUserReports();

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {REPORT_STATUSES.map((status: ReportStatus) => {
                const isActive = filters.status === status;
                return (
                    <button
                        key={status}
                        type="button"
                        onClick={() => toggleStatusFilter(status)}
                        aria-pressed={isActive}
                        className={`bg-bgc-app rounded-xl border p-5 text-left transition-colors ${
                            isActive
                                ? "border-bgc-highlight"
                                : "border-transparent hover:bg-hbgc-app"
                        }`}
                    >
                        <p className="text-text-muted text-sm">
                            {tStatus(STATUS_KEY[status])}
                        </p>
                        <p
                            className={`mt-1 text-3xl font-bold ${STAT_CARD_ACCENT[status]}`}
                        >
                            {statusCounts[status]}
                        </p>
                    </button>
                );
            })}
        </div>
    );
};

export default ReportStatCards;
