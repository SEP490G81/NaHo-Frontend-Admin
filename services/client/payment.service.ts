import { apiClient } from "@/libs/apiClient";
import { PaymentOrderQueryRequest } from "@/types/requests/payment.query.request";
import { ApiResponse } from "@/types/responses/base.response";
import { PaymentOrderResponse } from "@/types/responses/payment.response";

export async function fetchPaymentOrdersClient(
    request: PaymentOrderQueryRequest,
): Promise<ApiResponse<PaymentOrderResponse[]>> {
    return apiClient.post<ApiResponse<PaymentOrderResponse[]>>(
        "/api/payments/all",
        request,
    );
}
