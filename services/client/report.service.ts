import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { ReportResponse } from "@/types/responses/report.response";
import { ReportStatusPatchRequest } from "@/types/requests/report.request";
import { ApiError } from "@/libs/api.error";

export async function fetchAdminReportsClient(): Promise<
    ApiResponse<ReportResponse[]>
> {
    const response = await fetch("/api/reports/admin", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<ReportResponse[]>;
}

export async function patchReportStatusClient(
    reportId: number,
    body: ReportStatusPatchRequest,
): Promise<ApiResponse<ReportResponse>> {
    const response = await fetch(`/api/reports/${reportId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<ReportResponse>;
}
