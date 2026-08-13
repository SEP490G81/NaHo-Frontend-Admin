import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    AzureCostChartData,
    AzureCostChartParams,
    AzureCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/azure.cost.type";
import { ApiError } from "@/libs/api.error";

export async function fetchAzureCostSummaryClient(): Promise<
    ApiResponse<AzureCostSummaryData>
> {
    const response = await fetch("/api/azure-cost/summary", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<AzureCostSummaryData>;
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

    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<AzureCostChartData>;
}

export async function triggerAzureCostSyncClient(): Promise<void> {
    const response = await fetch("/api/azure-cost/sync", {
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
                detail: "Failed to trigger Azure cost sync",
                errorCode: "AZURE_COST_SYNC_ERROR",
            };
        }
        throw new ApiError(errBody);
    }
}
