"use client";
import React, { useId } from "react";
import { TimeSeriesPoint } from "@/types/responses/dashboard.response";

interface AreaChartProps {
    points: TimeSeriesPoint[];
    /** Stroke/fill color (any CSS color). Defaults to the brand pink. */
    color?: string;
    /** Rendered height in px (SVG keeps a fixed height, width is fluid). */
    height?: number;
    className?: string;
}

const VIEW_W = 100;
const PAD = 6;

/**
 * Lightweight responsive area chart drawn with pure SVG — no chart library.
 * The viewBox is `0 0 100 H` with `preserveAspectRatio="none"` so it stretches
 * to the container width; the stroke uses `vector-effect: non-scaling-stroke`
 * so it stays crisp despite the non-uniform horizontal scale.
 */
const AreaChart = ({
    points,
    color = "#ff99ac",
    height = 180,
    className = "",
}: AreaChartProps) => {
    const gradientId = useId();

    if (points.length === 0) {
        return <div style={{ height }} className={className} />;
    }

    const values = points.map((p) => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;

    const innerH = height - PAD * 2;
    const xAt = (i: number) =>
        points.length === 1 ? VIEW_W / 2 : (i / (points.length - 1)) * VIEW_W;
    const yAt = (v: number) => PAD + innerH - ((v - min) / span) * innerH;

    const linePath = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.value)}`)
        .join(" ");
    const areaPath = `${linePath} L ${xAt(points.length - 1)} ${height} L ${xAt(0)} ${height} Z`;

    return (
        <svg
            viewBox={`0 0 ${VIEW_W} ${height}`}
            preserveAspectRatio="none"
            width="100%"
            height={height}
            className={className}
            role="img"
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
            <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

export default AreaChart;
