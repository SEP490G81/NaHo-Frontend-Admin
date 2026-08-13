import { PaymentOrderResponse } from "@/types/responses/payment.response";
import {
    DashboardMetrics,
    RevenueChartPoint,
    StatusDistributionPoint,
    TimeRangePreset,
} from "../types/dashboard.type";
import { PaymentStatus } from "@/types/enums/payment.enum";
import { STATUS_COLORS } from "../constants/dashboard.constants";

export function filterOrdersByTimeRange(
    orders: PaymentOrderResponse[],
    range: TimeRangePreset,
): PaymentOrderResponse[] {
    if (range === "all") return orders;

    const now = new Date();
    const cutoff = new Date();

    if (range === "7d") {
        cutoff.setDate(now.getDate() - 7);
    } else if (range === "30d") {
        cutoff.setDate(now.getDate() - 30);
    } else if (range === "12m") {
        cutoff.setMonth(now.getMonth() - 12);
    }

    return orders.filter((o) => new Date(o.createdTime) >= cutoff);
}

export function calculateMetrics(
    orders: PaymentOrderResponse[],
): DashboardMetrics {
    const totalOrdersCount = orders.length;

    let totalRevenue = 0;
    let paidOrdersCount = 0;
    let pendingOrdersCount = 0;
    let cancelledOrdersCount = 0;
    let expiredOrdersCount = 0;
    let failedOrdersCount = 0;
    let unrealizedRevenue = 0;
    let currency = "VND";

    for (const order of orders) {
        if (order.currency) {
            currency = order.currency;
        }

        switch (order.status) {
            case PaymentStatus.PAID:
                paidOrdersCount++;
                totalRevenue += order.amount || 0;
                break;
            case PaymentStatus.PENDING:
                pendingOrdersCount++;
                unrealizedRevenue += order.amount || 0;
                break;
            case PaymentStatus.CANCELLED:
                cancelledOrdersCount++;
                unrealizedRevenue += order.amount || 0;
                break;
            case PaymentStatus.EXPIRED:
                expiredOrdersCount++;
                unrealizedRevenue += order.amount || 0;
                break;
            case PaymentStatus.FAILED:
            default:
                failedOrdersCount++;
                unrealizedRevenue += order.amount || 0;
                break;
        }
    }

    const successRate =
        totalOrdersCount > 0
            ? Math.round((paidOrdersCount / totalOrdersCount) * 100)
            : 0;

    const averageOrderValue =
        paidOrdersCount > 0 ? Math.round(totalRevenue / paidOrdersCount) : 0;

    return {
        totalRevenue,
        currency,
        totalOrdersCount,
        paidOrdersCount,
        pendingOrdersCount,
        cancelledOrdersCount,
        expiredOrdersCount,
        failedOrdersCount,
        successRate,
        unrealizedRevenue,
        averageOrderValue,
    };
}

export function buildRevenueTrend(
    orders: PaymentOrderResponse[],
    range: TimeRangePreset = "all",
): RevenueChartPoint[] {
    const paidOrders = orders.filter(
        (o) => o.status === PaymentStatus.PAID,
    );

    const map = new Map<string, { revenue: number; paidCount: number }>();

    const sorted = [...paidOrders].sort(
        (a, b) =>
            new Date(a.paidTime || a.createdTime).getTime() -
            new Date(b.paidTime || b.createdTime).getTime(),
    );

    for (const order of sorted) {
        const d = new Date(order.paidTime || order.createdTime);
        let key = "";

        if (range === "7d") {
            const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            const dayName = days[d.getDay()];
            const dateStr = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`;
            key = `${dayName} (${dateStr})`;
        } else if (range === "30d") {
            key = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`;
        } else if (range === "12m") {
            key = `Thg ${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear().toString().slice(2)}`;
        } else {
            key = `Năm ${d.getFullYear()}`;
        }

        const existing = map.get(key) || { revenue: 0, paidCount: 0 };
        map.set(key, {
            revenue: existing.revenue + (order.amount || 0),
            paidCount: existing.paidCount + 1,
        });
    }

    return Array.from(map.entries()).map(([dateLabel, val]) => ({
        dateLabel,
        revenue: val.revenue,
        paidCount: val.paidCount,
    }));
}

export function buildStatusDistribution(
    orders: PaymentOrderResponse[],
): StatusDistributionPoint[] {
    const counts = {
        PAID: 0,
        PENDING: 0,
        CANCELLED: 0,
        EXPIRED: 0,
        FAILED: 0,
    };

    for (const o of orders) {
        if (counts[o.status as keyof typeof counts] !== undefined) {
            counts[o.status as keyof typeof counts]++;
        }
    }

    return [
        { name: "Đã thanh toán (PAID)", value: counts.PAID, color: STATUS_COLORS.PAID, statusKey: "statusPaid" },
        { name: "Chờ thanh toán (PENDING)", value: counts.PENDING, color: STATUS_COLORS.PENDING, statusKey: "statusPending" },
        { name: "Đã hủy (CANCELLED)", value: counts.CANCELLED, color: STATUS_COLORS.CANCELLED, statusKey: "statusCancelled" },
        { name: "Đã hết hạn (EXPIRED)", value: counts.EXPIRED, color: STATUS_COLORS.EXPIRED, statusKey: "statusExpired" },
        { name: "Thất bại (FAILED)", value: counts.FAILED, color: STATUS_COLORS.FAILED, statusKey: "statusFailed" },
    ].filter((item) => item.value > 0);
}
