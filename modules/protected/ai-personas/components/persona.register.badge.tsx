import React from "react";
import { useTranslations } from "next-intl";
import { ConversationRegister } from "@/types/enums/persona.enum";
import {
    REGISTER_KEY,
    REGISTER_STYLE,
} from "../constants/ai.personas.constant";

const PersonaRegisterBadge = ({
    register,
}: {
    register: ConversationRegister;
}) => {
    const t = useTranslations("aiPersonas.register");

    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${REGISTER_STYLE[register]}`}
        >
            {t(REGISTER_KEY[register])}
        </span>
    );
};

export default PersonaRegisterBadge;
