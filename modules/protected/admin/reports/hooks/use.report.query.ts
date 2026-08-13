"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchAdminReportsClient } from "@/services/client/report.service";
import { ApiResponse } from "@/types/responses/base.response";
import { ReportResponse } from "@/types/responses/report.response";

export function useReportQuery() {
    return useQuery<ApiResponse<ReportResponse[]>>({
        queryKey: [...queryKeys.reports.all],
        queryFn: async () => {
            return fetchAdminReportsClient();
        },
    });
}
