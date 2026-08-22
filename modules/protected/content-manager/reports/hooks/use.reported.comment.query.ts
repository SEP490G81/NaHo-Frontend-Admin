"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchCommentsByQuestionClient } from "@/services/client/comment.service";
import { CommentResponse } from "@/types/responses/comment.response";
import { findCommentInTree } from "../utils/comment.tree";

interface Params {
    readonly questionId?: number | null;
    readonly commentId?: number | null;
}

/**
 * Lấy nội dung bình luận bị báo cáo.
 *
 * Backend chưa có endpoint `GET /comments/{id}`, chỉ có danh sách bình luận theo
 * câu hỏi, nên chỉ tra được khi báo cáo có kèm `questionId`. Trường hợp thiếu
 * `questionId` hoặc bình luận đã bị xoá, hook trả về `comment = null` và màn hình
 * chi tiết sẽ hiển thị thông báo tương ứng.
 */
export function useReportedCommentQuery({ questionId, commentId }: Params) {
    const enabled = Boolean(questionId) && Boolean(commentId);

    const query = useQuery({
        queryKey: [...queryKeys.comments.byQuestion(questionId ?? 0)],
        queryFn: async () =>
            fetchCommentsByQuestionClient(questionId as number),
        enabled,
    });

    const comment: CommentResponse | null = enabled
        ? findCommentInTree(query.data?.data?.comments, commentId as number)
        : null;

    return {
        comment,
        isLoading: enabled && query.isLoading,
        isError: query.isError,
        isLookupSupported: enabled,
    };
}
