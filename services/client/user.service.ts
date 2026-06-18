import { UpdateUserStatusRequest } from "@/types/requests/user.request";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { RoleResponse } from "@/types/responses/role.response";
import { UserResponse } from "@/types/responses/user.response";

export async function fetchUsers(params: URLSearchParams): Promise<UserResponse[]> {
    const response = await fetch(`/api/users?${params.toString()}`);
    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }

    return (result as ApiResponse<UserResponse[]>).data;
}

export async function fetchUserDetail(userId: number): Promise<UserResponse> {
    const response = await fetch(`/api/users/${userId}`);
    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }

    return (result as ApiResponse<UserResponse>).data;
}

export async function updateUserStatus(
    userId: number,
    request: UpdateUserStatusRequest,
): Promise<UserResponse> {
    const response = await fetch(`/api/users/${userId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }

    return (result as ApiResponse<UserResponse>).data;
}

export async function fetchRoles(): Promise<RoleResponse[]> {
    const response = await fetch("/api/roles");
    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail.detail);
    }

    return (result as ApiResponse<RoleResponse[]>).data;
}
