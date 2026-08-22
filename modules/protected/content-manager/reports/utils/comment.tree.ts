import { CommentResponse } from "@/types/responses/comment.response";

/**
 * Dò một bình luận theo id trong cây bình luận (bình luận gốc + các phản hồi con).
 * Trả về `null` nếu bình luận đã bị xoá hoặc không nằm trong câu hỏi đang tải.
 */
export function findCommentInTree(
    comments: CommentResponse[] | null | undefined,
    commentId: number,
): CommentResponse | null {
    if (!comments || comments.length === 0) {
        return null;
    }

    for (const comment of comments) {
        if (comment.commentId === commentId) {
            return comment;
        }

        const found = findCommentInTree(comment.children, commentId);
        if (found) {
            return found;
        }
    }

    return null;
}
