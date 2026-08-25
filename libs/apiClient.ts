import { ApiError } from "@/libs/api.error";
import { ProblemDetail } from "@/types/responses/base.response";

interface RequestOptions extends RequestInit {
    _retry?: boolean;
}

// Danh sách các API không thực hiện rotate token khi gặp 401
const AUTH_IGNORE_PATHS = [
    "/api/auth/login",
    "/api/auth/rotation",
    "/api/auth/register",
    "/api/auth/forgot-password",
    "/api/auth/forgot-password-otp",
    "/api/auth/reset-password",
    "/api/auth/verify-email",
    "/api/auth/resend-otp",
    "/api/auth/logout",
    "/api/auth/logout-all",
];

// Singleton promise quản lý tiến trình refresh token (tránh gọi nhiều lần cùng lúc khi có nhiều request 401)
let refreshPromise: Promise<void> | null = null;

async function executeRotateToken(): Promise<void> {
    const response = await fetch("/api/auth/rotation", {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        let problemDetail: ProblemDetail;
        try {
            problemDetail = await response.json();
        } catch {
            problemDetail = {
                title: "Unauthorized",
                status: 401,
                detail: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
                errorCode: "TOKEN_EXPIRED",
            };
        }
        throw new ApiError(problemDetail);
    }
}

async function requestTokenRotation(): Promise<void> {
    if (!refreshPromise) {
        refreshPromise = executeRotateToken().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

function handleSessionExpired() {
    if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (!pathname.includes("/login")) {
            window.location.href = "/login";
        }
    }
}

/**
 * Hàm gọi API chung cho toàn bộ ứng dụng Client
 */
export async function apiFetch<T>(
    path: string,
    options: RequestOptions = {},
): Promise<T> {
    const headers = new Headers(options.headers);

    // Chỉ tự động set Content-Type JSON nếu body không phải là FormData
    if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: options.credentials || "include",
    };

    let response: Response;
    try {
        response = await fetch(path, fetchOptions);
    } catch (networkError) {
        const errorDetail: ProblemDetail = {
            title: "Network Error",
            status: 0,
            detail:
                networkError instanceof Error
                    ? networkError.message
                    : "Lỗi kết nối mạng",
            errorCode: "NETWORK_ERROR",
        };
        throw new ApiError(errorDetail);
    }

    // Xử lý khi gặp mã lỗi 401 Unauthorized
    if (response.status === 401 && !options._retry) {
        const shouldIgnore = AUTH_IGNORE_PATHS.some((authPath) =>
            path.startsWith(authPath),
        );

        if (!shouldIgnore) {
            try {
                // Thực hiện rotate token (hoặc chờ request rotate đang chạy hoàn thành)
                await requestTokenRotation();

                // Retry lại request ban đầu với flag _retry = true để tránh lặp vô tận
                return await apiFetch<T>(path, {
                    ...options,
                    _retry: true,
                });
            } catch (rotateError) {
                handleSessionExpired();
                throw rotateError;
            }
        }
    }

    if (!response.ok) {
        let problemDetail: ProblemDetail;
        try {
            const errorData = await response.json();
            problemDetail = {
                title: errorData.title || "Request Error",
                status: errorData.status || response.status,
                detail:
                    errorData.detail ||
                    errorData.message ||
                    `HTTP error ${response.status}`,
                errorCode:
                    errorData.errorCode ||
                    errorData.code ||
                    "UNKNOWN_ERROR",
                fieldErrors: errorData.fieldErrors,
            };
        } catch {
            problemDetail = {
                title: "HTTP Error",
                status: response.status,
                detail: `Yêu cầu thất bại với mã trạng thái ${response.status}`,
                errorCode: "HTTP_ERROR",
            };
        }
        throw new ApiError(problemDetail);
    }

    // Response 204 No Content
    if (response.status === 204) {
        return undefined as unknown as T;
    }

    const text = await response.text();
    if (!text || text.trim() === "") {
        return undefined as unknown as T;
    }

    try {
        return JSON.parse(text) as T;
    } catch {
        return text as unknown as T;
    }
}

/**
 * apiClient cung cấp các method tiện ích: get, post, put, patch, delete, upload
 */
export const apiClient = {
    get<T>(url: string, options?: RequestOptions): Promise<T> {
        return apiFetch<T>(url, {
            ...options,
            method: "GET",
        });
    },

    post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return apiFetch<T>(url, {
            ...options,
            method: "POST",
            body:
                body instanceof FormData
                    ? body
                    : body !== undefined
                      ? JSON.stringify(body)
                      : undefined,
        });
    },

    put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return apiFetch<T>(url, {
            ...options,
            method: "PUT",
            body:
                body instanceof FormData
                    ? body
                    : body !== undefined
                      ? JSON.stringify(body)
                      : undefined,
        });
    },

    patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return apiFetch<T>(url, {
            ...options,
            method: "PATCH",
            body:
                body instanceof FormData
                    ? body
                    : body !== undefined
                      ? JSON.stringify(body)
                      : undefined,
        });
    },

    delete<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return apiFetch<T>(url, {
            ...options,
            method: "DELETE",
            body:
                body instanceof FormData
                    ? body
                    : body !== undefined
                      ? JSON.stringify(body)
                      : undefined,
        });
    },

    upload<T>(url: string, formData: FormData, options?: RequestOptions): Promise<T> {
        return apiFetch<T>(url, {
            ...options,
            method: options?.method || "POST",
            body: formData,
        });
    },
};
