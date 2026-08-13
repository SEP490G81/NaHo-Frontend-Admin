"use client";

import React from "react";
import { Pagination } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePaymentFilter } from "../providers/payment.filter.provider";
import { PageMeta } from "@/types/responses/base.response";

interface PaymentTablePaginationProps {
    readonly pageMeta?: PageMeta;
}

export function PaymentTablePagination({
    pageMeta,
}: PaymentTablePaginationProps) {
    const t = useTranslations("paymentManagement.pagination");
    const { setPage } = usePaymentFilter();

    if (!pageMeta) return null;

    const { currentPage, totalPages, totalElements } = pageMeta;

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value - 1);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-4 shadow-sm sm:flex-row">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t("totalElements", { count: totalElements })}
            </div>

            <Pagination
                count={totalPages || 1}
                page={currentPage + 1}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="small"
            />
        </div>
    );
}
