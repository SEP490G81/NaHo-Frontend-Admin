import { ApiError } from "@/libs/api.error";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { UserLearningProgressResponse } from "@/types/responses/user.response";

/**
 * Client-side: gọi API route proxy /api/user-learning-progresses/{userId}
 * để lấy tiến trình học tập của user.
 */
export async function getUserLearningProgressClient(
    userId: string | number,
): Promise<UserLearningProgressResponse> {
    const response = await fetch(`/api/user-learning-progresses/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        const error = new ApiError(problemDetail) as Error & { status: number };
        // Attach status for special client handling (e.g. 404 Not Found)
        error.status = response.status;
        throw error;
    }

    const apiResponse = result as ApiResponse<UserLearningProgressResponse>;
    return apiResponse.data;
}
