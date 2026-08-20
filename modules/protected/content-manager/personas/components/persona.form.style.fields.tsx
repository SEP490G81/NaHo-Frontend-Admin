"use client";

import React from "react";
import {
    MenuItem,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { Info, MessagesSquare, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { personaInputSx } from "../constants/persona.input.sx";
import { usePersonaFormContext } from "../providers/persona.form.provider";
import { PersonaStyleMode } from "../types/persona.form.type";
import { PersonaFormStyleEditor } from "./persona.form.style.editor";

const toggleSx = {
    "& .MuiToggleButton-root": {
        borderRadius: "10px",
        borderColor: "var(--color-bdc-primary)",
        color: "var(--color-text-muted)",
        textTransform: "none",
        fontSize: "0.78rem",
        fontWeight: "bold",
        px: 2,
        py: 0.6,
        "&.Mui-selected": {
            backgroundColor:
                "color-mix(in srgb, var(--color-bgc-highlight) 15%, transparent)",
            color: "var(--color-bgc-highlight)",
        },
    },
};

export function PersonaFormStyleFields() {
    const t = useTranslations("personaManagement.form");
    const tError = useTranslations("personaManagement.form.errors");
    const tFormality = useTranslations("personaManagement.formality");
    const {
        values,
        errors,
        setField,
        selectExistingStyle,
        styleOptions,
        isEditing,
        sharedStyleUsageCount,
    } = usePersonaFormContext();

    const isCustom = values.styleMode === "CUSTOM";

    const handleModeChange = (
        _event: React.MouseEvent<HTMLElement>,
        mode: PersonaStyleMode | null,
    ) => {
        if (mode) setField("styleMode", mode);
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                    <MessagesSquare className="h-4 w-4" />
                    <span>{t("sections.style")}</span>
                </div>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={values.styleMode}
                    onChange={handleModeChange}
                    sx={toggleSx}
                >
                    <ToggleButton value="EXISTING">
                        {t("fields.styleModeExisting")}
                    </ToggleButton>
                    <ToggleButton value="CUSTOM">
                        {isEditing
                            ? t("fields.styleModeEdit")
                            : t("fields.styleModeCustom")}
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div className="space-y-1">
                <label className="text-text-contrast text-xs font-bold">
                    {t("fields.existingStyle")}
                </label>
                <TextField
                    select
                    fullWidth
                    size="small"
                    disabled={isCustom && !isEditing}
                    value={values.suggestedConversationStyleId}
                    onChange={(e) => selectExistingStyle(e.target.value)}
                    error={Boolean(errors.suggestedConversationStyleId)}
                    helperText={
                        errors.suggestedConversationStyleId
                            ? tError(
                                  errors.suggestedConversationStyleId as Parameters<
                                      typeof tError
                                  >[0],
                              )
                            : t("fields.existingStyleHint")
                    }
                    sx={personaInputSx}
                >
                    {styleOptions.length === 0 && (
                        <MenuItem value="" disabled>
                            {t("fields.existingStyleEmpty")}
                        </MenuItem>
                    )}
                    {styleOptions.map(({ style, usageCount }) => (
                        <MenuItem key={style.id} value={String(style.id)}>
                            {`#${style.id} · ${tFormality(style.formalityLevel)}${
                                style.description
                                    ? ` · ${style.description}`
                                    : ""
                            } (${t("styleUsage", { count: usageCount })})`}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            {/* Xem trước nội dung phong cách đang chọn */}
            {!isCustom && values.stylePrompt && (
                <div className="border-bdc-primary bg-bgc-page space-y-1 rounded-xl border p-3">
                    <p className="text-text-muted text-[11px] font-bold uppercase">
                        {t("fields.stylePrompt")}
                    </p>
                    <p className="text-text-contrast text-[11px] leading-relaxed whitespace-pre-wrap">
                        {values.stylePrompt}
                    </p>
                </div>
            )}

            {isCustom && (
                <>
                    {isEditing && sharedStyleUsageCount > 0 && (
                        <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-[11px] font-semibold text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                {t("sharedStyleWarning", {
                                    count: sharedStyleUsageCount,
                                })}
                            </span>
                        </div>
                    )}
                    {!isEditing && (
                        <div className="border-bdc-primary bg-bgc-page text-text-muted flex items-start gap-2 rounded-xl border p-3 text-[11px] font-semibold">
                            <Info className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{t("newStyleHint")}</span>
                        </div>
                    )}
                    <PersonaFormStyleEditor />
                </>
            )}
        </div>
    );
}
