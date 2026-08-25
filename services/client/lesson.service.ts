import { apiClient } from "@/libs/apiClient";
import { BaseResponse } from "@/types/responses/base.response";
import {
    LessonResponse,
    LessonDetailResponse,
} from "@/types/responses/lesson.response";
import { UpdateLessonRequest } from "@/types/requests/lesson.request";

export const findLessonDetail = async (
    id: number,
): Promise<BaseResponse<LessonDetailResponse>> => {
    return apiClient.get<BaseResponse<LessonDetailResponse>>(
        `/api/lessons/${id}`,
    );
};

export const updateLesson = async (
    id: number,
    request: UpdateLessonRequest,
): Promise<BaseResponse<LessonResponse>> => {
    return apiClient.put<BaseResponse<LessonResponse>>(
        `/api/lessons/${id}`,
        request,
    );
};
