import { PERSONA_AVATAR_GRADIENTS } from "../constants/persona.constants";

/** Lấy tối đa 2 chữ cái đầu của tên nhân vật để làm avatar chữ. */
export function getPersonaInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "AI";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

/** Dải màu avatar cố định theo id để không nhấp nháy giữa các lần render. */
export function getPersonaGradient(personaId: number): string {
    const index = Math.abs(personaId) % PERSONA_AVATAR_GRADIENTS.length;
    return PERSONA_AVATAR_GRADIENTS[index];
}

/** Rút gọn prompt cho phần xem trước trên thẻ nhân vật. */
export function truncatePrompt(prompt: string, maxLength = 180): string {
    if (prompt.length <= maxLength) return prompt;
    return `${prompt.slice(0, maxLength).trimEnd()}…`;
}
