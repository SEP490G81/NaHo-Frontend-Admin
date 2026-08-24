"use client";

import React from "react";
import { CircleCheck, CircleSlash } from "lucide-react";
import { useTranslations } from "next-intl";
import { PersonaStatus } from "@/types/enums/persona.enum";

interface PersonaStatusBadgeProps {
    readonly status: PersonaStatus;
}

export function PersonaStatusBadge({ status }: PersonaStatusBadgeProps) {
    const t = useTranslations("personaManagement.status");

    if (status === PersonaStatus.ACTIVE) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100/90 px-2.5 py-0.5 text-[11px] font-extrabold whitespace-nowrap text-emerald-800 shadow-2xs dark:border-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                <CircleCheck className="h-3 w-3 shrink-0" />
                {t("ACTIVE")}
            </span>
        );
    }

    return (
        <span className="border-bdc-muted bg-bgc-page text-text-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold whitespace-nowrap">
            <CircleSlash className="h-3 w-3 shrink-0" />
            {t("UNACTIVE")}
        </span>
    );
}
