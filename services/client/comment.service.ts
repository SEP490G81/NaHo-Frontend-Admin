import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { CommentListResponse } from "@/types/responses/comment.response";
import { ApiError } from "@/libs/api.error";

/**
 * Lấy toàn bộ cây bình luận của một câu hỏi luyện nói.
 *
 * Backend chưa có endpoint lấy chi tiết một bình luận theo id, nên màn hình
 * báo cáo nội dung phải tải cả cây rồi tự dò ra bình luận bị báo cáo.
 */
export async function fetchCommentsByQuestionClient(
    speakingQuestionId: number,
): Promise<ApiResponse<CommentListResponse>> {
    const response = await fetch(
        `/api/comments?speakingQuestionId=${speakingQuestionId}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        },
    );

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<CommentListResponse>;
}
