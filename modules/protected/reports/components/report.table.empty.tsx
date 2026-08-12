"use client";

import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { FlagOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function ReportTableEmpty() {
    const t = useTranslations("reportManagement.table");

    return (
        <TableRow>
            <TableCell colSpan={6} align="center" className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                    <FlagOff className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {t("noData")}
                    </p>
                </div>
            </TableCell>
        </TableRow>
    );
}
