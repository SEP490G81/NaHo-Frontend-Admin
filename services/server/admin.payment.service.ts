import { ApiResponse } from "@/types/responses/base.response";
import { PaymentOrderResponse } from "@/types/responses/payment.response";
import { PaymentOrderQueryRequest } from "@/types/requests/payment.query.request";
import { serverFetch } from "@/services/server/server.fetch";

/**
 * Server-side: gọi trực tiếp backend thật để lấy danh sách payment orders (admin).
 * Dùng trong Server Component để prefetch data.
 */
export async function fetchAllPaymentOrders(
    request: PaymentOrderQueryRequest,
): Promise<ApiResponse<PaymentOrderResponse[]>> {
    try {
        const backendResponse = await serverFetch("/payments/all", {
            method: "POST",
            body: JSON.stringify(request),
        });

        if (!backendResponse.ok) {
            return {
                meta: {
                    traceId: "",
                    timestamp: new Date().toISOString(),
                    pageMeta: {
                        currentPage: 0,
                        pageSize: 20,
                        totalPages: 0,
                        totalElements: 0,
                        hasNext: false,
                        hasPrevious: false,
                    },
                },
                message: "",
                data: [],
            };
        }

        return (await backendResponse.json()) as ApiResponse<
            PaymentOrderResponse[]
        >;
    } catch {
        return {
            meta: {
                traceId: "",
                timestamp: new Date().toISOString(),
                pageMeta: {
                    currentPage: 0,
                    pageSize: 20,
                    totalPages: 0,
                    totalElements: 0,
                    hasNext: false,
                    hasPrevious: false,
                },
            },
            message: "",
            data: [],
        };
    }
}
