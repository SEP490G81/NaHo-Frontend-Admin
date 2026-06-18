"use client";
import React from "react";
import { useTranslations } from "next-intl";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import AreaChart from "../components/area.chart";
import { useDashboard } from "../providers/dashboard.provider";
import {
    formatNumber,
    sliceLastDays,
    sumSeries,
} from "../utils/dashboard.format";

const DashboardPracticeChart = () => {
    const t = useTranslations("dashboard.practice");
    const { overview, period } = useDashboard();
    if (!overview) return null;

    const points = sliceLastDays(overview.practiceActivity, period);
    const total = sumSeries(points);

    return (
        <div className="bg-bgc-app flex flex-col rounded-xl p-6">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="font-semibold">{t("title")}</h2>
                    <p className="text-text-muted mt-0.5 text-sm">
                        {t("subtitle")}
                    </p>
                </div>
                <span className="text-icon-fire flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100">
                    <GraphicEqOutlinedIcon sx={{ fontSize: 20 }} />
                </span>
            </div>

            <p className="mt-4 text-3xl font-bold">
                {formatNumber(total)}
                <span className="text-text-muted ml-2 text-sm font-normal">
                    {t("unit")}
                </span>
            </p>

            <div className="mt-auto pt-4">
                <AreaChart points={points} color="#f97316" height={72} />
            </div>
        </div>
    );
};

export default DashboardPracticeChart;
