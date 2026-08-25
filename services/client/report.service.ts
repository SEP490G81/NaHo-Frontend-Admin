import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import { ReportResponse } from "@/types/responses/report.response";
import { ReportStatusPatchRequest } from "@/types/requests/report.request";

export async function fetchAdminReportsClient(): Promise<
    ApiResponse<ReportResponse[]>
> {
    return apiClient.get<ApiResponse<ReportResponse[]>>("/api/reports/admin");
}

export async function fetchContentManagerReportsClient(): Promise<
    ApiResponse<ReportResponse[]>
> {
    return apiClient.get<ApiResponse<ReportResponse[]>>(
        "/api/reports/content-manager",
    );
}

export async function patchReportStatusClient(
    reportId: number,
    body: ReportStatusPatchRequest,
): Promise<ApiResponse<ReportResponse>> {
    return apiClient.patch<ApiResponse<ReportResponse>>(
        `/api/reports/${reportId}/status`,
        body,
    );
}
