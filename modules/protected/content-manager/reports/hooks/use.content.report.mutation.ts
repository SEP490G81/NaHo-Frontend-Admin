"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { queryKeys } from "@/libs/query.keys";
import { patchReportStatusClient } from "@/services/client/report.service";
import { ReportStatusPatchRequest } from "@/types/requests/report.request";

/**
 * Đánh dấu một báo cáo nội dung là đã xử lý.
 *
 * Backend chỉ chấp nhận chuyển sang trạng thái đã xử lý và ném lỗi nếu báo cáo
 * đã được xử lý trước đó, nên đây là thao tác một chiều.
 */
export function useContentReportMutation() {
    const t = useTranslations("contentReportManagement.toast");
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
                queryKey: [...queryKeys.reports.contentManager],
            });
            toast.success(t("resolveSuccess"));
        },
        onError: (error: Error) => {
            toast.error(error.message || t("resolveError"));
        },
    });
}
