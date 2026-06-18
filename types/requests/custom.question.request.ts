import {
    ModerationStatus,
    RejectionCategory,
} from "@/types/enums/moderation.enum";
import {
    GrammarItem,
    VocabularyItem,
} from "@/types/responses/custom.question.response";

/** Lưu các chỉnh sửa nội dung trước khi quyết định kiểm duyệt. */
export interface SaveCustomQuestionRequest {
    id: string;
    japaneseQuestion: string;
    japaneseQuestionMarkup: string;
    contextualHint: string;
    /** Topic sẽ gắn khi duyệt (questions.topic_id) */
    topicId: string;
    vocabularies: VocabularyItem[];
    grammars: GrammarItem[];
}

/**
 * Quyết định kiểm duyệt — gửi kèm nội dung đã chỉnh sửa để lưu & ra quyết định
 * trong một thao tác (giáo viên có thể sửa rồi duyệt/từ chối ngay).
 */
export interface ModerateCustomQuestionRequest extends SaveCustomQuestionRequest {
    status: Extract<ModerationStatus, "APPROVED" | "REJECTED">;
    /** Bắt buộc khi status = REJECTED */
    rejectionCategory?: RejectionCategory;
    rejectionReason?: string;
}
