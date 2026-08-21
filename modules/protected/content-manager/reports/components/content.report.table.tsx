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
import { CONTENT_REPORT_TABLE_SKELETON_ROWS } from "../constants/content.report.constants";
import { ContentReport } from "../types/content.report.type";
import { ContentReportTableEmpty } from "./content.report.table.empty";
import { ContentReportTableRow } from "./content.report.table.row";
import { ContentReportTableSkeleton } from "./content.report.table.skeleton";

interface Props {
    readonly reports: ContentReport[];
    readonly isLoading: boolean;
}

const HEAD_CELL =
    "text-text-muted text-center text-xs font-semibold tracking-wider uppercase";

const COLUMN_KEYS = [
    "stt",
    "reporter",
    "content",
    "type",
    "target",
    "files",
    "status",
    "actions",
] as const;

export function ContentReportTable({ reports, isLoading }: Props) {
    const t = useTranslations("contentReportManagement.table");

    return (
        <ContainerBox className="overflow-x-auto !p-0">
            <Table>
                <TableHead className="bg-bgc-app sticky top-0 z-10">
                    <TableRow className="border-bdc-primary border-b">
                        {COLUMN_KEYS.map((key) => (
                            <TableCell
                                key={key}
                                align="center"
                                className={HEAD_CELL}
                            >
                                {t(key)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && (
                        <ContentReportTableSkeleton
                            rows={CONTENT_REPORT_TABLE_SKELETON_ROWS}
                        />
                    )}
                    {!isLoading && reports.length === 0 && (
                        <ContentReportTableEmpty />
                    )}
                    {!isLoading &&
                        reports.map((report, idx) => (
                            <ContentReportTableRow
                                key={report.id}
                                report={report}
                                index={idx}
                            />
                        ))}
                </TableBody>
            </Table>
        </ContainerBox>
    );
}
