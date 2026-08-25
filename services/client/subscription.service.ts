import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import {
    SubscriptionPlanResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";
import {
    UpdateSubscriptionPlanRequest,
    UpgradeSubscriptionRequest,
} from "@/types/requests/subscription.request";

export async function fetchSubscriptionPlansClient(): Promise<
    ApiResponse<SubscriptionPlanResponse[]>
> {
    return apiClient.get<ApiResponse<SubscriptionPlanResponse[]>>(
        "/api/subscription-plans",
    );
}

export async function updateSubscriptionPlanClient(
    id: number,
    body: UpdateSubscriptionPlanRequest,
): Promise<ApiResponse<SubscriptionPlanResponse>> {
    return apiClient.put<ApiResponse<SubscriptionPlanResponse>>(
        `/api/subscription-plans/${id}`,
        body,
    );
}

export async function fetchUserSubscriptionClient(
    userId: number,
): Promise<ApiResponse<UserSubscriptionResponse>> {
    return apiClient.get<ApiResponse<UserSubscriptionResponse>>(
        `/api/subscriptions/${userId}`,
    );
}

export async function upgradeUserSubscriptionClient(
    body: UpgradeSubscriptionRequest,
): Promise<ApiResponse<UserSubscriptionResponse>> {
    return apiClient.post<ApiResponse<UserSubscriptionResponse>>(
        "/api/payments/admin/upgrade-subscription",
        body,
    );
}
