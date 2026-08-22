"use client";

import React from "react";
import { Button } from "@mui/material";
import { Bot, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { PersonaFilterProvider } from "../providers/persona.filter.provider";
import {
    PersonaModalProvider,
    usePersonaModal,
} from "../providers/persona.modal.provider";
import { PersonaGridContent } from "./persona.grid.content";

function PersonaManagementHeader() {
    const t = useTranslations("personaManagement");
    const { openCreateForm } = usePersonaModal();

    return (
        <ContainerBox>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-8 w-8 items-center justify-center rounded-xl font-bold">
                            <Bot className="h-4 w-4" />
                        </div>
                        <h1 className="text-text-contrast text-2xl font-bold">
                            {t("pageTitle")}
                        </h1>
                    </div>
                    <p className="text-text-muted mt-1 text-xs">
                        {t("pageSubtitle")}
                    </p>
                </div>

                <Button
                    variant="contained"
                    startIcon={<Plus className="h-4 w-4" />}
                    onClick={openCreateForm}
                    sx={{
                        borderRadius: "12px",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        px: 2.5,
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {t("addButton")}
                </Button>
            </div>
        </ContainerBox>
    );
}

export default function PersonaManagementView() {
    return (
        <PersonaFilterProvider>
            <PersonaModalProvider>
                <div className="flex w-full flex-col gap-y-4">
                    <PersonaManagementHeader />
                    <PersonaGridContent />
                </div>
            </PersonaModalProvider>
        </PersonaFilterProvider>
    );
}
