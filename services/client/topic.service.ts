import { ApiResponse } from "@/types/responses/base.response";
import {
    TokenizeResponse,
    TopicDetailResponse,
    TopicResponse,
} from "@/types/responses/topic.response";
import {
    CreateTopicRequest,
    SaveQuestionRequest,
    UpdateTopicRequest,
} from "@/types/requests/topic.request";
import {
    storeCreateTopic,
    storeDeleteQuestion,
    storeDeleteTopic,
    storeGetTopic,
    storeListTopics,
    storeReorder,
    storeReorderQuestions,
    storeSaveQuestion,
    storeTokenize,
    storeUpdateTopic,
} from "@/services/client/topic.mock.store";

// MOCK: dữ liệu lưu ở localStorage. TODO: thay phần ruột bằng fetch API khi BE sẵn sàng.
const buildMeta = (totalElements: number) => ({
    traceId: "mock-local",
    timestamp: new Date().toISOString(),
    pageMeta: { currentPage: 1, pageSize: 12, totalPages: 1, totalElements },
});

const ok = <T>(data: T, total = 0): ApiResponse<T> => ({
    meta: buildMeta(total),
    message: "OK (mock-local)",
    data,
});

export async function fetchTopics(
    params: URLSearchParams,
): Promise<ApiResponse<TopicResponse[]>> {
    const data = storeListTopics(
        params.get("search") ?? undefined,
        params.get("level") ?? undefined,
        params.get("status") ?? undefined,
    );
    return ok(data, data.length);
}

export async function fetchTopicDetail(
    topicId: string,
): Promise<ApiResponse<TopicDetailResponse>> {
    const topic = storeGetTopic(topicId);
    if (!topic) throw new Error("Topic not found");
    return ok(topic);
}

export async function createTopic(
    request: CreateTopicRequest,
): Promise<ApiResponse<TopicDetailResponse>> {
    return ok(storeCreateTopic(request));
}

export async function updateTopic(
    topicId: string,
    request: UpdateTopicRequest,
): Promise<ApiResponse<null>> {
    storeUpdateTopic(topicId, request);
    return ok(null);
}

export async function deleteTopic(
    topicId: string,
): Promise<ApiResponse<null>> {
    storeDeleteTopic(topicId);
    return ok(null);
}

export async function reorderTopics(
    orderedIds: string[],
): Promise<ApiResponse<null>> {
    storeReorder(orderedIds);
    return ok(null);
}

export async function saveQuestion(
    topicId: string,
    request: SaveQuestionRequest,
): Promise<ApiResponse<null>> {
    storeSaveQuestion(topicId, {
        id: request.id ?? `q-${Date.now()}`,
        jp: request.jp,
        furigana: request.furigana,
        vi: request.vi,
        audioUrl: request.audioUrl,
        vocab: request.vocab,
        sentences: request.sentences,
        contextHintJp: request.contextHintJp,
        contextHintVi: request.contextHintVi,
    });
    return ok(null);
}

export async function deleteQuestion(
    topicId: string,
    questionId: string,
): Promise<ApiResponse<null>> {
    storeDeleteQuestion(topicId, questionId);
    return ok(null);
}

export async function reorderQuestions(
    topicId: string,
    orderedIds: string[],
): Promise<ApiResponse<null>> {
    storeReorderQuestions(topicId, orderedIds);
    return ok(null);
}

export async function tokenizeJapanese(
    text: string,
): Promise<ApiResponse<TokenizeResponse>> {
    return ok(storeTokenize(text));
}
