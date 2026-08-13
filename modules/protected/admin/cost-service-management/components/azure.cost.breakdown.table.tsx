"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { ListFilter, Table } from "lucide-react";
import { FormattedChartPoint } from "../types/azure.cost.type";
import { formatCostCurrency } from "../utils/cost.service.util";

interface AzureCostBreakdownTableProps {
    readonly data: FormattedChartPoint[];
    readonly currency?: string;
    readonly isLoading?: boolean;
}

export function AzureCostBreakdownTable({
    data,
    currency = "USD",
    isLoading = false,
}: AzureCostBreakdownTableProps) {
    const t = useTranslations("costServiceManagement.table");

    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--color-bdc-primary)] p-4 sm:p-5">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                        <Table className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                            {t("title")}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/80 text-xs text-gray-500 uppercase dark:bg-gray-800/40 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                {t("colIndex")}
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                {t("colDate")}
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                {t("colCost")}
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                {t("colShare")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-bdc-primary)]">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4">
                                        <Skeleton width={20} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Skeleton width={100} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Skeleton width={80} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Skeleton width={60} />
                                    </td>
                                </tr>
                            ))
                        ) : !data || data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-8 text-center text-xs text-gray-400"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <ListFilter className="h-5 w-5 text-gray-300" />
                                        <span>{t("empty")}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/30"
                                >
                                    <td className="px-6 py-4 text-xs font-medium text-gray-400">
                                        {idx + 1}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                                        {row.formattedDate}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                                        {formatCostCurrency(
                                            row.cost,
                                            row.currency || currency,
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                                    style={{
                                                        width: `${Math.min(row.sharePercent, 100)}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                {row.sharePercent}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
