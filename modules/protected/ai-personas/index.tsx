"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import {
    AiPersonasProvider,
    useAiPersonas,
} from "./providers/ai.personas.provider";
import PersonaGrid from "./features/persona.grid";
import PersonaFormDialog from "./features/persona.form.dialog";
import PersonaDeleteDialog from "./features/persona.delete.dialog";

const AiPersonasContent = () => {
    const t = useTranslations("aiPersonas");
    const { openCreateForm } = useAiPersonas();

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app flex flex-col gap-4 rounded-xl p-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold">
                        <SmartToyOutlinedIcon
                            sx={{ color: "var(--color-bgc-highlight)" }}
                        />
                        {t("title")}
                    </h1>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("description")}
                    </p>
                </div>
                <Button
                    variant="contained"
                    disableElevation
                    startIcon={<AddIcon />}
                    onClick={openCreateForm}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                        flexShrink: 0,
                    }}
                >
                    {t("addButton")}
                </Button>
            </div>

            <PersonaGrid />
            <PersonaFormDialog />
            <PersonaDeleteDialog />
        </div>
    );
};

const AiPersonas = () => {
    return (
        <AiPersonasProvider>
            <AiPersonasContent />
        </AiPersonasProvider>
    );
};

export default AiPersonas;
