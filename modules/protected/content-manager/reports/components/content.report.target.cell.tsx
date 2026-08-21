"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ReportType } from "@/types/enums/report.enum";
import { ContentReport } from "../types/content.report.type";

interface Props {
    readonly report: ContentReport;
}

/**
 * Đối tượng bị báo cáo: câu hỏi hay bình luận nào. Backend chỉ trả về id nên
 * bảng chỉ hiển thị mã tham chiếu, nội dung đầy đủ nằm ở modal chi tiết.
 */
export function ContentReportTargetCell({ report }: Props) {
    const t = useTranslations("contentReportManagement.target");

    const isComment = report.reportType === ReportType.COMMENT;
    const targetId = isComment ? report.commentId : report.questionId;

    if (!targetId) {
        return <span className="text-text-muted text-xs">{t("none")}</span>;
    }

    return (
        <div className="flex flex-col items-center">
            <span className="text-text-contrast text-xs font-semibold">
                {isComment ? t("comment") : t("question")}
            </span>
            <span className="text-text-muted font-mono text-[11px]">
                #{targetId}
            </span>
        </div>
    );
}
