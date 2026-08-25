import { apiClient } from "@/libs/apiClient";
import { BaseResponse } from "@/types/responses/base.response";
import {
    ObjectiveResponse,
    ObjectiveDetailResponse,
} from "@/types/responses/objective.response";
import { UpdateObjectiveRequest } from "@/types/requests/objective.request";

export const findObjectiveDetail = async (
    id: number,
): Promise<BaseResponse<ObjectiveDetailResponse>> => {
    return apiClient.get<BaseResponse<ObjectiveDetailResponse>>(
        `/api/objectives/${id}`,
    );
};

export const updateObjective = async (
    id: number,
    request: UpdateObjectiveRequest,
): Promise<BaseResponse<ObjectiveResponse>> => {
    return apiClient.put<BaseResponse<ObjectiveResponse>>(
        `/api/objectives/${id}`,
        request,
    );
};
