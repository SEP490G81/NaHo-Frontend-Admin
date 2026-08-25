import { apiClient } from "@/libs/apiClient";
import { BaseResponse } from "@/types/responses/base.response";
import {
    TopicResponse,
    TopicDetailResponse,
} from "@/types/responses/topic.response";
import { UpdateTopicRequest } from "@/types/requests/topic.request";

export const findTopicsByBookId = async (
    bookId: number,
): Promise<BaseResponse<TopicResponse[]>> => {
    return apiClient.get<BaseResponse<TopicResponse[]>>(
        `/api/topics/books/${bookId}`,
    );
};

export const findTopicDetail = async (
    id: number,
): Promise<BaseResponse<TopicDetailResponse>> => {
    return apiClient.get<BaseResponse<TopicDetailResponse>>(`/api/topics/${id}`);
};

export const updateTopic = async (
    id: number,
    request: UpdateTopicRequest,
): Promise<BaseResponse<TopicResponse>> => {
    return apiClient.put<BaseResponse<TopicResponse>>(
        `/api/topics/${id}`,
        request,
    );
};
