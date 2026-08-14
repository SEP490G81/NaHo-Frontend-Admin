"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
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

    const headCellClass =
        "px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted";

    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <Table className="min-w-full">
                <TableHead className="bg-bgc-app sticky top-0 z-10">
                    <TableRow className="border-bdc-primary border-b">
                        <TableCell align="center" className={headCellClass}>
                            {t("stt")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("orderCode")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("userId")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("planId")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("amount")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("provider")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("status")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("createdTime")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
                            {t("paidTime")}
                        </TableCell>
                        <TableCell align="center" className={headCellClass}>
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
        </div>
    );
}
