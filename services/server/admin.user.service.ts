import { ApiResponse } from "@/types/responses/base.response";
import { UserResponse } from "@/types/responses/user.response";
import { UserQueryRequest } from "@/types/requests/user.query.request";
import { serverFetch } from "@/services/server/server.fetch";

/**
 * Server-side: gọi trực tiếp backend thật để lấy danh sách user (admin).
 * Dùng trong Server Component để prefetch data.
 */
export async function fetchAllUsers(
    request: UserQueryRequest,
): Promise<ApiResponse<UserResponse[]>> {
    try {
        const backendResponse = await serverFetch("/users/all", {
            method: "POST",
            body: JSON.stringify(request),
        });

        if (!backendResponse.ok) {
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

        return (await backendResponse.json()) as ApiResponse<UserResponse[]>;
    } catch {
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
}
