"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PaymentStatus } from "@/types/enums/payment.enum";
import {
    AlertCircle,
    AlertOctagon,
    CheckCircle2,
    Clock,
    XCircle,
} from "lucide-react";

interface PaymentStatusBadgeProps {
    readonly status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    const t = useTranslations("paymentManagement.searchBox");

    const getBadgeConfig = () => {
        switch (status) {
            case PaymentStatus.PAID:
                return {
                    label: t("statusPaid"),
                    icon: (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ),
                    bgClass:
                        "bg-emerald-100/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700",
                    textClass: "text-emerald-800 dark:text-emerald-300",
                };
            case PaymentStatus.PENDING:
                return {
                    label: t("statusPending"),
                    icon: (
                        <Clock className="h-3.5 w-3.5 shrink-0 animate-pulse text-amber-600 dark:text-amber-400" />
                    ),
                    bgClass:
                        "bg-amber-100/90 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700",
                    textClass: "text-amber-800 dark:text-amber-300",
                };
            case PaymentStatus.EXPIRED:
                return {
                    label: t("statusExpired"),
                    icon: (
                        <AlertOctagon className="h-3.5 w-3.5 shrink-0 text-orange-600 dark:text-orange-400" />
                    ),
                    bgClass:
                        "bg-orange-100/90 dark:bg-orange-950/80 border-orange-300 dark:border-orange-700",
                    textClass: "text-orange-800 dark:text-orange-300",
                };
            case PaymentStatus.CANCELLED:
                return {
                    label: t("statusCancelled"),
                    icon: (
                        <XCircle className="h-3.5 w-3.5 shrink-0 text-slate-600 dark:text-slate-400" />
                    ),
                    bgClass:
                        "bg-slate-200/90 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700",
                    textClass: "text-slate-800 dark:text-slate-200",
                };
            case PaymentStatus.FAILED:
            default:
                return {
                    label: t("statusFailed"),
                    icon: (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                    ),
                    bgClass:
                        "bg-rose-100/90 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700",
                    textClass: "text-rose-800 dark:text-rose-300",
                };
        }
    };

    const config = getBadgeConfig();

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold shadow-2xs ${config.bgClass} ${config.textClass}`}
        >
            {config.icon}
            <span>{config.label}</span>
        </span>
    );
}
