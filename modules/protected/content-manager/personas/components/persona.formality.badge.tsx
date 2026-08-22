"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { FormalityLevel } from "@/types/enums/persona.enum";
import { FORMALITY_LEVEL_CLASSES } from "../constants/persona.constants";

interface PersonaFormalityBadgeProps {
    readonly level: FormalityLevel;
    readonly className?: string;
}

export function PersonaFormalityBadge({
    level,
    className,
}: PersonaFormalityBadgeProps) {
    const t = useTranslations("personaManagement.formality");

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold whitespace-nowrap shadow-2xs",
                FORMALITY_LEVEL_CLASSES[level],
                className,
            )}
        >
            {t(level)}
        </span>
    );
}
