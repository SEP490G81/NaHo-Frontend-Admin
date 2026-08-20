"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { MarugotoLevel } from "@/types/enums/persona.enum";
import {
    CONVERSATION_STYLE_DESCRIPTION_MAX_LENGTH,
    CONVERSATION_STYLE_PROMPT_MAX_LENGTH,
    FORMALITY_LEVEL_OPTIONS,
    MARUGOTO_LEVEL_OPTIONS,
} from "../constants/persona.constants";
import { personaInputSx } from "../constants/persona.input.sx";
import { usePersonaFormContext } from "../providers/persona.form.provider";

/** Các ô nhập nội dung phong cách hội thoại (chế độ tự khai báo). */
export function PersonaFormStyleEditor() {
    const t = useTranslations("personaManagement.form");
    const tError = useTranslations("personaManagement.form.errors");
    const tFormality = useTranslations("personaManagement.formality");
    const tMarugoto = useTranslations("personaManagement.marugoto");
    const { values, errors, setField } = usePersonaFormContext();

    const errorText = (key?: string) =>
        key ? tError(key as Parameters<typeof tError>[0]) : "";

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.formalityLevel")}
                    </label>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        value={values.styleFormalityLevel}
                        onChange={(e) =>
                            setField(
                                "styleFormalityLevel",
                                e.target
                                    .value as typeof values.styleFormalityLevel,
                            )
                        }
                        sx={personaInputSx}
                    >
                        {FORMALITY_LEVEL_OPTIONS.map((level) => (
                            <MenuItem key={level} value={level}>
                                {tFormality(level)}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.marugotoLevel")}
                    </label>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        value={values.styleMarugotoLevel}
                        onChange={(e) =>
                            setField(
                                "styleMarugotoLevel",
                                e.target.value as MarugotoLevel | "",
                            )
                        }
                        sx={personaInputSx}
                    >
                        <MenuItem value="">
                            {t("fields.marugotoLevelNone")}
                        </MenuItem>
                        {MARUGOTO_LEVEL_OPTIONS.map((level) => (
                            <MenuItem key={level} value={level}>
                                {tMarugoto(level)}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-text-contrast text-xs font-bold">
                    {t("fields.styleDescription")}
                </label>
                <TextField
                    fullWidth
                    size="small"
                    value={values.styleDescription}
                    placeholder={t("fields.styleDescriptionPlaceholder")}
                    onChange={(e) =>
                        setField("styleDescription", e.target.value)
                    }
                    error={Boolean(errors.styleDescription)}
                    helperText={errorText(errors.styleDescription)}
                    slotProps={{
                        htmlInput: {
                            maxLength:
                                CONVERSATION_STYLE_DESCRIPTION_MAX_LENGTH,
                        },
                    }}
                    sx={personaInputSx}
                />
            </div>

            <div className="space-y-1">
                <div className="flex items-end justify-between">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.stylePrompt")}
                    </label>
                    <span className="text-text-muted text-[11px] font-semibold">
                        {values.stylePrompt.length}/
                        {CONVERSATION_STYLE_PROMPT_MAX_LENGTH}
                    </span>
                </div>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    value={values.stylePrompt}
                    placeholder={t("fields.stylePromptPlaceholder")}
                    onChange={(e) => setField("stylePrompt", e.target.value)}
                    error={Boolean(errors.stylePrompt)}
                    helperText={
                        errorText(errors.stylePrompt) ||
                        t("fields.stylePromptHint")
                    }
                    slotProps={{
                        htmlInput: {
                            maxLength: CONVERSATION_STYLE_PROMPT_MAX_LENGTH,
                        },
                    }}
                    sx={personaInputSx}
                />
            </div>
        </div>
    );
}
