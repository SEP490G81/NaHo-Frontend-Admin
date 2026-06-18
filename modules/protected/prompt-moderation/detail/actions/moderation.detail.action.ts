import { SaveCustomQuestionRequest } from "@/types/requests/custom.question.request";

export interface ModerationDraftErrors {
    japaneseQuestion: boolean;
    vocab: boolean;
    grammar: boolean;
}

const hasMeaning = (vi: string, en: string) =>
    vi.trim() !== "" || en.trim() !== "";

/**
 * Kiểm tra draft trước khi lưu/duyệt:
 * - Nội dung câu hỏi bắt buộc.
 * - Mỗi từ vựng cần có từ tiếng Nhật + ít nhất một nghĩa.
 * - Mỗi mẫu ngữ pháp cần có mẫu tiếng Nhật + ít nhất một nghĩa.
 */
export const validateModerationDraft = (
    draft: SaveCustomQuestionRequest,
): ModerationDraftErrors => ({
    japaneseQuestion: draft.japaneseQuestion.trim() === "",
    vocab: draft.vocabularies.some(
        (v) =>
            v.japaneseWord.trim() === "" ||
            !hasMeaning(v.vietnameseMeaning, v.englishMeaning),
    ),
    grammar: draft.grammars.some(
        (g) =>
            g.japanesePattern.trim() === "" ||
            !hasMeaning(g.vietnameseMeaning, g.englishMeaning),
    ),
});

export const hasDraftError = (errors: ModerationDraftErrors): boolean =>
    errors.japaneseQuestion || errors.vocab || errors.grammar;
