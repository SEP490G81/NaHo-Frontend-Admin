"use client";
import React from "react";
import { useTranslations } from "next-intl";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { PersonaResponse } from "@/types/responses/persona.response";
import PersonaAvatar from "./persona.avatar";
import PersonaLevelBadge from "./persona.level.badge";
import PersonaRegisterBadge from "./persona.register.badge";
import PersonaStatusBadge from "./persona.status.badge";

interface PersonaCardProps {
    persona: PersonaResponse;
    onEdit: (persona: PersonaResponse) => void;
    onDelete: (persona: PersonaResponse) => void;
}

const PersonaCard = ({ persona, onEdit, onDelete }: PersonaCardProps) => {
    const t = useTranslations("aiPersonas.card");
    const isDraft = persona.status === "DRAFT";

    return (
        <div
            className={`border-bdc-primary bg-bgc-app flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md ${
                isDraft ? "opacity-75" : ""
            }`}
        >
            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start gap-3">
                    <PersonaAvatar
                        name={persona.name}
                        avatarUrl={persona.avatarUrl}
                        seed={persona.id}
                    />
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-lg font-bold">
                            {persona.name}
                        </h3>
                        <p className="text-text-muted truncate text-sm">
                            {persona.roleStyle}
                        </p>
                    </div>
                    {isDraft && <PersonaStatusBadge status={persona.status} />}
                </div>

                <p className="text-text-muted line-clamp-2 text-sm">
                    {persona.description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                    <PersonaLevelBadge level={persona.suggestedLevel} />
                    <PersonaRegisterBadge register={persona.defaultRegister} />
                </div>
            </div>

            <div className="border-bdc-primary grid grid-cols-2 border-t">
                <button
                    type="button"
                    onClick={() => onEdit(persona)}
                    className="hover:bg-hbgc-app flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors"
                >
                    <EditOutlinedIcon fontSize="small" />
                    {t("edit")}
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(persona)}
                    className="text-bgc-error hover:bg-hbgc-app border-bdc-primary flex items-center justify-center gap-2 border-l py-3 text-sm font-medium transition-colors"
                >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                    {t("delete")}
                </button>
            </div>
        </div>
    );
};

export default PersonaCard;
