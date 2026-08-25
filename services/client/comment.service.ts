import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import { CommentListResponse } from "@/types/responses/comment.response";

/**
 * Lấy toàn bộ cây bình luận của một câu hỏi luyện nói.
 */
export async function fetchCommentsByQuestionClient(
    speakingQuestionId: number,
): Promise<ApiResponse<CommentListResponse>> {
    return apiClient.get<ApiResponse<CommentListResponse>>(
        `/api/comments?speakingQuestionId=${speakingQuestionId}`,
    );
}
