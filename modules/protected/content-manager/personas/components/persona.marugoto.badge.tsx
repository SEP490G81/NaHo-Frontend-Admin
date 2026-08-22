"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { MarugotoLevel } from "@/types/enums/persona.enum";

interface PersonaMarugotoBadgeProps {
    readonly level: MarugotoLevel;
}

export function PersonaMarugotoBadge({ level }: PersonaMarugotoBadgeProps) {
    const t = useTranslations("personaManagement.marugoto");

    return (
        <span className="border-bdc-primary bg-bgc-page text-text-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap">
            <BookOpen className="h-3 w-3 shrink-0" />
            {t(level)}
        </span>
    );
}
