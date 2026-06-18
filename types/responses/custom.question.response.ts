import {
    ModerationStatus,
    RejectionCategory,
} from "@/types/enums/moderation.enum";

/** Một từ vựng đính kèm — bảng `vocabularies`, liên kết qua `questions_vocabularies`. */
export interface VocabularyItem {
    id: string;
    /** Từ tiếng Nhật, e.g. 御社 */
    japaneseWord: string;
    /** Furigana dạng markup (cách đọc), e.g. おんしゃ */
    furiganaMarkup: string;
    /** Nghĩa tiếng Việt (vietnamese_meaning_text) */
    vietnameseMeaning: string;
    /** Nghĩa tiếng Anh (english_meaning_text) */
    englishMeaning: string;
}

/** Một mẫu ngữ pháp đính kèm — bảng `grammars`, liên kết qua `questions_grammars`. */
export interface GrammarItem {
    id: string;
    /** Mẫu ngữ pháp tiếng Nhật */
    japanesePattern: string;
    /** Furigana dạng markup */
    furiganaMarkup: string;
    /** Nghĩa tiếng Việt */
    vietnameseMeaning: string;
    /** Nghĩa tiếng Anh */
    englishMeaning: string;
    /** Giải thích cách dùng (explanation) */
    explanation: string;
}

/**
 * Một mục trong hàng đợi kiểm duyệt = bản ghi `questions` do học viên đóng góp
 * + các liên kết `vocabularies` / `grammars` + metadata người gửi & kiểm duyệt.
 */
export interface CustomQuestionResponse {
    id: string;

    // --- Người gửi (học viên) ---
    submitterName: string;
    submitterEmail: string;
    submitterUserId: string;
    submittedAt: string; // ISO

    // --- Bảng questions ---
    japaneseQuestion: string;
    japaneseQuestionMarkup: string; // furigana ruby (cách đọc)
    contextualHint: string;
    /**
     * Topic câu hỏi sẽ thuộc về khi phê duyệt (FK questions.topic_id — BẮT BUỘC
     * theo ERD). Rỗng = học viên chưa gắn topic, giáo viên phải chọn khi duyệt.
     */
    topicId: string;

    // --- Liên kết ---
    vocabularies: VocabularyItem[];
    grammars: GrammarItem[];

    // --- Kiểm duyệt ---
    status: ModerationStatus;
    /** Nhóm lý do từ chối (nếu status = REJECTED) */
    rejectionCategory: RejectionCategory | "";
    /** Ghi chú từ chối tự do — phản hồi cho học viên */
    rejectionReason: string;
    /** Thời điểm giáo viên xử lý (duyệt/từ chối); rỗng nếu chưa xử lý */
    reviewedAt: string;
}
