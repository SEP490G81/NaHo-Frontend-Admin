"use client";

import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

export function PaymentTableEmpty() {
    const t = useTranslations("paymentManagement.table");

    return (
        <TableRow>
            <TableCell colSpan={10} className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t("noData")}
                    </p>
                </div>
            </TableCell>
        </TableRow>
    );
}
