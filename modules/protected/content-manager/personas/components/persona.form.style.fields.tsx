"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormalityLevel, MarugotoLevel } from "@/types/enums/persona.enum";
import {
    FORMALITY_LEVEL_OPTIONS,
    MARUGOTO_LEVEL_OPTIONS,
} from "../constants/persona.constants";
import { personaInputSx } from "../constants/persona.input.sx";
import { usePersonaFormContext } from "../providers/persona.form.provider";

/**
 * Hai trục mặc định của nhân vật: nói trang trọng tới đâu và dùng từ vựng khó
 * tới đâu. Người học vẫn được đổi lại khi bắt đầu phiên trò chuyện.
 */
export function PersonaFormStyleFields() {
    const t = useTranslations("personaManagement.form");
    const tFormality = useTranslations("personaManagement.formality");
    const tMarugoto = useTranslations("personaManagement.marugoto");
    const { values, setField } = usePersonaFormContext();

    return (
        <div className="space-y-3">
            <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                <MessagesSquare className="h-4 w-4" />
                <span>{t("sections.style")}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("fields.formalityLevel")}
                    </label>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        value={values.defaultFormalityLevel}
                        onChange={(e) =>
                            setField(
                                "defaultFormalityLevel",
                                e.target.value as FormalityLevel,
                            )
                        }
                        helperText={t("fields.formalityLevelHint")}
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
                        value={values.defaultMarugotoLevel}
                        onChange={(e) =>
                            setField(
                                "defaultMarugotoLevel",
                                e.target.value as MarugotoLevel,
                            )
                        }
                        helperText={t("fields.marugotoLevelHint")}
                        sx={personaInputSx}
                    >
                        {MARUGOTO_LEVEL_OPTIONS.map((level) => (
                            <MenuItem key={level} value={level}>
                                {tMarugoto(level)}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
        </div>
    );
}
