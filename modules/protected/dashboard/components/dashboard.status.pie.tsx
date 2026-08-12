"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslations } from "next-intl";
import { StatusDistributionPoint } from "../types/dashboard.type";
import { Skeleton } from "@mui/material";
import { PieChart as PieIcon } from "lucide-react";

interface DashboardStatusPieProps {
    readonly data: StatusDistributionPoint[];
    readonly isLoading?: boolean;
    readonly className?: string;
}

export function DashboardStatusPie({
    data,
    isLoading,
    className = "",
}: DashboardStatusPieProps) {
    const t = useTranslations("dashboard.charts");

    return (
        <div className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-5 shadow-sm ${className}`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-[var(--color-bgc-highlight)] to-purple-400" />
            <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300">
                    <PieIcon className="h-4 w-4" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {t("statusDistributionTitle")}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t("statusDistributionSubtitle")}
                    </p>
                </div>
            </div>

            <div className="h-64 w-full pt-2 flex-1 flex items-center justify-center">
                {isLoading ? (
                    <Skeleton variant="circular" width={180} height={180} className="mx-auto" />
                ) : !data || data.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        {t("noDistributionData")}
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={58}
                                outerRadius={84}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(val: any) => [`${val} ${t("unitOrders")}`, t("quantity")]}
                                contentStyle={{
                                    borderRadius: "14px",
                                    border: "1px solid #fbcfe8",
                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                    boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)",
                                    fontWeight: 600,
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs pt-2">
                {data.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-1.5 rounded-full border border-pink-100 bg-pink-50/50 px-2.5 py-1 font-medium dark:border-pink-900/50 dark:bg-pink-950/30"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full shadow-xs"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                            {item.name}: <strong className="text-pink-600 dark:text-pink-300">{item.value}</strong>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
