import {
    FormalityLevel,
    FormalityLevelFilter,
    MarugotoLevel,
} from "@/types/enums/persona.enum";
import { PersonaFilterState } from "../types/persona.grid.type";

export const DEFAULT_PERSONA_FILTER: PersonaFilterState = {
    searchKeyword: "",
    formalityLevel: FormalityLevelFilter.ALL,
};

export const FORMALITY_LEVEL_OPTIONS: FormalityLevel[] = [
    FormalityLevel.INFORMAL,
    FormalityLevel.NEUTRAL,
    FormalityLevel.FORMAL,
];

export const MARUGOTO_LEVEL_OPTIONS: MarugotoLevel[] = [
    MarugotoLevel.STARTER_A1,
    MarugotoLevel.ELEMENTARY_1_A2,
    MarugotoLevel.ELEMENTARY_2_A2,
    MarugotoLevel.PRE_INTERMEDIATE_A2_B1,
    MarugotoLevel.INTERMEDIATE_1_B1,
    MarugotoLevel.INTERMEDIATE_2_B1,
];

/** Màu nhãn theo mức trang trọng, dùng chung cho badge trên thẻ và modal. */
export const FORMALITY_LEVEL_CLASSES: Record<FormalityLevel, string> = {
    [FormalityLevel.INFORMAL]:
        "border-sky-300 bg-sky-100/90 text-sky-800 dark:border-sky-700 dark:bg-sky-950/80 dark:text-sky-300",
    [FormalityLevel.NEUTRAL]:
        "border-emerald-300 bg-emerald-100/90 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300",
    [FormalityLevel.FORMAL]:
        "border-violet-300 bg-violet-100/90 text-violet-800 dark:border-violet-700 dark:bg-violet-950/80 dark:text-violet-300",
};

/** Dải màu avatar chữ cái đầu, chọn theo id nhân vật cho ổn định giữa các lần render. */
export const PERSONA_AVATAR_GRADIENTS: string[] = [
    "from-rose-400 to-pink-500",
    "from-sky-400 to-indigo-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-purple-500",
    "from-cyan-400 to-blue-500",
];

export const PERSONA_NAME_MAX_LENGTH = 255;
export const PERSONA_PROMPT_MAX_LENGTH = 5000;
export const CONVERSATION_STYLE_PROMPT_MAX_LENGTH = 2000;
export const CONVERSATION_STYLE_DESCRIPTION_MAX_LENGTH = 512;
