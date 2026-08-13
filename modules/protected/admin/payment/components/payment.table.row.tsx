"use client";

import React from "react";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Eye } from "lucide-react";
import { PaymentOrderResponse } from "@/types/responses/payment.response";
import { PaymentStatus } from "@/types/enums/payment.enum";
import { PaymentStatusBadge } from "./payment.status.badge";
import { usePaymentDetail } from "../providers/payment.detail.provider";

interface PaymentTableRowProps {
    readonly payment: PaymentOrderResponse;
    readonly index: number;
}

export function PaymentTableRow({ payment, index }: PaymentTableRowProps) {
    const { openDetail } = usePaymentDetail();

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency || "VND",
        }).format(amount);
    };

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        return d.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getRowStyle = () => {
        switch (payment.status) {
            case PaymentStatus.PAID:
                return "bg-emerald-50/70 hover:bg-emerald-100/70 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border-l-4 border-l-emerald-500";
            case PaymentStatus.PENDING:
                return "bg-amber-50/70 hover:bg-amber-100/70 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border-l-4 border-l-amber-500";
            case PaymentStatus.CANCELLED:
                return "bg-slate-100/70 hover:bg-slate-200/70 dark:bg-slate-900/50 dark:hover:bg-slate-800/60 border-l-4 border-l-slate-400";
            case PaymentStatus.EXPIRED:
                return "bg-orange-50/70 hover:bg-orange-100/70 dark:bg-orange-950/40 dark:hover:bg-orange-900/50 border-l-4 border-l-orange-500";
            case PaymentStatus.FAILED:
            default:
                return "bg-rose-50/70 hover:bg-rose-100/70 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border-l-4 border-l-rose-500";
        }
    };

    const getAmountStyle = () => {
        switch (payment.status) {
            case PaymentStatus.PAID:
                return "text-emerald-700 dark:text-emerald-300 font-extrabold";
            case PaymentStatus.PENDING:
                return "text-amber-700 dark:text-amber-300 font-extrabold";
            case PaymentStatus.CANCELLED:
                return "text-slate-600 dark:text-slate-400 line-through font-semibold";
            case PaymentStatus.EXPIRED:
                return "text-orange-700 dark:text-orange-300 font-bold";
            case PaymentStatus.FAILED:
            default:
                return "text-rose-700 dark:text-rose-300 font-bold";
        }
    };

    return (
        <TableRow hover className={`transition-all ${getRowStyle()}`}>
            <TableCell
                align="center"
                className="text-center font-bold text-gray-600 dark:text-gray-400"
            >
                {index + 1}
            </TableCell>
            <TableCell
                align="center"
                className="text-center font-mono text-xs font-bold"
            >
                <span className="inline-block rounded-md border border-gray-200 bg-white/90 px-2.5 py-1 text-gray-900 shadow-2xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
                    {payment.orderCode}
                </span>
            </TableCell>
            <TableCell
                align="center"
                className="text-center font-bold text-gray-800 dark:text-gray-200"
            >
                #{payment.userId}
            </TableCell>
            <TableCell
                align="center"
                className="text-center text-xs font-semibold text-gray-700 dark:text-gray-300"
            >
                Plan #{payment.subscriptionPlanId}
            </TableCell>
            <TableCell
                align="center"
                className={`text-center ${getAmountStyle()}`}
            >
                {formatCurrency(payment.amount, payment.currency)}
            </TableCell>
            <TableCell align="center" className="text-center">
                <span className="inline-block rounded-md bg-slate-200/80 px-2 py-0.5 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {payment.provider}
                </span>
            </TableCell>
            <TableCell align="center" className="text-center">
                <PaymentStatusBadge status={payment.status} />
            </TableCell>
            <TableCell
                align="center"
                className="text-center text-xs font-medium text-gray-600 dark:text-gray-300"
            >
                {formatDate(payment.createdTime)}
            </TableCell>
            <TableCell
                align="center"
                className="text-center text-xs font-medium text-gray-600 dark:text-gray-300"
            >
                {formatDate(payment.paidTime)}
            </TableCell>
            <TableCell align="center" className="text-center">
                <Tooltip title="Xem chi tiết">
                    <IconButton
                        size="small"
                        onClick={() => openDetail(payment)}
                        className="text-gray-600 hover:bg-white/80 hover:text-[var(--color-bgc-highlight)] dark:hover:bg-gray-800"
                    >
                        <Eye className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}
