"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import { HelpCircle, Info, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReportType } from "@/types/enums/report.enum";
import { useReportedCommentQuery } from "../hooks/use.reported.comment.query";
import { ContentReport } from "../types/content.report.type";
import { formatCommentTime } from "../utils/content.report.format";

interface Props {
    readonly report: ContentReport;
}

function TargetNotice({ message }: { readonly message: string }) {
    return (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
        </div>
    );
}

/**
 * Khối "Nội dung bị báo cáo" trong modal chi tiết.
 *
 * Với báo cáo bình luận, nội dung được dò ra từ cây bình luận của câu hỏi.
 * Với báo cáo câu hỏi, backend chưa có endpoint lấy chi tiết câu hỏi luyện nói
 * nên chỉ hiển thị mã tham chiếu.
 */
export function ContentReportTargetPanel({ report }: Props) {
    const t = useTranslations("contentReportManagement.targetPanel");

    const isComment = report.reportType === ReportType.COMMENT;
    const { comment, isLoading, isError, isLookupSupported } =
        useReportedCommentQuery({
            questionId: isComment ? report.questionId : null,
            commentId: isComment ? report.commentId : null,
        });

    const targetId = isComment ? report.commentId : report.questionId;

    return (
        <div className="space-y-2">
            <h4 className="text-text-muted flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                {isComment ? (
                    <MessageSquare className="h-4 w-4 text-pink-500" />
                ) : (
                    <HelpCircle className="h-4 w-4 text-purple-500" />
                )}
                <span>{t("title")}</span>
            </h4>

            <div className="bg-bgc-app border-bdc-primary space-y-3 rounded-xl border p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-text-muted">
                        {isComment ? t("commentRef") : t("questionRef")}
                    </span>
                    <span className="text-text-contrast font-mono font-bold">
                        {targetId ? `#${targetId}` : t("missingRef")}
                    </span>
                    {isComment && report.questionId && (
                        <span className="text-text-muted">
                            · {t("inQuestion", { id: report.questionId })}
                        </span>
                    )}
                </div>

                {isLoading && (
                    <div className="space-y-1">
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="90%" />
                        <Skeleton variant="text" width="75%" />
                    </div>
                )}

                {!isLoading && comment && (
                    <div className="border-bdc-primary space-y-2 rounded-lg border p-3">
                        <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-text-contrast text-xs font-bold">
                                {comment.userInfo?.fullName ?? t("unknownUser")}
                            </span>
                            <span className="text-text-muted text-[11px]">
                                {formatCommentTime(comment.createdTime)}
                            </span>
                        </div>
                        <p className="text-text-contrast text-sm leading-relaxed whitespace-pre-wrap">
                            {comment.content}
                        </p>
                    </div>
                )}

                {!isLoading && !comment && isComment && (
                    <TargetNotice
                        message={
                            isError
                                ? t("loadFailed")
                                : isLookupSupported
                                  ? t("commentNotFound")
                                  : t("commentNoQuestionId")
                        }
                    />
                )}

                {!isComment && <TargetNotice message={t("questionNoApi")} />}
            </div>
        </div>
    );
}
