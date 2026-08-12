"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { PaymentOrderResponse } from "@/types/responses/payment.response";
import { Skeleton } from "@mui/material";

interface DashboardRecentTransactionsProps {
    readonly orders: PaymentOrderResponse[];
    readonly isLoading?: boolean;
}

export function DashboardRecentTransactions({
    orders,
    isLoading,
}: DashboardRecentTransactionsProps) {
    const t = useTranslations("dashboard.charts");

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency || "VND",
        }).format(amount);
    };

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleString("vi-VN", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {t("recentTransactionsTitle")}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t("recentTransactionsSubtitle")}
                    </p>
                </div>
                <Link
                    href="/payments"
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--color-bgc-highlight)] hover:underline"
                >
                    <span>{t("viewAllOrders")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3">
                            <Skeleton variant="rectangular" width={40} height={40} className="rounded-xl" />
                            <div className="flex-1 px-3">
                                <Skeleton variant="text" width={120} />
                                <Skeleton variant="text" width={80} />
                            </div>
                            <Skeleton variant="text" width={70} />
                        </div>
                    ))
                ) : !orders || orders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                        {t("noRecentTransactions")}
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id || order.orderCode}
                            className="flex items-center justify-between py-3 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100">
                                        {order.orderCode}
                                    </p>
                                    <p className="text-[11px] text-gray-500">
                                        User #{order.userId} • {formatDate(order.paidTime || order.createdTime)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    +{formatCurrency(order.amount, order.currency)}
                                </p>
                                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                    {order.provider}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
