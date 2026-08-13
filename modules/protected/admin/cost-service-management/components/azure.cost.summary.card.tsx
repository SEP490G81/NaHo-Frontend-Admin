"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { BarChart3, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { formatCostCurrency } from "../utils/cost.service.util";

interface AzureCostSummaryCardProps {
    readonly mtdCost?: number;
    readonly periodCost?: number;
    readonly currency?: string;
    readonly dataPointsCount?: number;
    readonly isLoading?: boolean;
}

export function AzureCostSummaryCard({
    mtdCost = 0,
    periodCost = 0,
    currency = "USD",
    dataPointsCount = 0,
    isLoading = false,
}: AzureCostSummaryCardProps) {
    const t = useTranslations("costServiceManagement.kpi");

    const avgCost = dataPointsCount > 0 ? periodCost / dataPointsCount : 0;

    const cards = [
        {
            title: t("mtdCost"),
            value: formatCostCurrency(mtdCost, currency),
            subtitle: t("mtdSubtitle"),
            icon: <DollarSign className="h-5 w-5" />,
            colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
            borderColor: "border-l-4 border-l-blue-500",
        },
        {
            title: t("periodCost"),
            value: formatCostCurrency(periodCost, currency),
            subtitle: t("periodSubtitle"),
            icon: <TrendingUp className="h-5 w-5" />,
            colorClass: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
            borderColor: "border-l-4 border-l-pink-500",
        },
        {
            title: t("avgCost"),
            value: formatCostCurrency(avgCost, currency),
            subtitle: t("avgSubtitle"),
            icon: <Calendar className="h-5 w-5" />,
            colorClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
            borderColor: "border-l-4 border-l-purple-500",
        },
        {
            title: t("dataPoints"),
            value: `${dataPointsCount}`,
            subtitle: t("dataPointsSubtitle"),
            icon: <BarChart3 className="h-5 w-5" />,
            colorClass:
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            borderColor: "border-l-4 border-l-emerald-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-5 shadow-sm transition-all duration-200 hover:shadow-md ${card.borderColor}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {card.title}
                        </span>
                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.colorClass}`}
                        >
                            {card.icon}
                        </div>
                    </div>

                    <div className="mt-4">
                        {isLoading ? (
                            <Skeleton variant="text" width="60%" height={40} />
                        ) : (
                            <div className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                                {card.value}
                            </div>
                        )}
                        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                            {card.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
