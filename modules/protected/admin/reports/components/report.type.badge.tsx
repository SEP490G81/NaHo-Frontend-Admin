"use client";

import React from "react";
import { ReportType } from "@/types/enums/report.enum";
import { AlertCircle, HelpCircle, MessageSquare, Server } from "lucide-react";

interface ReportTypeBadgeProps {
    readonly reportType: ReportType | string;
}

export function ReportTypeBadge({ reportType }: ReportTypeBadgeProps) {
    switch (reportType) {
        case ReportType.SYSTEM:
            return (
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    <Server className="h-3 w-3" />
                    <span>HỆ THỐNG</span>
                </span>
            );
        case ReportType.QUESTION:
            return (
                <span className="inline-flex items-center gap-1 rounded-md border border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    <HelpCircle className="h-3 w-3" />
                    <span>CÂU HỎI</span>
                </span>
            );
        case ReportType.COMMENT:
            return (
                <span className="inline-flex items-center gap-1 rounded-md border border-pink-200 bg-pink-100 px-2.5 py-0.5 text-xs font-bold text-pink-700 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300">
                    <MessageSquare className="h-3 w-3" />
                    <span>BÌNH LUẬN</span>
                </span>
            );
        case ReportType.OTHER:
        default:
            return (
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <AlertCircle className="h-3 w-3" />
                    <span>KHÁC</span>
                </span>
            );
    }
}
