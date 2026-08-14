"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { BarChart3, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { formatCostCurrency } from "../utils/cost.service.util";

interface AwsCostSummaryCardProps {
    readonly mtdCost?: number;
    readonly periodCost?: number;
    readonly currency?: string;
    readonly dataPointsCount?: number;
    readonly isLoading?: boolean;
}

export function AwsCostSummaryCard({
    mtdCost = 0,
    periodCost = 0,
    currency = "USD",
    dataPointsCount = 0,
    isLoading = false,
}: AwsCostSummaryCardProps) {
    const t = useTranslations("costServiceManagement.kpi");

    const avgCost = dataPointsCount > 0 ? periodCost / dataPointsCount : 0;

    const cards = [
        {
            title: t("mtdCost"),
            value: formatCostCurrency(mtdCost, currency),
            subtitle: t("mtdSubtitle"),
            icon: <DollarSign className="h-5 w-5" />,
            colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            borderColor: "border-l-4 border-l-amber-500",
        },
        {
            title: t("periodCost"),
            value: formatCostCurrency(periodCost, currency),
            subtitle: t("periodSubtitle"),
            icon: <TrendingUp className="h-5 w-5" />,
            colorClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
            borderColor: "border-l-4 border-l-orange-500",
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
                    className={`bg-bgc-app border-bdc-primary flex flex-col justify-between overflow-hidden rounded-xl border p-5 transition-all duration-200 hover:shadow-sm ${card.borderColor}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-text-muted text-xs font-semibold">
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
                            <div className="text-text-contrast text-2xl font-bold tracking-tight">
                                {card.value}
                            </div>
                        )}
                        <p className="text-text-muted mt-1 text-[11px]">
                            {card.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
