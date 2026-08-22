"use client";

import React from "react";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";

interface PersonaGridEmptyProps {
    readonly isFiltered: boolean;
}

export function PersonaGridEmpty({ isFiltered }: PersonaGridEmptyProps) {
    const t = useTranslations("personaManagement.grid");

    return (
        <ContainerBox className="py-14">
            <div className="flex flex-col items-center justify-center gap-2">
                <Bot className="text-text-muted h-10 w-10 opacity-60" />
                <p className="text-text-muted text-sm font-semibold">
                    {isFiltered ? t("emptyFiltered") : t("empty")}
                </p>
            </div>
        </ContainerBox>
    );
}
