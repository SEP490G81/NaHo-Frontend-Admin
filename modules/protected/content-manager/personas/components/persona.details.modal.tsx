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

export function PersonaDetailsModal() {
    const t = useTranslations("personaManagement.detail");
    const { detailPersona, closeDetail, openEditForm } = usePersonaModal();

    if (!detailPersona) return null;

    const style = detailPersona.conversationStyle;

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
                    <PersonaAvatar
                        personaId={detailPersona.id}
                        name={detailPersona.name}
                    />
                    <div>
                        <h2 className="text-lg font-bold">
                            {detailPersona.name}
                        </h2>
                        <p className="text-text-muted text-xs font-normal">
                            {t("subtitle", { id: detailPersona.id })}
                        </p>
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

                {/* Phong cách hội thoại gợi ý */}
                <div className="space-y-2">
                    <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                        <MessagesSquare className="h-4 w-4" />
                        <span>{t("styleSection")}</span>
                    </div>

                    {style ? (
                        <div className="border-bdc-primary bg-bgc-page space-y-3 rounded-xl border p-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <PersonaFormalityBadge
                                    level={style.formalityLevel}
                                />
                                {style.marugotoLevel && (
                                    <PersonaMarugotoBadge
                                        level={style.marugotoLevel}
                                    />
                                )}
                                <span className="text-text-muted text-[11px] font-semibold">
                                    {t("styleId", { id: style.id })}
                                </span>
                            </div>
                            <div>
                                <p className="text-text-muted text-[11px] font-bold uppercase">
                                    {t("styleDescription")}
                                </p>
                                <p className="text-text-contrast text-xs">
                                    {style.description || t("none")}
                                </p>
                            </div>
                            <div>
                                <p className="text-text-muted text-[11px] font-bold uppercase">
                                    {t("stylePrompt")}
                                </p>
                                <p className="text-text-contrast text-xs leading-relaxed whitespace-pre-wrap">
                                    {style.prompt}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-text-error text-xs font-semibold">
                            {t("noStyle")}
                        </p>
                    )}
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
