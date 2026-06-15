import { ApiResponse } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    MOCK_TOPIC_OPTIONS,
    TopicOption,
} from "@/app/api/_mock/topic.options.data";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";
import {
    storeCreatePersona,
    storeDeletePersona,
    storeListPersonas,
    storeUpdatePersona,
} from "@/services/client/persona.mock.store";

// MOCK: dữ liệu lưu ở localStorage. TODO: thay phần ruột bằng fetch API khi BE sẵn sàng.
const buildMeta = (totalElements: number) => ({
    traceId: "mock-local",
    timestamp: new Date().toISOString(),
    pageMeta: { currentPage: 1, pageSize: 20, totalPages: 1, totalElements },
});

const ok = <T>(data: T, total = 0): ApiResponse<T> => ({
    meta: buildMeta(total),
    message: "OK (mock-local)",
    data,
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPersonas(): Promise<ApiResponse<PersonaResponse[]>> {
    const data = storeListPersonas();
    return ok(data, data.length);
}

export async function createPersona(
    request: CreatePersonaRequest,
): Promise<ApiResponse<PersonaResponse>> {
    return ok(storeCreatePersona(request));
}

export async function updatePersona(
    request: UpdatePersonaRequest,
): Promise<ApiResponse<PersonaResponse>> {
    return ok(storeUpdatePersona(request));
}

export async function deletePersona(
    id: string,
): Promise<ApiResponse<null>> {
    storeDeletePersona(id);
    return ok(null);
}

export async function fetchTopicOptions(): Promise<
    ApiResponse<TopicOption[]>
> {
    // MOCK: danh sách topic tĩnh. TODO: gọi API Topic management thật.
    return ok(MOCK_TOPIC_OPTIONS, MOCK_TOPIC_OPTIONS.length);
}

export async function previewVoice(
    voice: string,
): Promise<ApiResponse<null>> {
    // MOCK: giả lập độ trễ tổng hợp giọng nói Azure TTS. TODO: gọi endpoint phát thử thật.
    await delay(600);
    if (!voice) throw new Error("Giọng đọc không hợp lệ");
    return ok(null);
}
