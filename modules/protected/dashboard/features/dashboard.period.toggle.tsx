"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { PERIOD_OPTIONS } from "../constants/dashboard.constant";
import { useDashboard } from "../providers/dashboard.provider";
import { DashboardPeriod } from "../types/dashboard.type";

const PERIOD_KEY: Record<DashboardPeriod, "days7" | "days14" | "days30"> = {
    7: "days7",
    14: "days14",
    30: "days30",
};

const DashboardPeriodToggle = () => {
    const t = useTranslations("dashboard.period");
    const { period, setPeriod } = useDashboard();

    return (
        <div
            role="group"
            aria-label={t("label")}
            className="bg-bgc-page inline-flex rounded-lg p-1"
        >
            {PERIOD_OPTIONS.map((option) => {
                const isActive = option === period;
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => setPeriod(option)}
                        aria-pressed={isActive}
                        className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                            isActive
                                ? "bg-bgc-app text-text-success shadow-sm"
                                : "text-text-muted hover:text-current"
                        }`}
                    >
                        {t(PERIOD_KEY[option])}
                    </button>
                );
            })}
        </div>
    );
};

export default DashboardPeriodToggle;
