"use client";

import React from "react";
import { Skeleton } from "@mui/material";

interface DashboardKpiCardProps {
    readonly title: string;
    readonly value: string | number;
    readonly subtitle?: string;
    readonly icon: React.ReactNode;
    readonly isLoading?: boolean;
    readonly accentColorClass?: string;
    readonly isPrimary?: boolean;
}

export function DashboardKpiCard({
    title,
    value,
    subtitle,
    icon,
    isLoading,
    accentColorClass = "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300",
    isPrimary = false,
}: DashboardKpiCardProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl border bg-[var(--color-bgc-app)] p-5 shadow-sm transition-all hover:shadow-md ${
                isPrimary
                    ? "border-pink-300 shadow-pink-500/5 dark:border-pink-800"
                    : "border-[var(--color-bdc-primary)]"
            }`}
        >
            {isPrimary && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[var(--color-bgc-highlight)] via-pink-500 to-rose-400" />
            )}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        {title}
                    </p>
                    {isLoading ? (
                        <Skeleton variant="text" width={120} height={36} />
                    ) : (
                        <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                            {value}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentColorClass}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}
