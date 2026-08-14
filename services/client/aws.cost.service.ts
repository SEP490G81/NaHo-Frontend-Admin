import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    AwsCostChartData,
    AwsCostChartParams,
    AwsCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/aws.cost.type";
import { ApiError } from "@/libs/api.error";

export async function fetchAwsCostSummaryClient(): Promise<
    ApiResponse<AwsCostSummaryData>
> {
    const response = await fetch("/api/aws-cost/summary", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<AwsCostSummaryData>;
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

    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<AwsCostChartData>;
}
