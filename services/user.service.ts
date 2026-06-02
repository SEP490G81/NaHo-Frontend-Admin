import { ApiResponse } from "@/types/responses/base.response";
import { LevelResponse } from "@/types/responses/level.response";
import { RoleResponse } from "@/types/responses/role.response";
import {
    UserDetailResponse,
    UserResponse,
} from "@/types/responses/user.response";
import { UpdateUserStatusRequest } from "@/types/requests/user.request";

export async function fetchUsers(
    params: URLSearchParams,
): Promise<ApiResponse<UserResponse[]>> {
    const response = await fetch(`/api/users?${params.toString()}`);
    const result: ApiResponse<UserResponse[]> = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}

export async function fetchUserDetail(
    userId: number,
): Promise<ApiResponse<UserDetailResponse>> {
    const response = await fetch(`/api/users/${userId}`);
    const result: ApiResponse<UserDetailResponse> = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}

export async function updateUserStatus(
    userId: number,
    request: UpdateUserStatusRequest,
): Promise<ApiResponse<null>> {
    const response = await fetch(`/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    const result: ApiResponse<null> = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}

export async function fetchRoles(): Promise<ApiResponse<RoleResponse[]>> {
    const response = await fetch("/api/roles");
    const result: ApiResponse<RoleResponse[]> = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}

export async function fetchLevels(): Promise<ApiResponse<LevelResponse[]>> {
    const response = await fetch("/api/levels");
    const result: ApiResponse<LevelResponse[]> = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }
    return result;
}
