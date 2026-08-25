import { apiClient } from "@/libs/apiClient";
import {
    ChangePasswordRequest,
    CredentialsLoginRequest,
    ForgotPasswordRequest,
    RegisterRequest,
    ResendOtpRequest,
    ResetPasswordRequest,
    UpdateUserInfoRequest,
    VerifyEmailRequest,
    VerifyForgotPasswordOtpRequest,
} from "@/types/requests/user.request";
import { UserQueryRequest } from "@/types/requests/user.query.request";
import { ApiResponse } from "@/types/responses/base.response";
import {
    ResetPasswordTokenResponse,
    UserResponse,
} from "@/types/responses/user.response";

export async function credentialsLogin(
    request: CredentialsLoginRequest,
): Promise<void> {
    await apiClient.post<void>("/api/auth/login", request);
}

export async function register(request: RegisterRequest): Promise<void> {
    await apiClient.post<void>("/api/auth/register", request);
}

export async function verifyEmail(request: VerifyEmailRequest): Promise<void> {
    await apiClient.post<void>("/api/auth/verify-email", request);
}

export async function resendOtp(request: ResendOtpRequest): Promise<void> {
    await apiClient.post<void>("/api/auth/resend-otp", request);
}

export async function forgotPassword(
    request: ForgotPasswordRequest,
): Promise<void> {
    await apiClient.post<void>("/api/auth/forgot-password", request);
}

export async function verifyForgotPasswordOtp(
    request: VerifyForgotPasswordOtpRequest,
): Promise<ResetPasswordTokenResponse> {
    return apiClient.post<ResetPasswordTokenResponse>(
        "/api/auth/forgot-password-otp",
        request,
    );
}

export async function resetPassword(
    request: ResetPasswordRequest,
): Promise<void> {
    await apiClient.post<void>("/api/auth/reset-password", request);
}

export async function logout(): Promise<void> {
    try {
        await apiClient.post<void>("/api/auth/logout");
    } catch (error) {
        console.error("Logout error:", error);
    }
}

export async function logoutAll(): Promise<void> {
    await apiClient.post<void>("/api/auth/logout-all");
}

export async function getCurrentUserClient(): Promise<UserResponse | null> {
    try {
        const result = await apiClient.get<
            ApiResponse<UserResponse> | UserResponse
        >("/api/auth/me");
        if (!result) return null;
        if ("data" in result && result.data) {
            return result.data;
        }
        return result as UserResponse;
    } catch {
        return null;
    }
}

export async function rotateToken(): Promise<void> {
    await apiClient.post<void>("/api/auth/rotation");
}

export async function updateUserInfoClient(
    request: UpdateUserInfoRequest,
): Promise<UserResponse> {
    const result = await apiClient.patch<
        ApiResponse<UserResponse> | UserResponse
    >("/api/users/info", request);
    if (result && "data" in result && result.data) {
        return result.data;
    }
    return result as UserResponse;
}

export async function uploadUserAvatarClient(
    file: File,
): Promise<UserResponse> {
    const formData = new FormData();
    formData.append("avatar", file);

    const result = await apiClient.upload<
        ApiResponse<UserResponse> | UserResponse
    >("/api/users/avatar", formData, {
        method: "PATCH",
    });
    if (result && "data" in result && result.data) {
        return result.data;
    }
    return result as UserResponse;
}

export async function changePassword(
    request: ChangePasswordRequest,
): Promise<void> {
    await apiClient.post<void>("/api/auth/change-password", request);
}

export async function fetchUserByIdClient(
    userId: number | string,
): Promise<UserResponse | null> {
    try {
        const result = await apiClient.get<
            ApiResponse<UserResponse> | UserResponse
        >(`/api/users/${userId}`);
        if (!result) return null;
        if ("data" in result && result.data) {
            return result.data;
        }
        return result as UserResponse;
    } catch {
        return null;
    }
}

export async function fetchAllUsersClient(
    request: UserQueryRequest,
): Promise<ApiResponse<UserResponse[]>> {
    return apiClient.post<ApiResponse<UserResponse[]>>(
        "/api/users/all",
        request,
    );
}
