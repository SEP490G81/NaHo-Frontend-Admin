import {
    AzureVoice,
    ConversationRegister,
    PersonaStatus,
    SuggestedLevel,
} from "@/types/enums/persona.enum";

/** Trình độ gợi ý trong dropdown (dễ → khó), kèm "ALL" = mọi trình độ. */
export const SUGGESTED_LEVELS: SuggestedLevel[] = [
    "ALL",
    "N5",
    "N4",
    "N3",
    "N2",
    "N1",
];

export const CONVERSATION_REGISTERS: ConversationRegister[] = [
    "CASUAL",
    "OFFICE",
    "INTERVIEW",
];

export const AZURE_VOICES: AzureVoice[] = [
    "NANAMI",
    "KEITA",
    "AOI",
    "DAICHI",
    "SHIORI",
    "MAYU",
];

/** i18n key suffix per register (under aiPersonas.register). */
export const REGISTER_KEY: Record<
    ConversationRegister,
    "casual" | "office" | "interview"
> = {
    CASUAL: "casual",
    OFFICE: "office",
    INTERVIEW: "interview",
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

/** i18n key suffix per status (under aiPersonas.statusLabel). */
export const STATUS_KEY: Record<PersonaStatus, "active" | "draft"> = {
    ACTIVE: "active",
    DRAFT: "draft",
};

/** Tailwind classes for the suggested-level chip. */
export const LEVEL_STYLE = "bg-rose-100 text-rose-700";

/** Tailwind classes for the register chip, keyed by register. */
export const REGISTER_STYLE: Record<ConversationRegister, string> = {
    CASUAL: "bg-sky-100 text-sky-700",
    OFFICE: "bg-amber-100 text-amber-700",
    INTERVIEW: "bg-violet-100 text-violet-700",
};

/** Tailwind classes for the status chip. */
export const PERSONA_STATUS_STYLE: Record<PersonaStatus, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    DRAFT: "bg-slate-200 text-slate-600",
};

/** Avatar gradient palette for the initials fallback (no image uploaded). */
export const AVATAR_GRADIENTS = [
    "from-rose-400 to-pink-500",
    "from-sky-400 to-indigo-500",
    "from-amber-400 to-orange-500",
    "from-violet-400 to-purple-500",
    "from-emerald-400 to-teal-500",
    "from-fuchsia-400 to-rose-500",
];

/** Max length for the System Prompt textarea. */
export const SYSTEM_PROMPT_MAX = 2000;

/** Avatar upload limits (mock; maps to files table when S3 is wired). */
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
export const AVATAR_ACCEPT = ["image/png", "image/jpeg"];
