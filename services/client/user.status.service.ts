import { apiClient } from "@/libs/apiClient";
import { UserStatus } from "@/types/enums/user.enum";
import { ApiResponse } from "@/types/responses/base.response";

/**
 * Client-side: gọi API route proxy /api/users/{userId}/status để thay đổi trạng thái user.
 */
export async function changeUserStatusClient(
    userId: string | number,
): Promise<UserStatus> {
    const result = await apiClient.patch<ApiResponse<UserStatus> | UserStatus>(
        `/api/users/${userId}/status`,
    );

    if (result && typeof result === "object" && "data" in result && result.data) {
        return result.data;
    }
    return result as UserStatus;
}
