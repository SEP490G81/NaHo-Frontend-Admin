import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import {
    OpenAiCostChartData,
    OpenAiCostChartParams,
    OpenAiCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/openai.cost.type";

export async function fetchOpenAiCostSummaryClient(): Promise<
    ApiResponse<OpenAiCostSummaryData>
> {
    return apiClient.get<ApiResponse<OpenAiCostSummaryData>>(
        "/api/openai-cost/summary",
    );
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

    return apiClient.get<ApiResponse<OpenAiCostChartData>>(url);
}

export async function triggerOpenAiCostSyncClient(): Promise<void> {
    await apiClient.post<void>("/api/openai-cost/sync");
}
