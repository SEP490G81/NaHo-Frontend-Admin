import { apiClient } from "@/libs/apiClient";
import { BaseResponse } from "@/types/responses/base.response";
import { VocabularyResponse } from "@/types/responses/vocabulary.response";
import {
    CreateVocabularyRequest,
    UpdateVocabularyRequest,
} from "@/types/requests/vocabulary.request";

export const searchVocabularies = async (
    keyword: string,
    page: number = 0,
    size: number = 10,
): Promise<BaseResponse<VocabularyResponse[]>> => {
    const queryParams = new URLSearchParams({
        keyword,
        page: page.toString(),
        size: size.toString(),
    });
    return apiClient.get<BaseResponse<VocabularyResponse[]>>(
        `/api/admin/vocabularies?${queryParams.toString()}`,
    );
};

export const getVocabularyDetail = async (
    id: number,
): Promise<VocabularyResponse> => {
    return apiClient.get<VocabularyResponse>(`/api/admin/vocabularies/${id}`);
};

export const createVocabulary = async (
    request: CreateVocabularyRequest,
): Promise<VocabularyResponse> => {
    return apiClient.post<VocabularyResponse>(
        `/api/admin/vocabularies`,
        request,
    );
};

export const updateVocabulary = async (
    id: number,
    request: UpdateVocabularyRequest,
): Promise<VocabularyResponse> => {
    return apiClient.put<VocabularyResponse>(
        `/api/admin/vocabularies/${id}`,
        request,
    );
};

export const deleteVocabulary = async (id: number): Promise<void> => {
    await apiClient.delete<void>(`/api/admin/vocabularies/${id}`);
};
