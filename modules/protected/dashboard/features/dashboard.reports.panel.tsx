"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link } from "@/i18n/navigation";
import ReportStatusBadge from "@/modules/protected/user-reports/components/report.status.badge";
import ReportTypeBadge from "@/modules/protected/user-reports/components/report.type.badge";
import {
    formatRelativeTime,
    getAgeDays,
} from "@/modules/protected/user-reports/utils/report.format";
import {
    DASHBOARD_LINKS,
    STALE_THRESHOLD_DAYS,
} from "../constants/dashboard.constant";
import { useDashboard } from "../providers/dashboard.provider";

const DashboardReportsPanel = () => {
    const t = useTranslations("dashboard.reports");
    const { overview } = useDashboard();
    if (!overview) return null;

    const { pending, inProgress, resolved, recent } = overview.reports;
    const counts = [
        { label: t("pending"), value: pending, accent: "text-slate-600" },
        { label: t("inProgress"), value: inProgress, accent: "text-amber-600" },
        { label: t("resolved"), value: resolved, accent: "text-emerald-600" },
    ];

    return (
        <div className="bg-bgc-app flex flex-col rounded-xl p-6">
            <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">{t("title")}</h2>
                <Link
                    href={DASHBOARD_LINKS.reports}
                    className="text-text-muted hover:text-current flex items-center text-sm font-medium"
                >
                    {t("viewAll")}
                    <ChevronRightRoundedIcon sx={{ fontSize: 18 }} />
                </Link>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {counts.map((item) => (
                    <div key={item.label} className="bg-bgc-page rounded-lg p-3">
                        <p className="text-text-muted text-xs">{item.label}</p>
                        <p className={`mt-1 text-2xl font-bold ${item.accent}`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex-1 space-y-2">
                {recent.length === 0 ? (
                    <p className="text-text-muted py-6 text-center text-sm">
                        {t("empty")}
                    </p>
                ) : (
                    recent.map((report) => {
                        const isOverdue =
                            getAgeDays(report.reportedAt) >= STALE_THRESHOLD_DAYS;
                        return (
                            <div
                                key={report.id}
                                className="hover:bg-hbgc-app flex items-center gap-3 rounded-lg px-2 py-2"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="truncate text-sm font-medium">
                                            {report.senderName}
                                        </span>
                                        <ReportTypeBadge type={report.type} />
                                    </div>
                                    <p className="text-text-muted mt-0.5 text-xs">
                                        {formatRelativeTime(report.reportedAt)}
                                        {isOverdue && (
                                            <span className="ml-1.5 font-semibold text-amber-600">
                                                · {t("overdue")}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <ReportStatusBadge status={report.status} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DashboardReportsPanel;
