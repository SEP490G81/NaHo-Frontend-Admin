import { apiClient } from "@/libs/apiClient";
import { ApiResponse } from "@/types/responses/base.response";
import { UserLearningProgressResponse } from "@/types/responses/user.response";

/**
 * Client-side: gọi API route proxy /api/user-learning-progresses/{userId}
 * để lấy tiến trình học tập của user.
 */
export async function getUserLearningProgressClient(
    userId: string | number,
): Promise<UserLearningProgressResponse> {
    const apiResponse = await apiClient.get<
        ApiResponse<UserLearningProgressResponse>
    >(`/api/user-learning-progresses/${userId}`);
    return apiResponse.data;
}
