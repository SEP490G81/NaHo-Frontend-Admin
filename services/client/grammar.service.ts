import { apiClient } from "@/libs/apiClient";
import { BaseResponse } from "@/types/responses/base.response";
import { GrammarResponse } from "@/types/responses/vocabulary.response";
import {
    CreateGrammarRequest,
    UpdateGrammarRequest,
} from "@/types/requests/grammar.request";

export const searchGrammars = async (
    keyword: string,
    page: number = 0,
    size: number = 10,
): Promise<BaseResponse<GrammarResponse[]>> => {
    const queryParams = new URLSearchParams({
        keyword,
        page: page.toString(),
        size: size.toString(),
    });
    return apiClient.get<BaseResponse<GrammarResponse[]>>(
        `/api/admin/grammars?${queryParams.toString()}`,
    );
};

export const getGrammarDetail = async (
    id: number,
): Promise<GrammarResponse> => {
    return apiClient.get<GrammarResponse>(`/api/admin/grammars/${id}`);
};

export const createGrammar = async (
    request: CreateGrammarRequest,
): Promise<GrammarResponse> => {
    return apiClient.post<GrammarResponse>(`/api/admin/grammars`, request);
};

export const updateGrammar = async (
    id: number,
    request: UpdateGrammarRequest,
): Promise<GrammarResponse> => {
    return apiClient.put<GrammarResponse>(
        `/api/admin/grammars/${id}`,
        request,
    );
};

export const deleteGrammar = async (id: number): Promise<void> => {
    await apiClient.delete<void>(`/api/admin/grammars/${id}`);
};
