import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { ApiResponse } from "@/types/responses/base.response";
import { AdminUserResponse } from "@/types/responses/user.response";
import { UserQueryRequest } from "@/types/requests/user.query.request";

/**
 * Server-side: gọi trực tiếp backend thật để lấy danh sách user (admin).
 * Dùng trong Server Component để prefetch data.
 */
export async function fetchAllUsers(
    request: UserQueryRequest,
): Promise<ApiResponse<AdminUserResponse[]>> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    const backendResponse = await fetch(`${process.env.API_URL}/users/all`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(request),
        cache: "no-store",
    });

    if (!backendResponse.ok) {
        // Return empty fallback to avoid crash; the UI will show empty state.
        return {
            meta: {
                traceId: "",
                timestamp: new Date().toISOString(),
                pageMeta: {
                    currentPage: 0,
                    pageSize: 20,
                    totalPages: 0,
                    totalElements: 0,
                    hasNext: false,
                    hasPrevious: false,
                },
            },
            message: "",
            data: [],
        };
    }

    return (await backendResponse.json()) as ApiResponse<AdminUserResponse[]>;
}
