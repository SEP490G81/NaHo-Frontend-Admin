import { MOCK_CUSTOM_QUESTIONS } from "@/app/api/_mock/custom.question.data";
import { MOCK_TOPIC_OPTIONS } from "@/app/api/_mock/topic.options.data";
import { ModerationStatus } from "@/types/enums/moderation.enum";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import { TopicOption } from "@/types/responses/topic.option.response";
import {
    ModerateCustomQuestionRequest,
    SaveCustomQuestionRequest,
} from "@/types/requests/custom.question.request";

/**
 * Client-side mock persistence backed by localStorage.
 * TODO: thay các helper này bằng API thật khi BE sẵn sàng.
 */
const STORAGE_KEY = "naho_mock_custom_questions";
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

/** Bổ sung default cho field mới của các bản ghi đã lưu từ phiên cũ. */
const normalize = (raw: Partial<CustomQuestionResponse>): CustomQuestionResponse =>
    ({
        ...raw,
        topicId: raw.topicId ?? "",
        rejectionCategory: raw.rejectionCategory ?? "",
        rejectionReason: raw.rejectionReason ?? "",
        reviewedAt: raw.reviewedAt ?? "",
        vocabularies: raw.vocabularies ?? [],
        grammars: raw.grammars ?? [],
    }) as CustomQuestionResponse;

const readAll = (): CustomQuestionResponse[] => {
    if (typeof window === "undefined") return clone(MOCK_CUSTOM_QUESTIONS);
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(MOCK_CUSTOM_QUESTIONS),
        );
        return clone(MOCK_CUSTOM_QUESTIONS);
    }
    try {
        return (JSON.parse(raw) as Partial<CustomQuestionResponse>[]).map(
            normalize,
        );
    } catch {
        return clone(MOCK_CUSTOM_QUESTIONS);
    }
};

export const storeListTopicOptions = (): TopicOption[] =>
    clone(MOCK_TOPIC_OPTIONS);

const writeAll = (list: CustomQuestionResponse[]) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
};

export interface CustomQuestionFilterParams {
    search?: string;
    status?: ModerationStatus | "all";
}

/** Lọc theo người gửi/nội dung + trạng thái, mới gửi xếp trước. */
export const storeListCustomQuestions = (
    params: CustomQuestionFilterParams = {},
): CustomQuestionResponse[] => {
    const search = (params.search ?? "").trim().toLowerCase();
    const status = params.status ?? "all";

    return readAll()
        .filter((q) => (status === "all" ? true : q.status === status))
        .filter((q) => {
            if (!search) return true;
            return (
                q.submitterName.toLowerCase().includes(search) ||
                q.submitterEmail.toLowerCase().includes(search) ||
                q.japaneseQuestion.toLowerCase().includes(search) ||
                q.japaneseQuestionMarkup.toLowerCase().includes(search)
            );
        })
        .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
};

export const storeCountPending = (): number =>
    readAll().filter((q) => q.status === "PENDING").length;

export const storeGetCustomQuestion = (
    id: string,
): CustomQuestionResponse | null =>
    readAll().find((q) => q.id === id) ?? null;

const applyEdits = (
    item: CustomQuestionResponse,
    edits: SaveCustomQuestionRequest,
): CustomQuestionResponse => ({
    ...item,
    japaneseQuestion: edits.japaneseQuestion,
    japaneseQuestionMarkup: edits.japaneseQuestionMarkup,
    contextualHint: edits.contextualHint,
    topicId: edits.topicId,
    vocabularies: edits.vocabularies,
    grammars: edits.grammars,
});

export const storeSaveCustomQuestion = (
    request: SaveCustomQuestionRequest,
): CustomQuestionResponse => {
    const list = readAll();
    let saved: CustomQuestionResponse | null = null;
    const next = list.map((q) => {
        if (q.id !== request.id) return q;
        saved = applyEdits(q, request);
        return saved;
    });
    if (!saved) throw new Error("Không tìm thấy câu hỏi cần lưu");
    writeAll(next);
    return saved;
};

export const storeModerateCustomQuestion = (
    request: ModerateCustomQuestionRequest,
    reviewedAt: string,
): CustomQuestionResponse => {
    const list = readAll();
    let saved: CustomQuestionResponse | null = null;
    const next = list.map((q) => {
        if (q.id !== request.id) return q;
        saved = {
            ...applyEdits(q, request),
            status: request.status,
            rejectionCategory:
                request.status === "REJECTED"
                    ? (request.rejectionCategory ?? "")
                    : "",
            rejectionReason:
                request.status === "REJECTED"
                    ? (request.rejectionReason ?? "")
                    : "",
            reviewedAt,
        };
        return saved;
    });
    if (!saved) throw new Error("Không tìm thấy câu hỏi cần kiểm duyệt");
    writeAll(next);
    return saved;
};
