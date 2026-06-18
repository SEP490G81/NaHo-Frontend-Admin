import { ReportStatus } from "@/types/enums/report.enum";
import { ReportResponse } from "@/types/responses/report.response";
import {
    storeListReports,
    storeUpdateReportStatus,
} from "@/services/client/report.mock.store";

// MOCK: dữ liệu lưu ở localStorage (report.mock.store).
// TODO: khi BE sẵn sàng, thay phần ruột bằng fetch("/api/reports") qua proxy route,
// trả về result.data và throw ProblemDetail.detail khi !ok — giống user.service.ts.

export async function fetchReports(): Promise<ReportResponse[]> {
    return storeListReports();
}

export async function updateReportStatus(
    id: string,
    status: ReportStatus,
): Promise<ReportResponse> {
    return storeUpdateReportStatus({ id, status });
}
