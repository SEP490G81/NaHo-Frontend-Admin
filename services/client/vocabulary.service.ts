import { BaseResponse } from "@/types/responses/base.response";
import { VocabularyResponse } from "@/types/responses/vocabulary.response";
import { CreateVocabularyRequest, UpdateVocabularyRequest } from "@/types/requests/vocabulary.request";

export const searchVocabularies = async (
    keyword: string,
    page: number = 0,
    size: number = 10
): Promise<BaseResponse<VocabularyResponse[]>> => {
    const queryParams = new URLSearchParams({
        keyword,
        page: page.toString(),
        size: size.toString(),
    });
    const res = await fetch(`/api/admin/vocabularies?${queryParams.toString()}`);
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const getVocabularyDetail = async (id: number): Promise<VocabularyResponse> => {
    const res = await fetch(`/api/admin/vocabularies/${id}`);
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const createVocabulary = async (request: CreateVocabularyRequest): Promise<VocabularyResponse> => {
    const res = await fetch(`/api/admin/vocabularies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const updateVocabulary = async (id: number, request: UpdateVocabularyRequest): Promise<VocabularyResponse> => {
    const res = await fetch(`/api/admin/vocabularies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const deleteVocabulary = async (id: number): Promise<void> => {
    const res = await fetch(`/api/admin/vocabularies/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw await res.json();
    }
};
