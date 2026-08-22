"use client";

import React from "react";
import { Mars, Venus } from "lucide-react";
import { cn } from "@/libs/utils";
import { Gender } from "@/types/enums/user.enum";

interface PersonaGenderIconProps {
    readonly gender: Gender;
    readonly className?: string;
}

/** Icon giới tính: nam màu xanh, nữ màu hồng đỏ. */
export function PersonaGenderIcon({
    gender,
    className,
}: PersonaGenderIconProps) {
    const isMale = gender === Gender.MALE;
    const Icon = isMale ? Mars : Venus;

    return (
        <Icon
            className={cn(
                "shrink-0",
                isMale ? "text-sky-500" : "text-rose-500",
                className ?? "h-3.5 w-3.5",
            )}
        />
    );
}
