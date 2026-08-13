"use client";

import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { PaymentOrderResponse } from "@/types/responses/payment.response";
import { PaymentTableRow } from "./payment.table.row";
import { PaymentTableSkeleton } from "./payment.table.skeleton";
import { PaymentTableEmpty } from "./payment.table.empty";

interface PaymentTableProps {
    readonly payments?: PaymentOrderResponse[];
    readonly isLoading?: boolean;
    readonly pageOffset?: number;
}

export function PaymentTable({
    payments,
    isLoading,
    pageOffset = 0,
}: PaymentTableProps) {
    const t = useTranslations("paymentManagement.table");

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            className="overflow-hidden rounded-xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] shadow-md"
        >
            <Table className="min-w-full">
                <TableHead className="bg-gradient-to-r from-gray-50 via-pink-50/30 to-gray-50 dark:from-gray-800 dark:via-pink-950/20 dark:to-gray-800">
                    <TableRow>
                        <TableCell align="center" className="w-12 text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("stt")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("orderCode")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("userId")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("planId")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("amount")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("provider")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-extrabold text-pink-600 dark:text-pink-400 bg-pink-50/60 dark:bg-pink-950/40">
                            <span className="inline-flex items-center justify-center gap-1 rounded-md px-2 py-0.5 border border-pink-200 dark:border-pink-800">
                                {t("status")}
                            </span>
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("createdTime")}
                        </TableCell>
                        <TableCell align="center" className="text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("paidTime")}
                        </TableCell>
                        <TableCell align="center" className="w-20 text-center font-bold text-gray-700 dark:text-gray-200">
                            {t("actions")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <PaymentTableSkeleton rows={6} />
                    ) : !payments || payments.length === 0 ? (
                        <PaymentTableEmpty />
                    ) : (
                        payments.map((payment, idx) => (
                            <PaymentTableRow
                                key={payment.id || payment.orderCode}
                                payment={payment}
                                index={pageOffset + idx}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
