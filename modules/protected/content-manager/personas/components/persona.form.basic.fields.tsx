"use client";

import React from "react";
import { TextField } from "@mui/material";
import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    PERSONA_NAME_MAX_LENGTH,
    PERSONA_PROMPT_MAX_LENGTH,
} from "../constants/persona.constants";
import { personaInputSx } from "../constants/persona.input.sx";
import { usePersonaFormContext } from "../providers/persona.form.provider";

export function PersonaFormBasicFields() {
    const t = useTranslations("personaManagement.form");
    const tError = useTranslations("personaManagement.form.errors");
    const { values, errors, setField } = usePersonaFormContext();

    const errorText = (key?: string) =>
        key ? tError(key as Parameters<typeof tError>[0]) : "";

    return (
        <div className="space-y-3">
            <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                <UserRound className="h-4 w-4" />
                <span>{t("sections.basic")}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-1 md:col-span-2">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.name")}
                    </label>
                    <TextField
                        fullWidth
                        size="small"
                        value={values.name}
                        placeholder={t("fields.namePlaceholder")}
                        onChange={(e) => setField("name", e.target.value)}
                        error={Boolean(errors.name)}
                        helperText={errorText(errors.name)}
                        slotProps={{
                            htmlInput: { maxLength: PERSONA_NAME_MAX_LENGTH },
                        }}
                        sx={personaInputSx}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.avatarFileId")}
                    </label>
                    <TextField
                        fullWidth
                        size="small"
                        value={values.avatarFileId}
                        placeholder={t("fields.avatarFileIdPlaceholder")}
                        onChange={(e) =>
                            setField("avatarFileId", e.target.value)
                        }
                        error={Boolean(errors.avatarFileId)}
                        helperText={
                            errorText(errors.avatarFileId) ||
                            t("fields.avatarFileIdHint")
                        }
                        sx={personaInputSx}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex items-end justify-between">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.prompt")}
                    </label>
                    <span className="text-text-muted text-[11px] font-semibold">
                        {values.prompt.length}/{PERSONA_PROMPT_MAX_LENGTH}
                    </span>
                </div>
                <TextField
                    fullWidth
                    multiline
                    rows={7}
                    size="small"
                    value={values.prompt}
                    placeholder={t("fields.promptPlaceholder")}
                    onChange={(e) => setField("prompt", e.target.value)}
                    error={Boolean(errors.prompt)}
                    helperText={
                        errorText(errors.prompt) || t("fields.promptHint")
                    }
                    slotProps={{
                        htmlInput: { maxLength: PERSONA_PROMPT_MAX_LENGTH },
                    }}
                    sx={personaInputSx}
                />
            </div>
        </div>
    );
}
