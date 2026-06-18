import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import { TopicOption } from "@/types/responses/topic.option.response";
import {
    ModerateCustomQuestionRequest,
    SaveCustomQuestionRequest,
} from "@/types/requests/custom.question.request";
import {
    CustomQuestionFilterParams,
    storeCountPending,
    storeGetCustomQuestion,
    storeListCustomQuestions,
    storeListTopicOptions,
    storeModerateCustomQuestion,
    storeSaveCustomQuestion,
} from "@/services/client/custom.question.mock.store";

/**
 * MOCK (client-side, localStorage). Hàng đợi kiểm duyệt prompt chưa có endpoint
 * BE thật nên các hàm này gọi thẳng mock store và trả về data đã unwrap (cùng
 * kiểu trả như user.service). TODO khi BE sẵn sàng: tạo route proxy
 * `app/api/custom-questions/*` và đổi thân hàm sang `fetch` + đọc `ApiResponse`.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCustomQuestions(
    params: CustomQuestionFilterParams,
): Promise<CustomQuestionResponse[]> {
    return storeListCustomQuestions(params);
}

export async function fetchPendingCount(): Promise<number> {
    return storeCountPending();
}

export async function fetchTopicOptions(): Promise<TopicOption[]> {
    return storeListTopicOptions();
}

export async function fetchCustomQuestionDetail(
    id: string,
): Promise<CustomQuestionResponse> {
    const found = storeGetCustomQuestion(id);
    if (!found) throw new Error("Không tìm thấy câu hỏi");
    return found;
}

export async function saveCustomQuestion(
    request: SaveCustomQuestionRequest,
): Promise<CustomQuestionResponse> {
    await delay(300);
    return storeSaveCustomQuestion(request);
}

export async function moderateCustomQuestion(
    request: ModerateCustomQuestionRequest,
): Promise<CustomQuestionResponse> {
    await delay(300);
    return storeModerateCustomQuestion(request, new Date().toISOString());
}
