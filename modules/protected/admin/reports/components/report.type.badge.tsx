"use client";

import React from "react";
import { ReportType } from "@/types/enums/report.enum";
import { Server, HelpCircle, MessageSquare, AlertCircle } from "lucide-react";

interface ReportTypeBadgeProps {
    readonly reportType: ReportType | string;
}

export function ReportTypeBadge({ reportType }: ReportTypeBadgeProps) {
    switch (reportType) {
        case ReportType.SYSTEM:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Server className="h-3 w-3" />
                    <span>HỆ THỐNG</span>
                </span>
            );
        case ReportType.QUESTION:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    <HelpCircle className="h-3 w-3" />
                    <span>CÂU HỎI</span>
                </span>
            );
        case ReportType.COMMENT:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                    <MessageSquare className="h-3 w-3" />
                    <span>BÌNH LUẬN</span>
                </span>
            );
        case ReportType.OTHER:
        default:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <AlertCircle className="h-3 w-3" />
                    <span>KHÁC</span>
                </span>
            );
    }
}
