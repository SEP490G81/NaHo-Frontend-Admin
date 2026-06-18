import React from "react";
import { useTranslations } from "next-intl";
import { SuggestedLevel } from "@/types/enums/persona.enum";
import { LEVEL_STYLE } from "../constants/ai.personas.constant";

const PersonaLevelBadge = ({ level }: { level: SuggestedLevel }) => {
    const t = useTranslations("aiPersonas");

    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLE}`}
        >
            {level === "ALL" ? t("levelAll") : `JLPT ${level}`}
        </span>
    );
};

export default PersonaLevelBadge;
