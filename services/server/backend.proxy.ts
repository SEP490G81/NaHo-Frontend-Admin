import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";
import { ProblemDetail } from "@/types/responses/base.response";

/**
 * Trích xuất token từ mảng Set-Cookie headers
 */
function extractTokenFromCookies(
    setCookieHeaders: string[],
    cookieName: string,
): string | undefined {
    for (const header of setCookieHeaders) {
        const match = header.match(
            new RegExp(`(?:^|;\\s*)${cookieName}=([^;]+)`),
        );
        if (match) {
            return match[1];
        }
    }
    return undefined;
}

/**
 * Chuyển tiếp response của BE thành JSON, giữ nguyên status. Nếu BE trả về
 * non-JSON (vd trang lỗi 500 "Whitelabel Error Page" của Spring là HTML), bọc
 * lại thành { detail } thay vì để route handler crash.
 * Đồng thời đính kèm Set-Cookie mới nếu có (sau khi rotate token).
 */
async function forwardJson(
    backendResponse: Response,
    additionalCookies?: string[],
) {
    let nextResponse: NextResponse;
    if (backendResponse.status === 204) {
        nextResponse = new NextResponse(null, { status: 204 });
    } else {
        const text = await backendResponse.text();
        let body: unknown = null;
        if (text) {
            try {
                body = JSON.parse(text);
            } catch {
                body = {
                    detail: `Máy chủ trả về phản hồi không hợp lệ (HTTP ${backendResponse.status}).`,
                    status: backendResponse.status,
                    raw: text.slice(0, 300),
                };
            }
        }
        nextResponse = NextResponse.json(body, {
            status: backendResponse.status,
        });
    }

    if (additionalCookies && additionalCookies.length > 0) {
        additionalCookies.forEach((cookie) => {
            nextResponse.headers.append("set-cookie", cookie);
        });
    }

    return nextResponse;
}

export interface BackendRequestConfig {
    path: string;
    method?: string;
    headers?: Record<string, string>;
    body?: BodyInit | null;
    search?: URLSearchParams;
}

/**
 * Hàm proxy trung tâm: gửi request tới Spring Boot backend.
 * Nếu nhận HTTP 401 và có refresh token trong cookie, tự động rotate token
 * và retry lại request ban đầu, đồng thời forward Set-Cookie mới về browser.
 */
export async function proxyBackendRequest(config: BackendRequestConfig) {
    if (!process.env.API_URL) {
        return NextResponse.json(
            {
                detail: "API_URL chưa được cấu hình trên server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    const url = new URL(`${process.env.API_URL}${config.path}`);
    config.search?.forEach((value, key) => url.searchParams.set(key, value));

    const makeCall = async (token?: string) => {
        const reqHeaders: Record<string, string> = {
            ...(config.headers || {}),
        };
        if (token) {
            reqHeaders["Authorization"] = `Bearer ${token}`;
        }
        return fetch(url.toString(), {
            method: config.method || "GET",
            headers: reqHeaders,
            body: config.body,
            cache: "no-store",
        });
    };

    const backendResponse = await makeCall(accessToken);

    // Nếu gặp 401 và có refreshToken -> Thử rotate token trên server và retry
    if (backendResponse.status === 401 && refreshToken) {
        try {
            const rotationResponse = await fetch(
                `${process.env.API_URL}/auth/rotation`,
                {
                    method: "POST",
                    cache: "no-store",
                    headers: {
                        Cookie: `${REFRESH_TOKEN_NAME}=${refreshToken}`,
                    },
                },
            );

            if (rotationResponse.ok) {
                const setCookies = rotationResponse.headers.getSetCookie();
                const newAccessToken = extractTokenFromCookies(
                    setCookies,
                    ACCESS_TOKEN_NAME,
                );

                if (newAccessToken) {
                    const retriedResponse = await makeCall(newAccessToken);
                    return forwardJson(retriedResponse, setCookies);
                }
            }
        } catch (error) {
            console.error(
                "Server-side token rotation failed in backend proxy:",
                error,
            );
        }
    }

    return forwardJson(backendResponse);
}

/**
 * Helper cho route handler: gọi GET tới backend với tự động rotate token khi gặp 401.
 */
export async function proxyGet(path: string, search?: URLSearchParams) {
    return proxyBackendRequest({
        path,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        search,
    });
}

/**
 * Helper cho route handler: forward request multipart/form-data POST lên BE.
 */
export async function proxyPostForm(path: string, request: Request) {
    const form = await request.formData();
    return proxyBackendRequest({
        path,
        method: "POST",
        body: form,
    });
}

/**
 * Helper cho route handler: forward request multipart/form-data PATCH lên BE.
 */
export async function proxyPatchForm(path: string, request: Request) {
    const form = await request.formData();
    return proxyBackendRequest({
        path,
        method: "PATCH",
        body: form,
    });
}

/**
 * Helper cho route handler: forward request JSON POST lên BE.
 */
export async function proxyPostJson(path: string, request: Request) {
    const idempotencyKey = request.headers.get("Idempotency-Key");
    const body = await request.text();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    };

    return proxyBackendRequest({
        path,
        method: "POST",
        headers,
        body,
    });
}

/**
 * Helper cho route handler: forward request JSON PATCH lên BE.
 */
export async function proxyPatchJson(path: string, request?: Request) {
    const idempotencyKey = request?.headers.get("Idempotency-Key");
    let body: string | undefined = undefined;
    if (request) {
        try {
            const text = await request.text();
            if (text && text.trim().length > 0) {
                body = text;
            }
        } catch {
            // empty body
        }
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    };

    return proxyBackendRequest({
        path,
        method: "PATCH",
        headers,
        body,
    });
}

/**
 * Helper cho route handler: forward request JSON PUT lên BE.
 */
export async function proxyPutJson(path: string, request?: Request) {
    const idempotencyKey = request?.headers.get("Idempotency-Key");
    let body: string | undefined = undefined;
    if (request) {
        try {
            const text = await request.text();
            if (text && text.trim().length > 0) {
                body = text;
            }
        } catch {
            // empty body
        }
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    };

    return proxyBackendRequest({
        path,
        method: "PUT",
        headers,
        body,
    });
}

/**
 * Helper cho route handler: forward request DELETE lên BE.
 */
export async function proxyDelete(path: string) {
    return proxyBackendRequest({
        path,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
