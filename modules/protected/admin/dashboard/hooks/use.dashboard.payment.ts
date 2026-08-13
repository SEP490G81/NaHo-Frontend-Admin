"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchPaymentOrdersClient } from "@/services/client/payment.service";
import { TimeRangePreset } from "../types/dashboard.type";
import {
    buildRevenueTrend,
    buildStatusDistribution,
    calculateMetrics,
    filterOrdersByTimeRange,
} from "../utils/dashboard.calculator";

export function useDashboardPayment() {
    const [timeRange, setTimeRange] = useState<TimeRangePreset>("all");

    const query = useQuery({
        queryKey: [...queryKeys.payments.all, "dashboard-metrics"],
        queryFn: async () => {
            return fetchPaymentOrdersClient({
                page: 0,
                size: 100,
                sortColumn: "CREATED_TIME",
                sortDirection: "DESC",
            });
        },
    });

    const rawOrders = useMemo(() => query.data?.data || [], [query.data]);

    const filteredOrders = useMemo(
        () => filterOrdersByTimeRange(rawOrders, timeRange),
        [rawOrders, timeRange],
    );

    const metrics = useMemo(
        () => calculateMetrics(filteredOrders),
        [filteredOrders],
    );

    const revenueTrend = useMemo(
        () => buildRevenueTrend(filteredOrders, timeRange),
        [filteredOrders, timeRange],
    );

    const statusDistribution = useMemo(
        () => buildStatusDistribution(filteredOrders),
        [filteredOrders],
    );

    const recentPaidOrders = useMemo(
        () => filteredOrders.filter((o) => o.status === "PAID").slice(0, 5),
        [filteredOrders],
    );

    return {
        isLoading: query.isLoading,
        error: query.error,
        timeRange,
        setTimeRange,
        metrics,
        revenueTrend,
        statusDistribution,
        recentPaidOrders,
    };
}
