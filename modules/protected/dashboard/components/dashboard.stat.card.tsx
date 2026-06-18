"use client";
import React, { ReactNode } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { formatDeltaPct, formatNumber } from "../utils/dashboard.format";

interface DashboardStatCardProps {
    label: string;
    value: number;
    deltaPct: number;
    /** Caption after the delta, e.g. "so với kỳ trước". */
    deltaCaption: string;
    icon: ReactNode;
    /** Tailwind classes for the icon chip, e.g. "bg-sky-100 text-sky-600". */
    iconClassName: string;
}

const DashboardStatCard = ({
    label,
    value,
    deltaPct,
    deltaCaption,
    icon,
    iconClassName,
}: DashboardStatCardProps) => {
    const isUp = deltaPct >= 0;

    return (
        <div className="bg-bgc-app rounded-xl border border-transparent p-5">
            <div className="flex items-start justify-between gap-3">
                <p className="text-text-muted text-sm">{label}</p>
                <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
                >
                    {icon}
                </span>
            </div>
            <p className="mt-3 text-3xl font-bold">{formatNumber(value)}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
                <span
                    className={`inline-flex items-center gap-0.5 font-semibold ${
                        isUp ? "text-emerald-600" : "text-rose-600"
                    }`}
                >
                    {isUp ? (
                        <ArrowUpwardRoundedIcon sx={{ fontSize: 14 }} />
                    ) : (
                        <ArrowDownwardRoundedIcon sx={{ fontSize: 14 }} />
                    )}
                    {formatDeltaPct(deltaPct)}
                </span>
                <span className="text-text-muted">{deltaCaption}</span>
            </div>
        </div>
    );
};

export default DashboardStatCard;
