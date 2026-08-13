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
            return "bg-emerald-50/20 hover:bg-emerald-50/60 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/30 border-l-4 border-l-emerald-500";
        }
        return "bg-amber-50/30 hover:bg-amber-50/70 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border-l-4 border-l-amber-500";
    };

    return (
        <TableRow hover className={`transition-all ${getRowStyle()}`}>
            <TableCell
                align="center"
                className="text-center font-bold text-gray-600 dark:text-gray-400"
            >
                {index + 1}
            </TableCell>

            <TableCell align="center" className="text-center">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        {report.fullName || `User #${report.userId}`}
                    </span>
                    <span className="font-mono text-[11px] text-gray-500">
                        #{report.userId}
                    </span>
                </div>
            </TableCell>

            <TableCell align="center" className="max-w-xs text-center">
                <div className="flex flex-col items-center">
                    <span className="line-clamp-1 text-xs font-bold text-gray-900 dark:text-gray-100">
                        {report.title}
                    </span>
                    <span className="line-clamp-1 text-[11px] text-gray-500">
                        {report.description}
                    </span>
                </div>
            </TableCell>

            <TableCell align="center" className="text-center">
                {report.files && report.files.length > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        <ImageIcon className="h-3.5 w-3.5 text-blue-600" />
                        <span>{report.files.length} tệp</span>
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">-</span>
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
                            className="text-gray-600 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-950/30"
                        >
                            <Eye className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>

                    {!report.isResolved && (
                        <Tooltip title="Xử lý báo cáo">
                            <IconButton
                                size="small"
                                onClick={() => openResolve(report)}
                                className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30"
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
