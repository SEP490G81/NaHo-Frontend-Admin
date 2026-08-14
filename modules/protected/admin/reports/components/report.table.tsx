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
import ContainerBox from "@/components/ui/container.box";
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
        <ContainerBox className="overflow-hidden !p-0">
            <Table>
                <TableHead className="bg-bgc-app sticky top-0 z-10">
                    <TableRow className="border-bdc-primary border-b">
                        <TableCell
                            align="center"
                            className="text-text-muted w-12 text-center text-xs font-semibold tracking-wider uppercase"
                        >
                            {t("stt")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-muted text-center text-xs font-semibold tracking-wider uppercase"
                        >
                            {t("reporter")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-muted text-center text-xs font-semibold tracking-wider uppercase"
                        >
                            {t("content")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-muted text-center text-xs font-semibold tracking-wider uppercase"
                        >
                            {t("files")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-muted text-center text-xs font-semibold tracking-wider uppercase"
                        >
                            {t("status")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-muted w-28 text-center text-xs font-semibold tracking-wider uppercase"
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
        </ContainerBox>
    );
}
