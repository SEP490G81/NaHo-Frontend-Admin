import { apiClient } from "@/libs/apiClient";
import { PersonaStatus } from "@/types/enums/persona.enum";
import { ApiResponse } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";

export async function fetchPersonasClient(): Promise<
    ApiResponse<PersonaResponse[]>
> {
    return apiClient.get<ApiResponse<PersonaResponse[]>>("/api/personas");
}

export async function createPersonaClient(
    body: CreatePersonaRequest,
): Promise<ApiResponse<PersonaResponse>> {
    return apiClient.post<ApiResponse<PersonaResponse>>("/api/personas", body);
}

export async function updatePersonaClient(
    personaId: number,
    body: UpdatePersonaRequest,
): Promise<ApiResponse<PersonaResponse>> {
    return apiClient.put<ApiResponse<PersonaResponse>>(
        `/api/personas/${personaId}`,
        body,
    );
}

/**
 * Đảo trạng thái nhân vật (ACTIVE <-> UNACTIVE).
 */
export async function togglePersonaStatusClient(
    personaId: number,
): Promise<PersonaStatus> {
    const result = await apiClient.patch<ApiResponse<PersonaStatus> | PersonaStatus>(
        `/api/personas/${personaId}/status`,
    );
    if (result && typeof result === "object" && "data" in result && result.data) {
        return result.data;
    }
    return result as PersonaStatus;
}
