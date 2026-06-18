import { AVATAR_GRADIENTS } from "../constants/ai.personas.constant";

/** First two uppercase letters of the name, e.g. "Sakura" → "SA". */
export const getPersonaInitials = (name: string): string => {
    const trimmed = name.trim();
    if (!trimmed) return "AI";
    return trimmed.slice(0, 2).toUpperCase();
};

/** Stable gradient pick so a persona keeps the same avatar color. */
export const getAvatarGradient = (seed: string): string => {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
    return AVATAR_GRADIENTS[index];
};
