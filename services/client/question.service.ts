import { apiClient } from "@/libs/apiClient";
import { BaseResponse } from "@/types/responses/base.response";
import {
    SpeakingQuestionResponse,
    VocabularyQuestionResponse,
} from "@/types/responses/question.response";
import {
    UpdateSpeakingQuestionRequest,
    UpdateVocabularyQuestionRequest,
} from "@/types/requests/question.request";

export const findSpeakingQuestionDetail = async (
    nodeId: number,
): Promise<BaseResponse<SpeakingQuestionResponse>> => {
    const nodeRes = await apiClient.get<
        BaseResponse<{ speakingQuestion?: SpeakingQuestionResponse }>
    >(`/api/learning-path-nodes/${nodeId}`);
    return {
        ...nodeRes,
        data: nodeRes.data?.speakingQuestion as SpeakingQuestionResponse,
    };
};

export const findSpeakingQuestionForAdmin = async (
    questionId: number,
): Promise<BaseResponse<SpeakingQuestionResponse>> => {
    return apiClient.get<BaseResponse<SpeakingQuestionResponse>>(
        `/api/speaking-questions/${questionId}`,
    );
};

export const updateSpeakingQuestion = async (
    id: number,
    request: UpdateSpeakingQuestionRequest,
): Promise<BaseResponse<SpeakingQuestionResponse>> => {
    return apiClient.put<BaseResponse<SpeakingQuestionResponse>>(
        `/api/speaking-questions/${id}`,
        request,
    );
};

export const findVocabularyQuestionDetail = async (
    nodeId: number,
): Promise<BaseResponse<VocabularyQuestionResponse>> => {
    const nodeRes = await apiClient.get<
        BaseResponse<{ vocabularyQuestion?: VocabularyQuestionResponse }>
    >(`/api/learning-path-nodes/${nodeId}`);
    return {
        ...nodeRes,
        data: nodeRes.data?.vocabularyQuestion as VocabularyQuestionResponse,
    };
};

export const updateVocabularyQuestion = async (
    id: number,
    request: UpdateVocabularyQuestionRequest,
): Promise<BaseResponse<VocabularyQuestionResponse>> => {
    return apiClient.put<BaseResponse<VocabularyQuestionResponse>>(
        `/api/vocabulary-questions/${id}`,
        request,
    );
};
