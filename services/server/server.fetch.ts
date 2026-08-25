import { cookies } from "next/headers";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

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

export interface ServerFetchOptions extends RequestInit {
    searchParams?: URLSearchParams;
}

/**
 * Helper cho Server Components: gọi trực tiếp Spring Boot backend.
 * Tự động đọc access token từ cookies và thực hiện rotate token nếu gặp 401.
 */
export async function serverFetch(
    path: string,
    options: ServerFetchOptions = {},
): Promise<Response> {
    if (!process.env.API_URL) {
        throw new Error("API_URL chưa được cấu hình trên server.");
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    const url = new URL(`${process.env.API_URL}${path}`);
    options.searchParams?.forEach((value, key) =>
        url.searchParams.set(key, value),
    );

    const makeCall = async (token?: string) => {
        const headers = new Headers(options.headers);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }

        return fetch(url.toString(), {
            ...options,
            headers,
            cache: options.cache || "no-store",
        });
    };

    let response = await makeCall(accessToken);

    // Nếu gặp 401 và có refreshToken -> Thử rotate token in-memory và retry
    if (response.status === 401 && refreshToken) {
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
                    response = await makeCall(newAccessToken);
                }
            }
        } catch (error) {
            console.error(
                "Server-side token rotation error in serverFetch:",
                error,
            );
        }
    }

    return response;
}
