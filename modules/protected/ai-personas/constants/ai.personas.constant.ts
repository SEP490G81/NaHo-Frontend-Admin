import { JlptLevel } from "@/types/enums/user.enum";
import {
    AzureVoice,
    PersonaStatus,
    PolitenessStyle,
    SpeakingRate,
} from "@/types/enums/persona.enum";

/** JLPT levels offered in the target-level dropdown (easy → hard). */
export const JLPT_LEVELS: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export const POLITENESS_STYLES: PolitenessStyle[] = [
    "CASUAL",
    "BUSINESS",
    "KEIGO",
];

export const AZURE_VOICES: AzureVoice[] = [
    "NANAMI",
    "KEITA",
    "AOI",
    "DAICHI",
    "SHIORI",
    "MAYU",
];

export const SPEAKING_RATES: SpeakingRate[] = ["SLOW", "NORMAL", "FAST"];

/** i18n key suffix per politeness style (under aiPersonas.style). */
export const STYLE_KEY: Record<
    PolitenessStyle,
    "casual" | "business" | "keigo"
> = {
    CASUAL: "casual",
    BUSINESS: "business",
    KEIGO: "keigo",
};

/** i18n key suffix per Azure voice (under aiPersonas.voice). */
export const VOICE_KEY: Record<
    AzureVoice,
    "nanami" | "keita" | "aoi" | "daichi" | "shiori" | "mayu"
> = {
    NANAMI: "nanami",
    KEITA: "keita",
    AOI: "aoi",
    DAICHI: "daichi",
    SHIORI: "shiori",
    MAYU: "mayu",
};

/** i18n key suffix per speaking rate (under aiPersonas.rate). */
export const RATE_KEY: Record<SpeakingRate, "slow" | "normal" | "fast"> = {
    SLOW: "slow",
    NORMAL: "normal",
    FAST: "fast",
};

/** i18n key suffix per status (under aiPersonas.statusLabel). */
export const STATUS_KEY: Record<PersonaStatus, "active" | "draft"> = {
    ACTIVE: "active",
    DRAFT: "draft",
};

/** Tailwind classes for the JLPT level chip. */
export const PERSONA_LEVEL_STYLE: Record<JlptLevel, string> = {
    N1: "bg-rose-100 text-rose-700",
    N2: "bg-rose-100 text-rose-700",
    N3: "bg-rose-100 text-rose-700",
    N4: "bg-rose-100 text-rose-700",
    N5: "bg-rose-100 text-rose-700",
};

/** Tailwind classes for the politeness-style chip. */
export const POLITENESS_STYLE_STYLE: Record<PolitenessStyle, string> = {
    CASUAL: "bg-sky-100 text-sky-700",
    BUSINESS: "bg-amber-100 text-amber-700",
    KEIGO: "bg-violet-100 text-violet-700",
};

/** Tailwind classes for the status chip. */
export const PERSONA_STATUS_STYLE: Record<PersonaStatus, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    DRAFT: "bg-slate-200 text-slate-600",
};

/** Avatar gradient palette; pick deterministically by persona id/name. */
export const AVATAR_GRADIENTS = [
    "from-rose-400 to-pink-500",
    "from-sky-400 to-indigo-500",
    "from-amber-400 to-orange-500",
    "from-violet-400 to-purple-500",
    "from-emerald-400 to-teal-500",
    "from-fuchsia-400 to-rose-500",
];

/** Emoji presets offered as avatars (no upload needed). "" = chữ viết tắt. */
export const AVATAR_PRESETS = [
    "🌸",
    "👩‍🏫",
    "🧑‍💻",
    "👔",
    "💼",
    "🎌",
    "🧑‍🎓",
    "🗾",
    "🎤",
    "🍣",
];

/** Max length for the Persona Prompt textarea. */
export const PERSONA_PROMPT_MAX = 2000;
