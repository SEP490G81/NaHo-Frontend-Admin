import { MOCK_REPORTS } from "@/app/api/_mock/report.data";
import { ReportResponse } from "@/types/responses/report.response";
import { UpdateReportStatusRequest } from "@/types/requests/report.request";

/**
 * Client-side mock persistence backed by localStorage.
 * TODO: replace these helpers with real API calls when BE is ready.
 */
const REPORT_KEY = "naho_mock_reports";
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const readReports = (): ReportResponse[] => {
    if (typeof window === "undefined") return clone(MOCK_REPORTS);
    const raw = window.localStorage.getItem(REPORT_KEY);
    if (!raw) {
        window.localStorage.setItem(REPORT_KEY, JSON.stringify(MOCK_REPORTS));
        return clone(MOCK_REPORTS);
    }
    try {
        return JSON.parse(raw) as ReportResponse[];
    } catch {
        return clone(MOCK_REPORTS);
    }
};

const writeReports = (list: ReportResponse[]) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(REPORT_KEY, JSON.stringify(list));
    }
};

export const storeListReports = (): ReportResponse[] =>
    readReports().sort((a, b) => b.reportedAt.localeCompare(a.reportedAt));

export const storeUpdateReportStatus = (
    request: UpdateReportStatusRequest,
): ReportResponse => {
    const list = readReports();
    const index = list.findIndex((report) => report.id === request.id);
    if (index === -1) throw new Error("Không tìm thấy báo cáo");
    const updated: ReportResponse = { ...list[index], status: request.status };
    list[index] = updated;
    writeReports(list);
    return updated;
};
