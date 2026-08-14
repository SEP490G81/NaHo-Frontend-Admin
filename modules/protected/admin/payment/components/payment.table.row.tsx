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
                return "border-l-4 border-l-emerald-500 border-b border-bdc-primary hover:bg-hbgc-app";
            case PaymentStatus.PENDING:
                return "border-l-4 border-l-amber-500 border-b border-bdc-primary hover:bg-hbgc-app";
            case PaymentStatus.CANCELLED:
                return "border-l-4 border-l-slate-400 border-b border-bdc-primary hover:bg-hbgc-app";
            case PaymentStatus.EXPIRED:
                return "border-l-4 border-l-orange-500 border-b border-bdc-primary hover:bg-hbgc-app";
            case PaymentStatus.FAILED:
            default:
                return "border-l-4 border-l-rose-500 border-b border-bdc-primary hover:bg-hbgc-app";
        }
    };

    const getAmountStyle = () => {
        switch (payment.status) {
            case PaymentStatus.PAID:
                return "text-emerald-600 font-bold";
            case PaymentStatus.PENDING:
                return "text-amber-600 font-bold";
            case PaymentStatus.CANCELLED:
                return "text-text-muted line-through font-semibold";
            case PaymentStatus.EXPIRED:
                return "text-orange-600 font-bold";
            case PaymentStatus.FAILED:
            default:
                return "text-rose-600 font-bold";
        }
    };

    return (
        <TableRow hover className={`transition-all ${getRowStyle()}`}>
            <TableCell
                align="center"
                className="text-text-muted text-center text-xs font-semibold"
            >
                {index + 1}
            </TableCell>
            <TableCell
                align="center"
                className="text-center font-mono text-xs font-bold"
            >
                <span className="bg-bgc-app border-bdc-primary text-text-contrast inline-block rounded-md border px-2.5 py-1">
                    {payment.orderCode}
                </span>
            </TableCell>
            <TableCell
                align="center"
                className="text-text-contrast text-center text-xs font-bold"
            >
                #{payment.userId}
            </TableCell>
            <TableCell
                align="center"
                className="text-text-muted text-center text-xs font-semibold"
            >
                Plan #{payment.subscriptionPlanId}
            </TableCell>
            <TableCell
                align="center"
                className={`text-center text-xs ${getAmountStyle()}`}
            >
                {formatCurrency(payment.amount, payment.currency)}
            </TableCell>
            <TableCell align="center" className="text-center">
                <span className="bg-bgc-highlight/10 text-bgc-highlight inline-block rounded-md px-2 py-0.5 text-xs font-semibold">
                    {payment.provider}
                </span>
            </TableCell>
            <TableCell align="center" className="text-center">
                <PaymentStatusBadge status={payment.status} />
            </TableCell>
            <TableCell
                align="center"
                className="text-text-muted text-center text-xs font-medium"
            >
                {formatDate(payment.createdTime)}
            </TableCell>
            <TableCell
                align="center"
                className="text-text-muted text-center text-xs font-medium"
            >
                {formatDate(payment.paidTime)}
            </TableCell>
            <TableCell align="center" className="text-center">
                <Tooltip title="Xem chi tiết">
                    <IconButton
                        size="small"
                        onClick={() => openDetail(payment)}
                        className="text-text-contrast hover:bg-hbgc-app"
                    >
                        <Eye className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

