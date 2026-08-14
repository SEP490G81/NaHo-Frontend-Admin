"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import { ListFilter, Table } from "lucide-react";
import ContainerBox from "@/components/ui/container.box";
import { FormattedOpenAiChartPoint } from "../types/openai.cost.type";
import { formatCostCurrency } from "../utils/cost.service.util";

interface OpenAiCostBreakdownTableProps {
    readonly data: FormattedOpenAiChartPoint[];
    readonly currency?: string;
    readonly isLoading?: boolean;
}

export function OpenAiCostBreakdownTable({
    data,
    currency = "USD",
    isLoading = false,
}: OpenAiCostBreakdownTableProps) {
    const t = useTranslations("costServiceManagement.tableOpenAi");

    return (
        <ContainerBox className="!p-0 overflow-hidden">
            <div className="border-bdc-primary flex items-center justify-between border-b p-4 sm:p-5">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Table className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-text-contrast text-base font-bold">
                            {t("title")}
                        </h3>
                        <p className="text-text-muted text-xs">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-bgc-app border-bdc-primary text-text-muted border-b text-xs uppercase tracking-wider">
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
                    <tbody className="divide-bdc-primary divide-y">
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
                                    className="text-text-muted px-6 py-8 text-center text-xs"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <ListFilter className="text-text-muted/60 h-5 w-5" />
                                        <span>{t("empty")}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors"
                                >
                                    <td className="text-text-muted px-6 py-4 text-xs font-medium">
                                        {idx + 1}
                                    </td>
                                    <td className="text-text-contrast px-6 py-4 font-semibold">
                                        {row.formattedDate}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                                        {formatCostCurrency(
                                            row.cost,
                                            row.currency || currency,
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-bdc-primary h-2 w-24 overflow-hidden rounded-full">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                                    style={{
                                                        width: `${Math.min(row.sharePercent, 100)}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-text-contrast text-xs font-medium">
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
        </ContainerBox>
    );
}
