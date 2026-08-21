import { BaseResponse } from "@/types/responses/base.response";
import { SpeakingQuestionResponse, VocabularyQuestionResponse } from "@/types/responses/question.response";
import { UpdateSpeakingQuestionRequest, UpdateVocabularyQuestionRequest } from "@/types/requests/question.request";

export const findSpeakingQuestionDetail = async (nodeId: number): Promise<BaseResponse<SpeakingQuestionResponse>> => {
    const res = await fetch(`/api/learning-path-nodes/${nodeId}`);
    if (!res.ok) {
        throw await res.json();
    }
    const nodeRes = await res.json();
    return {
        ...nodeRes,
        data: nodeRes.data?.speakingQuestion
    };
};

export const updateSpeakingQuestion = async (
    id: number,
    request: UpdateSpeakingQuestionRequest
): Promise<BaseResponse<SpeakingQuestionResponse>> => {
    const res = await fetch(`/api/speaking-questions/${id}`, {
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

export const findVocabularyQuestionDetail = async (nodeId: number): Promise<BaseResponse<VocabularyQuestionResponse>> => {
    const res = await fetch(`/api/learning-path-nodes/${nodeId}`);
    if (!res.ok) {
        throw await res.json();
    }
    const nodeRes = await res.json();
    return {
        ...nodeRes,
        data: nodeRes.data?.vocabularyQuestion
    };
};

export const updateVocabularyQuestion = async (
    id: number,
    request: UpdateVocabularyQuestionRequest
): Promise<BaseResponse<VocabularyQuestionResponse>> => {
    const res = await fetch(`/api/vocabulary-questions/${id}`, {
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
