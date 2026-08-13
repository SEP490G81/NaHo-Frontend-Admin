"use client";

import React from "react";
import { usePaymentQuery } from "../hooks/use.payment.query";
import { PaymentTable } from "../components/payment.table";
import { PaymentTablePagination } from "../components/payment.table.pagination";

export function PaymentTableContent() {
    const { data, isLoading } = usePaymentQuery();

    const payments = data?.data;
    const pageMeta = data?.meta?.pageMeta;

    const pageOffset = pageMeta ? pageMeta.currentPage * pageMeta.pageSize : 0;

    return (
        <div className="flex flex-col gap-4">
            <PaymentTable
                payments={payments}
                isLoading={isLoading}
                pageOffset={pageOffset}
            />
            <PaymentTablePagination pageMeta={pageMeta} />
        </div>
    );
}
