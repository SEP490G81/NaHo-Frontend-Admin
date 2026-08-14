"use client";

import React from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { BarChart2, TrendingUp } from "lucide-react";
import { FormattedAwsChartPoint } from "../types/aws.cost.type";
import { formatCostCurrency } from "../utils/cost.service.util";

interface AwsCostMainChartProps {
    readonly data: FormattedAwsChartPoint[];
    readonly granularity?: string;
    readonly currency?: string;
    readonly isLoading?: boolean;
}

export function AwsCostMainChart({
    data,
    granularity = "Monthly",
    currency = "USD",
    isLoading = false,
}: AwsCostMainChartProps) {
    const t = useTranslations("costServiceManagement.chartAws");

    const formatYAxis = (val: number) => {
        if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}k`;
        return `$${val.toFixed(2)}`;
    };

    return (
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-5 shadow-sm">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

            <div className="flex items-center justify-between pb-2">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                            {t("title")}
                        </h3>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {t("subtitle", { granularity })}
                    </p>
                </div>
            </div>

            <div className="h-80 min-h-[300px] w-full pt-4">
                {isLoading ? (
                    <Skeleton variant="rounded" width="100%" height="100%" />
                ) : !data || data.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-gray-400">
                        <BarChart2 className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                        <span>{t("noData")}</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 15, right: 25, left: 5, bottom: 5 }}
                        >
                            <defs>
                                <linearGradient
                                    id="awsCostGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#f59e0b"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#ea580c"
                                        stopOpacity={0.0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e5e7eb"
                            />
                            <XAxis
                                dataKey="formattedDate"
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                stroke="#d1d5db"
                            />
                            <YAxis
                                tickFormatter={formatYAxis}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                                stroke="#d1d5db"
                            />
                            <Tooltip
                                formatter={(value: unknown) => [
                                    formatCostCurrency(
                                        Number(value || 0),
                                        currency,
                                    ),
                                    t("tooltipCost"),
                                ]}
                                labelFormatter={(label) =>
                                    t("tooltipDate", { label })
                                }
                                contentStyle={{
                                    borderRadius: "14px",
                                    border: "1px solid #cbd5e1",
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.95)",
                                    boxShadow:
                                        "0 10px 25px -5px rgba(245, 158, 11, 0.2)",
                                    fontWeight: 600,
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cost"
                                stroke="#d97706"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#awsCostGradient)"
                                dot={{
                                    r: 4,
                                    fill: "#d97706",
                                    strokeWidth: 2,
                                    stroke: "#ffffff",
                                }}
                                activeDot={{
                                    r: 7,
                                    fill: "#b45309",
                                    stroke: "#ffffff",
                                    strokeWidth: 3,
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
