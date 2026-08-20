import { BaseResponse } from "@/types/responses/base.response";
import { LessonResponse } from "@/types/responses/lesson.response";
import { UpdateLessonRequest } from "@/types/requests/lesson.request";

export const updateLesson = async (
    id: number,
    request: UpdateLessonRequest
): Promise<BaseResponse<LessonResponse>> => {
    const res = await fetch(`/api/lessons/${id}`, {
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
