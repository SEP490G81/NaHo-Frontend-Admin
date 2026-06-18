import { PersonaResponse } from "@/types/responses/persona.response";
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

/**
 * MOCK (client-side, localStorage). Persona chưa có endpoint BE thật nên các
 * hàm này gọi thẳng mock store và trả về data đã unwrap (cùng kiểu trả như
 * user.service). TODO khi BE sẵn sàng: tạo route proxy `app/api/personas/*`
 * (như user-management) và đổi thân hàm sang `fetch` + đọc `ApiResponse`.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPersonas(): Promise<PersonaResponse[]> {
    return storeListPersonas();
}

export async function createPersona(
    request: CreatePersonaRequest,
): Promise<PersonaResponse> {
    return storeCreatePersona(request);
}

export async function updatePersona(
    request: UpdatePersonaRequest,
): Promise<PersonaResponse> {
    return storeUpdatePersona(request);
}

export async function deletePersona(id: string): Promise<void> {
    storeDeletePersona(id);
}

export async function previewVoice(voice: string): Promise<void> {
    // MOCK: giả lập độ trễ tổng hợp giọng nói Azure TTS.
    await delay(600);
    if (!voice) throw new Error("Giọng đọc không hợp lệ");
}
