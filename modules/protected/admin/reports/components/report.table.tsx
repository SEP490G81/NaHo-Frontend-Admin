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
import { ReportResponse } from "@/types/responses/report.response";
import { ReportTableRow } from "./report.table.row";
import { ReportTableSkeleton } from "./report.table.skeleton";
import { ReportTableEmpty } from "./report.table.empty";

interface ReportTableProps {
    readonly reports: ReportResponse[];
    readonly isLoading: boolean;
}

export function ReportTable({ reports, isLoading }: ReportTableProps) {
    const t = useTranslations("reportManagement.table");

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            className="overflow-hidden rounded-xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] shadow-sm"
        >
            <Table>
                <TableHead>
                    <TableRow className="bg-gray-50/80 dark:bg-gray-800/80">
                        <TableCell
                            align="center"
                            className="w-12 text-center text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                            {t("stt")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-center text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                            {t("reporter")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-center text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                            {t("content")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-center text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                            {t("files")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-center text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                            {t("status")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="w-28 text-center text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300"
                        >
                            {t("actions")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <ReportTableSkeleton rows={5} />
                    ) : !reports || reports.length === 0 ? (
                        <ReportTableEmpty />
                    ) : (
                        reports.map((report, idx) => (
                            <ReportTableRow
                                key={report.id}
                                report={report}
                                index={idx}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
