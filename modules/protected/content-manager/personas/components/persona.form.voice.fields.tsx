"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Gender } from "@/types/enums/user.enum";
import { PersonaStatus } from "@/types/enums/persona.enum";
import {
    AZURE_VOICE_OPTIONS,
    GENDER_OPTIONS,
    PERSONA_STATUS_OPTIONS,
} from "../constants/persona.constants";
import { personaInputSx } from "../constants/persona.input.sx";
import { usePersonaFormContext } from "../providers/persona.form.provider";
import { PersonaGenderIcon } from "./persona.gender.icon";

/** Giới tính, giọng đọc Azure và trạng thái hoạt động của nhân vật. */
export function PersonaFormVoiceFields() {
    const t = useTranslations("personaManagement.form");
    const tGender = useTranslations("personaManagement.gender");
    const tStatus = useTranslations("personaManagement.status");
    const { values, setField } = usePersonaFormContext();

    const voiceOptions = AZURE_VOICE_OPTIONS.filter(
        (voice) => voice.gender === values.gender,
    );

    /** Đổi giới tính thì đổi luôn giọng cho khớp, tránh gán giọng nam cho nữ. */
    const handleGenderChange = (gender: Gender) => {
        setField("gender", gender);
        const stillValid = AZURE_VOICE_OPTIONS.some(
            (voice) =>
                voice.name === values.voiceName && voice.gender === gender,
        );
        if (!stillValid) {
            const fallback = AZURE_VOICE_OPTIONS.find(
                (voice) => voice.gender === gender,
            );
            if (fallback) setField("voiceName", fallback.name);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
                <label className="text-text-contrast text-xs font-bold">
                    {t("fields.gender")}
                </label>
                <TextField
                    select
                    fullWidth
                    size="small"
                    value={values.gender}
                    onChange={(e) =>
                        handleGenderChange(e.target.value as Gender)
                    }
                    sx={personaInputSx}
                >
                    {GENDER_OPTIONS.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                            <span className="flex items-center gap-2">
                                <PersonaGenderIcon
                                    gender={gender}
                                    className="h-4 w-4"
                                />
                                {tGender(gender)}
                            </span>
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className="space-y-1">
                <label className="text-text-contrast text-xs font-bold">
                    {t("fields.voiceName")}
                </label>
                <TextField
                    select
                    fullWidth
                    size="small"
                    value={values.voiceName}
                    onChange={(e) => setField("voiceName", e.target.value)}
                    helperText={t("fields.voiceNameHint")}
                    sx={personaInputSx}
                >
                    {voiceOptions.map((voice) => (
                        <MenuItem key={voice.name} value={voice.name}>
                            {voice.name.replace("ja-JP-", "")}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className="space-y-1">
                <label className="text-text-contrast text-xs font-bold">
                    {t("fields.status")}
                </label>
                <TextField
                    select
                    fullWidth
                    size="small"
                    value={values.status}
                    onChange={(e) =>
                        setField("status", e.target.value as PersonaStatus)
                    }
                    helperText={t("fields.statusHint")}
                    sx={personaInputSx}
                >
                    {PERSONA_STATUS_OPTIONS.map((status) => (
                        <MenuItem key={status} value={status}>
                            {tStatus(status)}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    );
}
