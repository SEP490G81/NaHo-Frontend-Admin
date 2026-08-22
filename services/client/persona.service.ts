import { PersonaStatus } from "@/types/enums/persona.enum";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";
import { ApiError } from "@/libs/api.error";

export async function fetchPersonasClient(): Promise<
    ApiResponse<PersonaResponse[]>
> {
    const response = await fetch("/api/personas", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<PersonaResponse[]>;
}

export async function createPersonaClient(
    body: CreatePersonaRequest,
): Promise<ApiResponse<PersonaResponse>> {
    const response = await fetch("/api/personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<PersonaResponse>;
}

export async function updatePersonaClient(
    personaId: number,
    body: UpdatePersonaRequest,
): Promise<ApiResponse<PersonaResponse>> {
    const response = await fetch(`/api/personas/${personaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    return result as ApiResponse<PersonaResponse>;
}

/**
 * Đảo trạng thái nhân vật (ACTIVE <-> UNACTIVE). BE không nhận body, chỉ cần id
 * và tự tính trạng thái mới rồi trả về.
 */
export async function togglePersonaStatusClient(
    personaId: number,
): Promise<PersonaStatus> {
    const response = await fetch(`/api/personas/${personaId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new ApiError(result as ProblemDetail);
    }

    const apiResponse = result as ApiResponse<PersonaStatus>;
    return apiResponse.data || (result as PersonaStatus);
}
