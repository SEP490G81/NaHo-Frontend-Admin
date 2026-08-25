import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import {
    AwsCostChartData,
    AwsCostChartParams,
    AwsCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/aws.cost.type";

export async function fetchAwsCostSummaryClient(): Promise<
    ApiResponse<AwsCostSummaryData>
> {
    return apiClient.get<ApiResponse<AwsCostSummaryData>>(
        "/api/aws-cost/summary",
    );
}

export async function fetchAwsCostChartClient(
    params?: AwsCostChartParams,
): Promise<ApiResponse<AwsCostChartData>> {
    const searchParams = new URLSearchParams();
    if (params?.timeframe) searchParams.set("timeframe", params.timeframe);
    if (params?.granularity)
        searchParams.set("granularity", params.granularity);
    if (params?.fromDate) searchParams.set("fromDate", params.fromDate);
    if (params?.toDate) searchParams.set("toDate", params.toDate);

    const queryString = searchParams.toString();
    const url = `/api/aws-cost/chart${queryString ? `?${queryString}` : ""}`;

    return apiClient.get<ApiResponse<AwsCostChartData>>(url);
}
