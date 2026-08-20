"use client";

import React from "react";
import { cn } from "@/libs/utils";
import {
    getPersonaGradient,
    getPersonaInitials,
} from "../utils/persona.format.util";

interface PersonaAvatarProps {
    readonly personaId: number;
    readonly name: string;
    readonly className?: string;
}

/**
 * Avatar chữ cái đầu với dải màu cố định theo id. BE mới chỉ lưu `avatarFileId`
 * và chưa có API lấy đường dẫn ảnh nên tạm thời hiển thị chữ thay cho ảnh.
 */
export function PersonaAvatar({
    personaId,
    name,
    className,
}: PersonaAvatarProps) {
    return (
        <div
            className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-black text-white shadow-sm",
                getPersonaGradient(personaId),
                className,
            )}
        >
            {getPersonaInitials(name)}
        </div>
    );
}
