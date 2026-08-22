"use client";

import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from "@mui/material";
import { MessagesSquare, ScrollText, SquarePen, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePersonaModal } from "../providers/persona.modal.provider";
import { PersonaAvatar } from "./persona.avatar";
import { PersonaFormalityBadge } from "./persona.formality.badge";
import { PersonaMarugotoBadge } from "./persona.marugoto.badge";
import { PersonaStatusBadge } from "./persona.status.badge";
import { PersonaVoiceChip } from "./persona.voice.chip";

export function PersonaDetailsModal() {
    const t = useTranslations("personaManagement.detail");
    const { detailPersona, closeDetail, openEditForm } = usePersonaModal();

    if (!detailPersona) return null;

    const handleEdit = () => {
        closeDetail();
        openEditForm(detailPersona);
    };

    return (
        <Dialog
            open={Boolean(detailPersona)}
            onClose={closeDetail}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-3xl bg-bgc-modal border border-bdc-primary shadow-2xl",
                },
            }}
        >
            <DialogTitle className="text-text-contrast flex items-center justify-between px-6 py-4 font-bold">
                <div className="flex items-center gap-3">
                    <PersonaAvatar persona={detailPersona} />
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold">
                                {detailPersona.name}
                            </h2>
                            <PersonaStatusBadge status={detailPersona.status} />
                        </div>
                        <PersonaVoiceChip
                            gender={detailPersona.gender}
                            voiceName={detailPersona.voiceName}
                        />
                    </div>
                </div>
                <IconButton
                    onClick={closeDetail}
                    size="small"
                    className="text-text-muted"
                >
                    <X className="h-4 w-4" />
                </IconButton>
            </DialogTitle>
            <Divider className="border-bdc-primary" />

            <DialogContent className="max-h-[70vh] space-y-6 overflow-y-auto px-6 py-6">
                {/* Prompt nhân vật */}
                <div className="space-y-2">
                    <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                        <ScrollText className="h-4 w-4" />
                        <span>{t("personaPrompt")}</span>
                    </div>
                    <p className="border-bdc-primary bg-bgc-page text-text-contrast rounded-xl border p-4 text-xs leading-relaxed whitespace-pre-wrap">
                        {detailPersona.prompt}
                    </p>
                </div>

                <Divider className="border-bdc-primary" />

                {/* Mặc định phong cách hội thoại */}
                <div className="space-y-2">
                    <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                        <MessagesSquare className="h-4 w-4" />
                        <span>{t("styleSection")}</span>
                    </div>

                    <div className="border-bdc-primary bg-bgc-page flex flex-wrap items-center gap-2 rounded-xl border p-4">
                        {detailPersona.defaultFormalityLevel && (
                            <PersonaFormalityBadge
                                level={detailPersona.defaultFormalityLevel}
                            />
                        )}
                        {detailPersona.defaultMarugotoLevel && (
                            <PersonaMarugotoBadge
                                level={detailPersona.defaultMarugotoLevel}
                            />
                        )}
                        {!detailPersona.defaultFormalityLevel &&
                            !detailPersona.defaultMarugotoLevel && (
                                <span className="text-text-muted text-xs font-semibold">
                                    {t("noStyle")}
                                </span>
                            )}
                    </div>
                    <p className="text-text-muted text-[11px]">
                        {t("styleHint")}
                    </p>
                </div>
            </DialogContent>

            <Divider className="border-bdc-primary" />
            <DialogActions className="px-6 py-4">
                <Button
                    onClick={closeDetail}
                    variant="outlined"
                    sx={{
                        borderRadius: "10px",
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-contrast)",
                        textTransform: "none",
                    }}
                >
                    {t("close")}
                </Button>
                <Button
                    onClick={handleEdit}
                    variant="contained"
                    startIcon={<SquarePen className="h-4 w-4" />}
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 3,
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {t("editButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
