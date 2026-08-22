"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchContentManagerReportsClient } from "@/services/client/report.service";
import { ApiResponse } from "@/types/responses/base.response";
import { ReportResponse } from "@/types/responses/report.response";

/**
 * Danh sách báo cáo thuộc trách nhiệm content manager (QUESTION + COMMENT).
 * Backend đã lọc sẵn theo endpoint nên FE không lọc lại theo loại ở bước này.
 */
export function useContentReportQuery() {
    return useQuery<ApiResponse<ReportResponse[]>>({
        queryKey: [...queryKeys.reports.contentManager],
        queryFn: async () => {
            return fetchContentManagerReportsClient();
        },
    });
}

/**
 * Đọc lại một báo cáo từ cache danh sách theo id. Nhờ vậy modal luôn phản ánh
 * dữ liệu mới nhất sau khi danh sách được refetch, không cần gọi thêm API.
 */
export function useContentReportById(reportId: number | null) {
    const { data } = useContentReportQuery();

    if (reportId === null) {
        return null;
    }

    return data?.data?.find((report) => report.id === reportId) ?? null;
}
