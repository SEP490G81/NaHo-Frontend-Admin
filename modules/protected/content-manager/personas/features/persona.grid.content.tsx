"use client";

import React, { useMemo } from "react";
import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { FormalityLevelFilter } from "@/types/enums/persona.enum";
import { PersonaCard } from "../components/persona.card";
import { PersonaDetailsModal } from "../components/persona.details.modal";
import { PersonaGridEmpty } from "../components/persona.grid.empty";
import { PersonaGridSkeleton } from "../components/persona.grid.skeleton";
import { PersonaSearchBox } from "../components/persona.search.box";
import { usePersonaQuery } from "../hooks/use.persona.query";
import { usePersonaFilter } from "../providers/persona.filter.provider";
import { PersonaFormModal } from "./persona.form.modal";

export function PersonaGridContent() {
    const t = useTranslations("personaManagement.grid");
    const { data, isLoading, isError } = usePersonaQuery();
    const { filter } = usePersonaFilter();

    const personas = useMemo(() => data?.data ?? [], [data]);

    const filteredPersonas = useMemo(() => {
        return personas.filter((persona) => {
            // 1. Lọc theo mức trang trọng của phong cách hội thoại
            if (
                filter.formalityLevel !== FormalityLevelFilter.ALL &&
                persona.conversationStyle?.formalityLevel !==
                    filter.formalityLevel
            ) {
                return false;
            }

            // 2. Tìm theo tên, prompt, mô tả phong cách hoặc mã nhân vật
            const keyword = filter.searchKeyword.trim().toLowerCase();
            if (!keyword) return true;

            return (
                persona.name.toLowerCase().includes(keyword) ||
                persona.prompt.toLowerCase().includes(keyword) ||
                String(persona.id).includes(keyword) ||
                Boolean(
                    persona.conversationStyle?.description
                        ?.toLowerCase()
                        .includes(keyword),
                )
            );
        });
    }, [personas, filter]);

    const isFiltered =
        Boolean(filter.searchKeyword.trim()) ||
        filter.formalityLevel !== FormalityLevelFilter.ALL;

    const renderGrid = () => {
        if (isLoading) return <PersonaGridSkeleton />;

        if (isError) {
            return (
                <ContainerBox className="flex items-center gap-2 py-8">
                    <CircleAlert className="text-text-error h-5 w-5 shrink-0" />
                    <p className="text-text-error text-sm font-semibold">
                        {t("loadError")}
                    </p>
                </ContainerBox>
            );
        }

        if (filteredPersonas.length === 0) {
            return <PersonaGridEmpty isFiltered={isFiltered} />;
        }

        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredPersonas.map((persona) => (
                    <PersonaCard key={persona.id} persona={persona} />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-y-4">
            <PersonaSearchBox />

            {!isLoading && !isError && (
                <p className="text-text-muted px-1 text-xs font-semibold">
                    {t("countLabel", {
                        shown: filteredPersonas.length,
                        total: personas.length,
                    })}
                </p>
            )}

            {renderGrid()}

            <PersonaDetailsModal />
            <PersonaFormModal />
        </div>
    );
}
