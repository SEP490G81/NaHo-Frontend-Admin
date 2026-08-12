import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    SubscriptionPlanResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";
import { UpgradeSubscriptionRequest } from "@/types/requests/subscription.request";
import { ApiError } from "@/libs/api.error";

export async function fetchSubscriptionPlansClient(): Promise<
    ApiResponse<SubscriptionPlanResponse[]>
> {
    const response = await fetch("/api/subscription-plans", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<SubscriptionPlanResponse[]>;
}

export async function fetchUserSubscriptionClient(
    userId: number,
): Promise<ApiResponse<UserSubscriptionResponse>> {
    const response = await fetch(`/api/subscriptions/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<UserSubscriptionResponse>;
}

export async function upgradeUserSubscriptionClient(
    body: UpgradeSubscriptionRequest,
): Promise<ApiResponse<UserSubscriptionResponse>> {
    const response = await fetch("/api/payments/admin/upgrade-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<UserSubscriptionResponse>;
}
