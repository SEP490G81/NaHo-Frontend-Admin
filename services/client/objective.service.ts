import { BaseResponse } from "@/types/responses/base.response";
import { ObjectiveResponse, ObjectiveDetailResponse } from "@/types/responses/objective.response";
import { UpdateObjectiveRequest } from "@/types/requests/objective.request";

export const findObjectiveDetail = async (id: number): Promise<BaseResponse<ObjectiveDetailResponse>> => {
    const res = await fetch(`/api/objectives/${id}`);
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const updateObjective = async (
    id: number,
    request: UpdateObjectiveRequest
): Promise<BaseResponse<ObjectiveResponse>> => {
    const res = await fetch(`/api/objectives/${id}`, {
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
