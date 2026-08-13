import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { ApiResponse } from "@/types/responses/base.response";
import {
    AzureCostChartData,
    AzureCostChartParams,
    AzureCostSummaryData,
} from "@/modules/protected/admin/cost-service-management/types/azure.cost.type";

const DEFAULT_PAGE_META = {
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0,
};

export async function fetchAzureCostSummaryServer(): Promise<
    ApiResponse<AzureCostSummaryData>
> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

        const response = await fetch(
            `${process.env.API_URL}/admin/azure-cost/summary`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken
                        ? { Authorization: `Bearer ${accessToken}` }
                        : {}),
                },
                cache: "no-store",
            },
        );

        if (!response.ok) {
            return {
                meta: {
                    traceId: "",
                    timestamp: new Date().toISOString(),
                    pageMeta: DEFAULT_PAGE_META,
                },
                message: "",
                data: { cost: 0, currency: "USD", period: "MonthToDate" },
            };
        }

        return (await response.json()) as ApiResponse<AzureCostSummaryData>;
    } catch {
        return {
            meta: {
                traceId: "",
                timestamp: new Date().toISOString(),
                pageMeta: DEFAULT_PAGE_META,
            },
            message: "",
            data: { cost: 0, currency: "USD", period: "MonthToDate" },
        };
    }
}

export async function fetchAzureCostChartServer(
    params?: AzureCostChartParams,
): Promise<ApiResponse<AzureCostChartData>> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

        const searchParams = new URLSearchParams();
        if (params?.timeframe) searchParams.set("timeframe", params.timeframe);
        if (params?.granularity)
            searchParams.set("granularity", params.granularity);
        if (params?.fromDate) searchParams.set("fromDate", params.fromDate);
        if (params?.toDate) searchParams.set("toDate", params.toDate);

        const queryString = searchParams.toString();
        const url = `${process.env.API_URL}/admin/azure-cost/chart${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return {
                meta: {
                    traceId: "",
                    timestamp: new Date().toISOString(),
                    pageMeta: DEFAULT_PAGE_META,
                },
                message: "",
                data: {
                    totalCost: 0,
                    currency: "USD",
                    granularity: "Monthly",
                    points: [],
                },
            };
        }

        return (await response.json()) as ApiResponse<AzureCostChartData>;
    } catch {
        return {
            meta: {
                traceId: "",
                timestamp: new Date().toISOString(),
                pageMeta: DEFAULT_PAGE_META,
            },
            message: "",
            data: {
                totalCost: 0,
                currency: "USD",
                granularity: "Monthly",
                points: [],
            },
        };
    }
}
