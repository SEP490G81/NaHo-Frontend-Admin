import { ApiError } from "@/libs/api.error";
import { PaymentOrderQueryRequest } from "@/types/requests/payment.query.request";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { PaymentOrderResponse } from "@/types/responses/payment.response";

export async function fetchPaymentOrdersClient(
    request: PaymentOrderQueryRequest,
): Promise<ApiResponse<PaymentOrderResponse[]>> {
    const response = await fetch("/api/payments/all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }

    return result as ApiResponse<PaymentOrderResponse[]>;
}
