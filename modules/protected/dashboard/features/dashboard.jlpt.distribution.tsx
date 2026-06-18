"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { JlptLevel } from "@/types/enums/user.enum";
import { JLPT_BAR_COLOR, JLPT_ORDER } from "../constants/dashboard.constant";
import { useDashboard } from "../providers/dashboard.provider";
import { formatNumber } from "../utils/dashboard.format";

const DashboardJlptDistribution = () => {
    const t = useTranslations("dashboard.jlpt");
    const { overview } = useDashboard();
    if (!overview) return null;

    const byLevel = new Map<JlptLevel, number>(
        overview.jlptDistribution.map((item) => [item.level, item.count]),
    );
    const max = Math.max(1, ...overview.jlptDistribution.map((i) => i.count));

    return (
        <div className="bg-bgc-app rounded-xl p-6">
            <h2 className="font-semibold">{t("title")}</h2>
            <p className="text-text-muted mt-0.5 text-sm">{t("subtitle")}</p>

            <div className="mt-5 space-y-3.5">
                {JLPT_ORDER.map((level) => {
                    const count = byLevel.get(level) ?? 0;
                    const widthPct = Math.round((count / max) * 100);
                    return (
                        <div key={level} className="flex items-center gap-3">
                            <span className="w-7 shrink-0 text-sm font-semibold">
                                {level}
                            </span>
                            <div className="bg-bgc-page h-2.5 flex-1 overflow-hidden rounded-full">
                                <div
                                    className={`h-full rounded-full ${JLPT_BAR_COLOR[level]}`}
                                    style={{ width: `${widthPct}%` }}
                                />
                            </div>
                            <span className="text-text-muted w-20 shrink-0 text-right text-sm">
                                {t("learners", { count: formatNumber(count) })}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardJlptDistribution;
