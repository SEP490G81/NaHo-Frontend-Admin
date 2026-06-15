import { ApiResponse } from "@/types/responses/base.response";
import { ReportResponse } from "@/types/responses/report.response";
import { UpdateReportStatusRequest } from "@/types/requests/report.request";
import {
    storeListReports,
    storeUpdateReportStatus,
} from "@/services/client/report.mock.store";

// MOCK: dữ liệu lưu ở localStorage. TODO: thay phần ruột bằng fetch API khi BE sẵn sàng.
const buildMeta = (totalElements: number) => ({
    traceId: "mock-local",
    timestamp: new Date().toISOString(),
    pageMeta: { currentPage: 1, pageSize: 20, totalPages: 1, totalElements },
});

const ok = <T>(data: T, total = 0): ApiResponse<T> => ({
    meta: buildMeta(total),
    message: "OK (mock-local)",
    data,
});

export async function fetchReports(): Promise<ApiResponse<ReportResponse[]>> {
    const data = storeListReports();
    return ok(data, data.length);
}

export async function updateReportStatus(
    request: UpdateReportStatusRequest,
): Promise<ApiResponse<ReportResponse>> {
    return ok(storeUpdateReportStatus(request));
}
