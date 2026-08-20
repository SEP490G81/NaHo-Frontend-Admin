"use client";

import React from "react";
import { Button } from "@mui/material";
import { Eye, MessagesSquare, SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { PersonaResponse } from "@/types/responses/persona.response";
import { usePersonaModal } from "../providers/persona.modal.provider";
import { truncatePrompt } from "../utils/persona.format.util";
import { PersonaAvatar } from "./persona.avatar";
import { PersonaFormalityBadge } from "./persona.formality.badge";
import { PersonaMarugotoBadge } from "./persona.marugoto.badge";

const actionButtonSx = {
    borderRadius: "12px",
    borderColor: "var(--color-bdc-primary)",
    color: "var(--color-text-contrast)",
    textTransform: "none",
    fontSize: "0.78rem",
    fontWeight: "bold",
    "&:hover": {
        borderColor: "var(--color-bgc-highlight)",
        color: "var(--color-bgc-highlight)",
        backgroundColor: "var(--color-hbgc-app)",
    },
};

interface PersonaCardProps {
    readonly persona: PersonaResponse;
}

export function PersonaCard({ persona }: PersonaCardProps) {
    const t = useTranslations("personaManagement.card");
    const { openDetail, openEditForm } = usePersonaModal();

    const style = persona.conversationStyle;

    return (
        <ContainerBox className="hover:border-bgc-highlight/60 flex flex-col justify-between gap-4 transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col gap-3">
                {/* Tên & nhãn phong cách */}
                <div className="flex items-start gap-3">
                    <PersonaAvatar personaId={persona.id} name={persona.name} />
                    <div className="min-w-0 flex-1">
                        <h3 className="text-text-contrast truncate text-base font-extrabold">
                            {persona.name}
                        </h3>
                        <p className="text-text-muted text-[11px] font-semibold">
                            {persona.avatarFileId
                                ? t("idWithAvatar", {
                                      id: persona.id,
                                      fileId: persona.avatarFileId,
                                  })
                                : t("id", { id: persona.id })}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            {style ? (
                                <PersonaFormalityBadge
                                    level={style.formalityLevel}
                                />
                            ) : (
                                <span className="text-text-error text-[11px] font-bold">
                                    {t("noStyle")}
                                </span>
                            )}
                            {style?.marugotoLevel && (
                                <PersonaMarugotoBadge
                                    level={style.marugotoLevel}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Mô tả phong cách hội thoại */}
                {style?.description && (
                    <div className="border-bdc-primary bg-bgc-page flex items-start gap-2 rounded-xl border p-2.5">
                        <MessagesSquare className="text-text-muted mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <p className="text-text-muted line-clamp-2 text-[11px] font-medium">
                            {style.description}
                        </p>
                    </div>
                )}

                {/* Xem trước prompt nhân vật */}
                <p className="text-text-contrast/80 line-clamp-3 text-xs leading-relaxed italic">
                    {truncatePrompt(persona.prompt)}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Eye className="h-3.5 w-3.5" />}
                    onClick={() => openDetail(persona)}
                    sx={actionButtonSx}
                >
                    {t("detailButton")}
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<SquarePen className="h-3.5 w-3.5" />}
                    onClick={() => openEditForm(persona)}
                    sx={actionButtonSx}
                >
                    {t("editButton")}
                </Button>
            </div>
        </ContainerBox>
    );
}
