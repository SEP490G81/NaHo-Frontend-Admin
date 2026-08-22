"use client";

import React from "react";
import { Avatar } from "@mui/material";
import { cn } from "@/libs/utils";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    getPersonaGradient,
    getPersonaInitials,
} from "../utils/persona.format.util";

interface PersonaAvatarProps {
    readonly persona: PersonaResponse;
    readonly size?: number;
    readonly className?: string;
}

/**
 * Ảnh đại diện nhân vật lấy từ `avatarFile.accessUrl`; nhân vật chưa có ảnh thì
 * hiển thị chữ cái đầu trên nền gradient cố định theo id.
 */
export function PersonaAvatar({
    persona,
    size = 48,
    className,
}: PersonaAvatarProps) {
    const avatarUrl = persona.avatarFile?.accessUrl || undefined;

    return (
        <Avatar
            src={avatarUrl}
            alt={persona.name}
            variant="rounded"
            className={cn(
                "shrink-0 rounded-2xl font-black text-white shadow-sm select-none",
                !avatarUrl &&
                    `bg-gradient-to-br ${getPersonaGradient(persona.id)}`,
                className,
            )}
            sx={{
                width: size,
                height: size,
                fontSize: Math.max(12, Math.round(size * 0.32)),
                bgcolor: avatarUrl ? "transparent" : undefined,
            }}
        >
            {!avatarUrl ? getPersonaInitials(persona.name) : null}
        </Avatar>
    );
}
