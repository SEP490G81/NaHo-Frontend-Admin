import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { ApiResponse } from "@/types/responses/base.response";
import { PaymentOrderResponse } from "@/types/responses/payment.response";
import { PaymentOrderQueryRequest } from "@/types/requests/payment.query.request";

/**
 * Server-side: gọi trực tiếp backend thật để lấy danh sách payment orders (admin).
 * Dùng trong Server Component để prefetch data.
 */
export async function fetchAllPaymentOrders(
    request: PaymentOrderQueryRequest,
): Promise<ApiResponse<PaymentOrderResponse[]>> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    const backendResponse = await fetch(`${process.env.API_URL}/payments/all`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(request),
        cache: "no-store",
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

    return (await backendResponse.json()) as ApiResponse<PaymentOrderResponse[]>;
}
