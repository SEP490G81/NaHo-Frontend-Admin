"use client";

import React from "react";
import { Button } from "@mui/material";
import { Eye, SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { PersonaStatus } from "@/types/enums/persona.enum";
import { PersonaResponse } from "@/types/responses/persona.response";
import { PersonaStatusToggleButton } from "../features/persona.status.toggle.button";
import { usePersonaModal } from "../providers/persona.modal.provider";
import { truncatePrompt } from "../utils/persona.format.util";
import { PersonaAvatar } from "./persona.avatar";
import { PersonaFormalityBadge } from "./persona.formality.badge";
import { PersonaMarugotoBadge } from "./persona.marugoto.badge";
import { PersonaStatusBadge } from "./persona.status.badge";
import { PersonaVoiceChip } from "./persona.voice.chip";

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

    const isInactive = persona.status === PersonaStatus.UNACTIVE;
    const hasLevels = Boolean(
        persona.defaultFormalityLevel || persona.defaultMarugotoLevel,
    );

    return (
        <ContainerBox
            className={`hover:border-bgc-highlight/60 flex flex-col justify-between gap-4 transition-all duration-200 hover:shadow-md ${isInactive ? "opacity-70" : ""}`}
        >
            <div className="flex flex-col gap-3">
                {/* Ảnh, tên, trạng thái */}
                <div className="flex items-start gap-3">
                    <PersonaAvatar persona={persona} />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-text-contrast truncate text-base font-extrabold">
                                {persona.name}
                            </h3>
                            <PersonaStatusBadge status={persona.status} />
                        </div>
                        <PersonaVoiceChip
                            gender={persona.gender}
                            voiceName={persona.voiceName}
                        />
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            {hasLevels ? (
                                <>
                                    {persona.defaultFormalityLevel && (
                                        <PersonaFormalityBadge
                                            level={
                                                persona.defaultFormalityLevel
                                            }
                                        />
                                    )}
                                    {persona.defaultMarugotoLevel && (
                                        <PersonaMarugotoBadge
                                            level={persona.defaultMarugotoLevel}
                                        />
                                    )}
                                </>
                            ) : (
                                <span className="text-text-muted text-[11px] font-bold">
                                    {t("noStyle")}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Xem trước prompt nhân vật */}
                <p className="text-text-contrast/80 line-clamp-4 text-xs leading-relaxed italic">
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
                <PersonaStatusToggleButton
                    personaId={persona.id}
                    status={persona.status}
                />
            </div>
        </ContainerBox>
    );
}
