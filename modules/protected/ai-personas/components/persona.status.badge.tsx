import React from "react";
import { useTranslations } from "next-intl";
import { PersonaStatus } from "@/types/enums/persona.enum";
import {
    PERSONA_STATUS_STYLE,
    STATUS_KEY,
} from "../constants/ai.personas.constant";

const PersonaStatusBadge = ({ status }: { status: PersonaStatus }) => {
    const t = useTranslations("aiPersonas.statusLabel");

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PERSONA_STATUS_STYLE[status]}`}
        >
            {t(STATUS_KEY[status])}
        </span>
    );
};

export default PersonaStatusBadge;
