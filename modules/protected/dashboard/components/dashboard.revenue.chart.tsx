"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import { RevenueChartPoint } from "../types/dashboard.type";
import { Skeleton } from "@mui/material";
import { TrendingUp } from "lucide-react";

interface DashboardRevenueChartProps {
    readonly data: RevenueChartPoint[];
    readonly isLoading?: boolean;
    readonly currency?: string;
    readonly className?: string;
}

export function DashboardRevenueChart({
    data,
    isLoading,
    currency = "VND",
    className = "",
}: DashboardRevenueChartProps) {
    const t = useTranslations("dashboard.charts");

    const formatYAxis = (value: number) => {
        if (value >= 1_000_000) {
            return `${(value / 1_000_000).toFixed(1)}M`;
        }
        if (value >= 1_000) {
            return `${(value / 1_000).toFixed(0)}K`;
        }
        return String(value);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency || "VND",
        }).format(val);
    };

    return (
        <div className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-5 shadow-sm ${className}`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-bgc-highlight)] via-pink-500 to-rose-400" />
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                            {t("revenueTrendTitle")}
                        </h3>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {t("revenueTrendSubtitle")}
                    </p>
                </div>
                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-600 border border-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800">
                    {t("themeBadge")}
                </span>
            </div>

            <div className="h-72 w-full pt-4 flex-1 min-h-[280px]">
                {isLoading ? (
                    <Skeleton variant="rounded" width="100%" height="100%" />
                ) : !data || data.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        {t("noRevenueData")}
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 15, right: 25, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3e8ff" />
                            <XAxis
                                dataKey="dateLabel"
                                tick={{ fontSize: 12, fill: "#9ca3af" }}
                                stroke="#f472b6"
                            />
                            <YAxis
                                tickFormatter={formatYAxis}
                                tick={{ fontSize: 12, fill: "#9ca3af" }}
                                stroke="#f472b6"
                            />
                            <Tooltip
                                formatter={(value: any) => [
                                    formatCurrency(Number(value || 0)),
                                    t("tooltipRevenue"),
                                ]}
                                labelFormatter={(label) => t("tooltipDate", { label })}
                                contentStyle={{
                                    borderRadius: "14px",
                                    border: "1px solid #fbcfe8",
                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                    boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)",
                                    fontWeight: 600,
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#ec4899"
                                strokeWidth={3.5}
                                dot={{ r: 4, fill: "#ec4899", strokeWidth: 2, stroke: "#ffffff" }}
                                activeDot={{ r: 8, fill: "#ec4899", stroke: "#ffffff", strokeWidth: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
