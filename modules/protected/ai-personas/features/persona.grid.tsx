"use client";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useAiPersonas } from "../providers/ai.personas.provider";
import PersonaCard from "../components/persona.card";

const PersonaGrid = () => {
    const t = useTranslations("aiPersonas");
    const { personas, isLoading, openEditForm, requestDelete } =
        useAiPersonas();

    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return personas;
        return personas.filter(
            (p) =>
                p.name.toLowerCase().includes(keyword) ||
                p.role.toLowerCase().includes(keyword),
        );
    }, [personas, search]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <CircularProgress sx={{ color: "var(--color-bgc-highlight)" }} />
            </div>
        );
    }

    if (personas.length === 0) {
        return (
            <div className="bg-bgc-app flex flex-col items-center rounded-xl py-16 text-center">
                <SmartToyOutlinedIcon
                    sx={{ fontSize: 56 }}
                    className="text-text-muted"
                />
                <h3 className="mt-3 text-lg font-bold">{t("empty.title")}</h3>
                <p className="text-text-muted mt-1 max-w-sm text-sm">
                    {t("empty.description")}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <TextFieldCustom
                    size="small"
                    placeholder={t("searchPlaceholder")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sm:max-w-xs"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <SearchOutlinedIcon
                                    fontSize="small"
                                    className="text-text-muted mr-2"
                                />
                            ),
                        },
                    }}
                />
                <span className="text-text-muted text-sm sm:ml-auto">
                    {t("count", { count: filtered.length })}
                </span>
            </div>

            {filtered.length === 0 ? (
                <div className="bg-bgc-app flex flex-col items-center rounded-xl py-16 text-center">
                    <h3 className="text-lg font-bold">
                        {t("emptyFiltered.title")}
                    </h3>
                    <p className="text-text-muted mt-1 max-w-sm text-sm">
                        {t("emptyFiltered.description")}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {filtered.map((persona) => (
                        <PersonaCard
                            key={persona.id}
                            persona={persona}
                            onEdit={openEditForm}
                            onDelete={requestDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonaGrid;
