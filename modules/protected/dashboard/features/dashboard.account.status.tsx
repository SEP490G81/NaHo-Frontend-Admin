"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useDashboard } from "../providers/dashboard.provider";
import { formatNumber } from "../utils/dashboard.format";

const DashboardAccountStatus = () => {
    const t = useTranslations("dashboard.status");
    const { overview } = useDashboard();
    if (!overview) return null;

    const { usersByStatus } = overview;
    const rows = [
        {
            label: t("active"),
            value: usersByStatus.ACTIVE,
            dot: "bg-emerald-500",
        },
        {
            label: t("unactive"),
            value: usersByStatus.UNACTIVE,
            dot: "bg-slate-400",
        },
        { label: t("banned"), value: usersByStatus.BANNED, dot: "bg-rose-500" },
    ];

    return (
        <div className="bg-bgc-app rounded-xl p-6">
            <h2 className="font-semibold">{t("title")}</h2>
            <div className="mt-4 space-y-3">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-center justify-between gap-3"
                    >
                        <span className="flex items-center gap-2 text-sm">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${row.dot}`}
                            />
                            {row.label}
                        </span>
                        <span className="font-semibold">
                            {formatNumber(row.value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardAccountStatus;
