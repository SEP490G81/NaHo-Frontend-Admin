"use client";

import React from "react";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { CheckSquare, Eye, Image as ImageIcon } from "lucide-react";
import { ReportResponse } from "@/types/responses/report.response";
import { ReportStatusBadge } from "./report.status.badge";
import { useReportDetail } from "../providers/report.detail.provider";

interface ReportTableRowProps {
    readonly report: ReportResponse;
    readonly index: number;
}

export function ReportTableRow({ report, index }: ReportTableRowProps) {
    const { openDetail, openResolve } = useReportDetail();

    const getRowStyle = () => {
        if (report.isResolved) {
            return "border-l-4 border-l-emerald-500 border-b border-bdc-primary hover:bg-hbgc-app";
        }
        return "border-l-4 border-l-amber-500 border-b border-bdc-primary hover:bg-hbgc-app";
    };

    return (
        <TableRow hover className={`transition-all ${getRowStyle()}`}>
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
                {report.files && report.files.length > 0 ? (
                    <span className="border-bdc-primary bg-bgc-highlight/10 text-bgc-highlight inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold">
                        <ImageIcon className="text-bgc-highlight h-3.5 w-3.5" />
                        <span>{report.files.length} tệp</span>
                    </span>
                ) : (
                    <span className="text-text-muted text-xs">-</span>
                )}
            </TableCell>

            <TableCell align="center" className="text-center">
                <ReportStatusBadge isResolved={report.isResolved} />
            </TableCell>

            <TableCell align="center" className="text-center">
                <div className="flex items-center justify-center gap-1">
                    <Tooltip title="Xem chi tiết">
                        <IconButton
                            size="small"
                            onClick={() => openDetail(report)}
                            className="text-text-contrast hover:bg-hbgc-app"
                        >
                            <Eye className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>

                    {!report.isResolved && (
                        <Tooltip title="Xử lý báo cáo">
                            <IconButton
                                size="small"
                                onClick={() => openResolve(report)}
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

