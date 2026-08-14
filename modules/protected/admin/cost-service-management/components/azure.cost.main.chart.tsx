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
import ContainerBox from "@/components/ui/container.box";
import { FormattedChartPoint } from "../types/azure.cost.type";
import { formatCostCurrency } from "../utils/cost.service.util";

interface AzureCostMainChartProps {
    readonly data: FormattedChartPoint[];
    readonly granularity?: string;
    readonly currency?: string;
    readonly isLoading?: boolean;
}

export function AzureCostMainChart({
    data,
    granularity = "Monthly",
    currency = "USD",
    isLoading = false,
}: AzureCostMainChartProps) {
    const t = useTranslations("costServiceManagement.chart");

    const formatYAxis = (val: number) => {
        if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}k`;
        return `$${val.toFixed(2)}`;
    };

    return (
        <ContainerBox className="relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <div className="flex items-center justify-between pb-2">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <h3 className="text-text-contrast text-base font-bold">
                            {t("title")}
                        </h3>
                    </div>
                    <p className="text-text-muted mt-1 text-xs">
                        {t("subtitle", { granularity })}
                    </p>
                </div>
            </div>

            <div className="h-80 min-h-[300px] w-full pt-4">
                {isLoading ? (
                    <Skeleton variant="rounded" width="100%" height="100%" />
                ) : !data || data.length === 0 ? (
                    <div className="text-text-muted flex h-full flex-col items-center justify-center gap-2 text-xs">
                        <BarChart2 className="text-text-muted/60 h-8 w-8" />
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
                                    id="azureCostGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#6366f1"
                                        stopOpacity={0.0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--color-bdc-primary)"
                            />
                            <XAxis
                                dataKey="formattedDate"
                                tick={{
                                    fontSize: 12,
                                    fill: "var(--color-text-muted)",
                                }}
                                stroke="var(--color-bdc-muted)"
                            />
                            <YAxis
                                tickFormatter={formatYAxis}
                                tick={{
                                    fontSize: 12,
                                    fill: "var(--color-text-muted)",
                                }}
                                stroke="var(--color-bdc-muted)"
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
                                    borderRadius: "12px",
                                    border: "1px solid var(--color-bdc-primary)",
                                    backgroundColor: "var(--color-bgc-app)",
                                    color: "var(--color-text-contrast)",
                                    fontWeight: 600,
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cost"
                                stroke="#2563eb"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#azureCostGradient)"
                                dot={{
                                    r: 4,
                                    fill: "#2563eb",
                                    strokeWidth: 2,
                                    stroke: "#ffffff",
                                }}
                                activeDot={{
                                    r: 7,
                                    fill: "#1d4ed8",
                                    stroke: "#ffffff",
                                    strokeWidth: 3,
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </ContainerBox>
    );
}
