"use client";

import React from "react";
import { Mic, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Gender } from "@/types/enums/user.enum";
import { DEFAULT_AZURE_VOICE } from "../constants/persona.constants";

interface PersonaVoiceChipProps {
    readonly gender: Gender;
    readonly voiceName?: string | null;
}

/** Dòng thông tin giới tính + giọng đọc Azure của nhân vật. */
export function PersonaVoiceChip({ gender, voiceName }: PersonaVoiceChipProps) {
    const t = useTranslations("personaManagement.gender");

    return (
        <span className="text-text-muted inline-flex items-center gap-2 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1">
                <UserRound className="h-3 w-3 shrink-0" />
                {t(gender)}
            </span>
            <span className="inline-flex items-center gap-1">
                <Mic className="h-3 w-3 shrink-0" />
                {(voiceName || DEFAULT_AZURE_VOICE).replace("ja-JP-", "")}
            </span>
        </span>
    );
}
