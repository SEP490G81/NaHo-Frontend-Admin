import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    OpenAiCostChartData,
    OpenAiCostChartParams,
    OpenAiCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/openai.cost.type";
import { ApiError } from "@/libs/api.error";

export async function fetchOpenAiCostSummaryClient(): Promise<
    ApiResponse<OpenAiCostSummaryData>
> {
    const response = await fetch("/api/openai-cost/summary", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<OpenAiCostSummaryData>;
}

export async function fetchOpenAiCostChartClient(
    params?: OpenAiCostChartParams,
): Promise<ApiResponse<OpenAiCostChartData>> {
    const searchParams = new URLSearchParams();
    if (params?.timeframe) searchParams.set("timeframe", params.timeframe);
    if (params?.granularity)
        searchParams.set("granularity", params.granularity);
    if (params?.fromDate) searchParams.set("fromDate", params.fromDate);
    if (params?.toDate) searchParams.set("toDate", params.toDate);

    const queryString = searchParams.toString();
    const url = `/api/openai-cost/chart${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<OpenAiCostChartData>;
}

export async function triggerOpenAiCostSyncClient(): Promise<void> {
    const response = await fetch("/api/openai-cost/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        let errBody: ProblemDetail;
        try {
            errBody = await response.json();
        } catch {
            errBody = {
                title: "Sync Error",
                status: response.status || 500,
                detail: "Failed to trigger OpenAI cost sync",
                errorCode: "OPENAI_COST_SYNC_ERROR",
            };
        }
        throw new ApiError(errBody);
    }
}
