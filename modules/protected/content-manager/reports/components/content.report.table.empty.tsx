"use client";

import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { FlagOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTENT_REPORT_TABLE_COLUMN_COUNT } from "../constants/content.report.constants";

export function ContentReportTableEmpty() {
    const t = useTranslations("contentReportManagement.table");

    return (
        <TableRow>
            <TableCell
                colSpan={CONTENT_REPORT_TABLE_COLUMN_COUNT}
                align="center"
                className="py-12 text-center"
            >
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
