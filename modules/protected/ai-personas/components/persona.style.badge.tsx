import React from "react";
import { useTranslations } from "next-intl";
import { PolitenessStyle } from "@/types/enums/persona.enum";
import {
    POLITENESS_STYLE_STYLE,
    STYLE_KEY,
} from "../constants/ai.personas.constant";

const PersonaStyleBadge = ({ style }: { style: PolitenessStyle }) => {
    const t = useTranslations("aiPersonas.style");

    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${POLITENESS_STYLE_STYLE[style]}`}
        >
            {t(STYLE_KEY[style])}
        </span>
    );
};

export default PersonaStyleBadge;
