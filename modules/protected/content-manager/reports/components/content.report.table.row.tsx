"use client";

import React from "react";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { CheckSquare, Eye, Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useContentReportDetail } from "../providers/content.report.detail.provider";
import { ContentReport } from "../types/content.report.type";
import { ContentReportStatusBadge } from "./content.report.status.badge";
import { ContentReportTargetCell } from "./content.report.target.cell";
import { ContentReportTypeBadge } from "./content.report.type.badge";

interface Props {
    readonly report: ContentReport;
    readonly index: number;
}

export function ContentReportTableRow({ report, index }: Props) {
    const t = useTranslations("contentReportManagement.table");
    const { openDetail, openResolve } = useContentReportDetail();

    const rowAccent = report.isResolved
        ? "border-l-emerald-500"
        : "border-l-amber-500";

    return (
        <TableRow
            hover
            className={`border-bdc-primary hover:bg-hbgc-app border-b border-l-4 transition-all ${rowAccent}`}
        >
            <TableCell
                align="center"
                className="text-text-muted text-center text-xs font-semibold"
            >
                {index + 1}
            </TableCell>

            <TableCell align="center" className="text-center">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-text-contrast text-xs font-bold">
                        {report.fullName || `User #${report.userId}`}
                    </span>
                    <span className="text-text-muted font-mono text-[11px]">
                        #{report.userId}
                    </span>
                </div>
            </TableCell>

            <TableCell align="center" className="max-w-xs text-center">
                <div className="flex flex-col items-center">
                    <span className="text-text-contrast line-clamp-1 text-xs font-bold">
                        {report.title}
                    </span>
                    <span className="text-text-muted line-clamp-1 text-[11px]">
                        {report.description}
                    </span>
                </div>
            </TableCell>

            <TableCell align="center" className="text-center">
                <ContentReportTypeBadge reportType={report.reportType} />
            </TableCell>

            <TableCell align="center" className="text-center">
                <ContentReportTargetCell report={report} />
            </TableCell>

            <TableCell align="center" className="text-center">
                {report.files && report.files.length > 0 ? (
                    <span className="border-bdc-primary bg-bgc-highlight/10 text-bgc-highlight inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold">
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span>{report.files.length}</span>
                    </span>
                ) : (
                    <span className="text-text-muted text-xs">-</span>
                )}
            </TableCell>

            <TableCell align="center" className="text-center">
                <ContentReportStatusBadge isResolved={report.isResolved} />
            </TableCell>

            <TableCell align="center" className="text-center">
                <div className="flex items-center justify-center gap-1">
                    <Tooltip title={t("viewDetail")}>
                        <IconButton
                            size="small"
                            onClick={() => openDetail(report.id)}
                            className="text-text-contrast hover:bg-hbgc-app"
                        >
                            <Eye className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>

                    {!report.isResolved && (
                        <Tooltip title={t("resolve")}>
                            <IconButton
                                size="small"
                                onClick={() => openResolve(report.id)}
                                className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                            >
                                <CheckSquare className="h-4 w-4" />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </TableCell>
        </TableRow>
    );
}
