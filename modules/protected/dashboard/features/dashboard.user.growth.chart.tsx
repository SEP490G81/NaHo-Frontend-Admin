"use client";
import React from "react";
import { useTranslations } from "next-intl";
import AreaChart from "../components/area.chart";
import DashboardPeriodToggle from "./dashboard.period.toggle";
import { useDashboard } from "../providers/dashboard.provider";
import {
    formatDayMonth,
    formatNumber,
    sliceLastDays,
    sumSeries,
} from "../utils/dashboard.format";

const TICK_COUNT = 5;

const DashboardUserGrowthChart = () => {
    const t = useTranslations("dashboard.userGrowth");
    const { overview, period } = useDashboard();
    if (!overview) return null;

    const points = sliceLastDays(overview.userGrowth, period);
    const total = sumSeries(points);

    // Pick a handful of evenly-spaced x-axis ticks so they never crowd.
    const step = Math.max(1, Math.floor((points.length - 1) / (TICK_COUNT - 1)));
    const ticks = points.filter(
        (_, i) => i % step === 0 || i === points.length - 1,
    );

    return (
        <div className="bg-bgc-app rounded-xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="font-semibold">{t("title")}</h2>
                    <p className="text-text-muted mt-0.5 text-sm">
                        {t("total", { count: formatNumber(total) })}
                    </p>
                </div>
                <DashboardPeriodToggle />
            </div>

            <div className="mt-5">
                <AreaChart points={points} color="#ff99ac" height={200} />
                <div className="text-text-muted mt-2 flex justify-between text-xs">
                    {ticks.map((point) => (
                        <span key={point.date}>{formatDayMonth(point.date)}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardUserGrowthChart;
