import React from "react";
import { JlptLevel } from "@/types/enums/user.enum";
import { PERSONA_LEVEL_STYLE } from "../constants/ai.personas.constant";

const PersonaLevelBadge = ({ level }: { level: JlptLevel }) => {
    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${PERSONA_LEVEL_STYLE[level]}`}
        >
            JLPT {level}
        </span>
    );
};

export default PersonaLevelBadge;
