"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { patchReportStatusClient } from "@/services/client/report.service";
import { ReportStatusPatchRequest } from "@/types/requests/report.request";

export function useReportStatusMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            reportId,
            body,
        }: {
            reportId: number;
            body: ReportStatusPatchRequest;
        }) => {
            return patchReportStatusClient(reportId, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...queryKeys.reports.all],
            });
        },
    });
}
