"use client";

import React from "react";
import { Avatar, SxProps, Theme } from "@mui/material";
import { UserResponse } from "@/types/responses/user.response";

interface UserAvatarProps {
    user?: Partial<UserResponse> | null;
    avatarUrl?: string | null;
    authProviders?: { avatarUrl?: string | null }[] | null;
    fullName?: string | null;
    username?: string | null;
    email?: string | null;
    size?: number;
    className?: string;
    sx?: SxProps<Theme>;
    alt?: string;
}

/**
 * Lấy avatar URL theo độ ưu tiên:
 * 1. avatarUrl trực tiếp
 * 2. avatarUrl trong authProviders
 * 3. undefined (fallback sang text chữ cái đầu)
 */
export function resolveUserAvatarUrl(params: {
    avatarUrl?: string | null;
    authProviders?: { avatarUrl?: string | null }[] | null;
}): string | undefined {
    if (params.avatarUrl && params.avatarUrl.trim() !== "") {
        return params.avatarUrl;
    }

    if (params.authProviders && params.authProviders.length > 0) {
        const providerWithAvatar = params.authProviders.find(
            (p) => p.avatarUrl && p.avatarUrl.trim() !== "",
        );
        if (providerWithAvatar?.avatarUrl) {
            return providerWithAvatar.avatarUrl;
        }
    }

    return undefined;
}

/**
 * Lấy ký tự đầu tiên của họ tên (hoặc username/email) viết hoa
 */
export function resolveUserInitials(params: {
    fullName?: string | null;
    username?: string | null;
    email?: string | null;
}): string {
    const rawName =
        params.fullName?.trim() ||
        params.username?.trim() ||
        params.email?.trim() ||
        "";

    return rawName ? rawName.charAt(0).toUpperCase() : "";
}

/**
 * Component UserAvatar dùng chung toàn bộ dự án
 */
export default function UserAvatar({
    user,
    avatarUrl,
    authProviders,
    fullName,
    username,
    email,
    size = 40,
    className = "",
    sx = {},
    alt,
}: Readonly<UserAvatarProps>) {
    const effectiveAvatarUrl = resolveUserAvatarUrl({
        avatarUrl: avatarUrl ?? user?.avatarUrl,
        authProviders: authProviders ?? user?.authProviders,
    });

    const effectiveInitials = resolveUserInitials({
        fullName: fullName ?? user?.fullName,
        username: username ?? user?.username,
        email: email ?? user?.email,
    });

    const displayName =
        fullName ?? user?.fullName ?? username ?? user?.username ?? email ?? user?.email ?? "User";

    return (
        <Avatar
            src={effectiveAvatarUrl}
            alt={alt ?? displayName}
            className={`border-bdc-primary font-semibold select-none ${className}`}
            sx={{
                width: size,
                height: size,
                fontSize: Math.max(12, Math.round(size * 0.4)),
                bgcolor: effectiveAvatarUrl
                    ? "transparent"
                    : "var(--color-bgc-highlight)",
                color: effectiveAvatarUrl
                    ? "inherit"
                    : "var(--color-text-contrast)",
                ...sx,
            }}
        >
            {!effectiveAvatarUrl ? effectiveInitials : null}
        </Avatar>
    );
}
