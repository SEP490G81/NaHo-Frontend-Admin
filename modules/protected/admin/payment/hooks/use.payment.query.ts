"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { usePaymentFilter } from "../providers/payment.filter.provider";
import { fetchPaymentOrdersClient } from "@/services/client/payment.service";
import { PaymentOrderQueryRequest } from "@/types/requests/payment.query.request";
import { ApiResponse } from "@/types/responses/base.response";
import { PaymentOrderResponse } from "@/types/responses/payment.response";
import { PaymentProvider, PaymentStatus } from "@/types/enums/payment.enum";

/**
 * Client-side hook: gọi Next.js proxy `/api/payments/all` (POST)
 * với filter state từ context.
 */
export function usePaymentQuery() {
    const { filter } = usePaymentFilter();

    return useQuery<ApiResponse<PaymentOrderResponse[]>>({
        queryKey: [...queryKeys.payments.all, filter],
        queryFn: async () => {
            const body: PaymentOrderQueryRequest = {
                page: filter.page,
                size: filter.size,
                sortColumn: filter.sortColumn,
                sortDirection: filter.sortDirection,
                searchKeyword: filter.searchKeyword || undefined,
                userId: filter.userId ?? undefined,
                status:
                    filter.status && filter.status !== "ALL"
                        ? (filter.status as PaymentStatus)
                        : undefined,
                provider:
                    filter.provider && filter.provider !== "ALL"
                        ? (filter.provider as PaymentProvider)
                        : undefined,
                createdTimeFrom: filter.createdTimeFrom || undefined,
                createdTimeTo: filter.createdTimeTo || undefined,
            };

            return fetchPaymentOrdersClient(body);
        },
    });
}
