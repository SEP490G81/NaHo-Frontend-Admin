import { BaseResponse } from "@/types/responses/base.response";
import { TopicResponse } from "@/types/responses/topic.response";
import { UpdateTopicRequest } from "@/types/requests/topic.request";

export const findTopicsByBookId = async (bookId: number): Promise<BaseResponse<TopicResponse[]>> => {
    const res = await fetch(`/api/topics/books/${bookId}`);
    if (!res.ok) {
        throw await res.json();
    }
    return res.json();
};

export const updateTopic = async (
    id: number,
    request: UpdateTopicRequest
): Promise<BaseResponse<TopicResponse>> => {
    const res = await fetch(`/api/topics/${id}`, {
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
