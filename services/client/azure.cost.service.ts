import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import {
    AzureCostChartData,
    AzureCostChartParams,
    AzureCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/azure.cost.type";

export async function fetchAzureCostSummaryClient(): Promise<
    ApiResponse<AzureCostSummaryData>
> {
    return apiClient.get<ApiResponse<AzureCostSummaryData>>(
        "/api/azure-cost/summary",
    );
}

export async function fetchAzureCostChartClient(
    params?: AzureCostChartParams,
): Promise<ApiResponse<AzureCostChartData>> {
    const searchParams = new URLSearchParams();
    if (params?.timeframe) searchParams.set("timeframe", params.timeframe);
    if (params?.granularity)
        searchParams.set("granularity", params.granularity);
    if (params?.fromDate) searchParams.set("fromDate", params.fromDate);
    if (params?.toDate) searchParams.set("toDate", params.toDate);

    const queryString = searchParams.toString();
    const url = `/api/azure-cost/chart${queryString ? `?${queryString}` : ""}`;

    return apiClient.get<ApiResponse<AzureCostChartData>>(url);
}

export async function triggerAzureCostSyncClient(): Promise<void> {
    await apiClient.post<void>("/api/azure-cost/sync");
}
