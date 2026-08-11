import { ApiError } from "@/libs/api.error";
import { UserStatus } from "@/types/enums/user.enum";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";

/**
 * Client-side: gọi API route proxy /api/users/{userId}/status để thay đổi trạng thái user.
 */
export async function changeUserStatusClient(
    userId: string | number,
): Promise<UserStatus> {
    const response = await fetch(`/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new ApiError(problemDetail);
    }

    const apiResponse = result as ApiResponse<UserStatus>;
    return apiResponse.data || (result as UserStatus);
}
