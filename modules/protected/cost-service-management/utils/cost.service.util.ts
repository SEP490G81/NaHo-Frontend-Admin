import { ApiError } from "@/libs/api.error";
import {
    AzureCostChartPoint,
    FormattedChartPoint,
} from "../types/azure.cost.type";

export function formatCostCurrency(amount: number, currency: string = "USD"): string {
    const safeAmount = isNaN(amount) ? 0 : amount;
    
    if (currency.toUpperCase() === "USD") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(safeAmount);
    }

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: currency || "VND",
        maximumFractionDigits: 2,
    }).format(safeAmount);
}

export function formatDateLabel(dateStr: string, granularity?: string): string {
    if (!dateStr) return "";

    // 1. YYYYMMDD string format e.g. "20260802"
    if (/^\d{8}$/.test(dateStr)) {
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);
        if (granularity === "Monthly") {
            return `Thg ${month}/${year}`;
        }
        return `${day}/${month}/${year}`;
    }

    // 2. YYYY-MM-DD string format e.g. "2026-08-02"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split("-");
        if (granularity === "Monthly") {
            return `Thg ${month}/${year}`;
        }
        return `${day}/${month}/${year}`;
    }

    // 3. ISO or standard date string e.g. "2026-05-01T00:00:00"
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();

        if (granularity === "Monthly") {
            return `Thg ${month}/${year}`;
        }

        const day = String(parsedDate.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    }

    return dateStr;
}

export function calculateSharePercent(cost: number, totalCost: number): number {
    if (!totalCost || totalCost === 0) return 0;
    const share = (cost / totalCost) * 100;
    return Number(share.toFixed(2));
}

/**
 * Fills in missing months for a continuous N-month window up to the latest date.
 * If a month is missing from the API points, it will be added with cost = 0.
 */
export function fillMissingMonths(
    apiPoints: AzureCostChartPoint[] = [],
    monthsCount: number = 6,
    currency: string = "USD",
): FormattedChartPoint[] {
    const pointsMap = new Map<string, AzureCostChartPoint>();
    let latestDate = new Date();

    apiPoints.forEach((pt) => {
        let d = new Date(pt.dateOrMonth);
        if (isNaN(d.getTime()) && /^\d{8}$/.test(pt.dateOrMonth)) {
            const y = Number(pt.dateOrMonth.slice(0, 4));
            const m = Number(pt.dateOrMonth.slice(4, 6)) - 1;
            const day = Number(pt.dateOrMonth.slice(6, 8));
            d = new Date(y, m, day);
        }

        if (!isNaN(d.getTime())) {
            const yearMonthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            pointsMap.set(yearMonthKey, pt);
            if (d > latestDate) {
                latestDate = d;
            }
        }
    });

    const endYear = latestDate.getFullYear();
    const endMonth = latestDate.getMonth();

    const fullPoints: AzureCostChartPoint[] = [];

    for (let i = monthsCount - 1; i >= 0; i--) {
        const targetDate = new Date(endYear, endMonth - i, 1);
        const yKey = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`;

        const existingPoint = pointsMap.get(yKey);
        if (existingPoint) {
            fullPoints.push(existingPoint);
        } else {
            const isoMonthStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}-01T00:00:00`;
            fullPoints.push({
                dateOrMonth: isoMonthStr,
                cost: 0,
                currency,
            });
        }
    }

    const totalSum = fullPoints.reduce((acc, pt) => acc + pt.cost, 0);

    return fullPoints.map((pt) => ({
        ...pt,
        formattedDate: formatDateLabel(pt.dateOrMonth, "Monthly"),
        sharePercent: calculateSharePercent(pt.cost, totalSum),
    }));
}

/**
 * Formats API chart points for any granularity (Daily / Monthly).
 */
export function processChartPoints(
    apiPoints: AzureCostChartPoint[] = [],
    granularity: string = "Monthly",
    isPresetMode: boolean = true,
    monthsCount: number = 6,
    currency: string = "USD",
): FormattedChartPoint[] {
    if (granularity === "Monthly" && isPresetMode) {
        return fillMissingMonths(apiPoints, monthsCount, currency);
    }

    const totalSum = apiPoints.reduce((acc, pt) => acc + (pt.cost || 0), 0);

    return apiPoints.map((pt) => ({
        ...pt,
        formattedDate: formatDateLabel(pt.dateOrMonth, granularity),
        sharePercent: calculateSharePercent(pt.cost || 0, totalSum),
    }));
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Đã xảy ra lỗi không xác định khi kết nối với Azure Cost API.";
}

