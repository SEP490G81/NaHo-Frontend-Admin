import { PersonaResponse } from "@/types/responses/persona.response";
import { PERSONA_AVATAR_GRADIENTS } from "../constants/persona.constants";
import { PersonaStyleOption } from "../types/persona.grid.type";

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

/**
 * Gom danh sách phong cách hội thoại từ các nhân vật đang có (BE chưa cung cấp
 * API liệt kê phong cách), kèm số nhân vật đang dùng chung để cảnh báo khi sửa.
 */
export function collectStyleOptions(
    personas: PersonaResponse[],
): PersonaStyleOption[] {
    const optionMap = new Map<number, PersonaStyleOption>();

    personas.forEach((persona) => {
        const style = persona.conversationStyle;
        if (!style?.id) return;

        const existing = optionMap.get(style.id);
        if (existing) {
            existing.usageCount += 1;
            return;
        }
        optionMap.set(style.id, { style, usageCount: 1 });
    });

    return [...optionMap.values()].sort((a, b) => a.style.id - b.style.id);
}

/** Số nhân vật KHÁC đang dùng chung phong cách của nhân vật đang sửa. */
export function countOtherPersonasUsingStyle(
    personas: PersonaResponse[],
    styleId: number | null | undefined,
    currentPersonaId: number | null | undefined,
): number {
    if (!styleId) return 0;
    return personas.filter(
        (persona) =>
            persona.conversationStyle?.id === styleId &&
            persona.id !== currentPersonaId,
    ).length;
}

/** Rút gọn prompt cho phần xem trước trên thẻ nhân vật. */
export function truncatePrompt(prompt: string, maxLength = 180): string {
    if (prompt.length <= maxLength) return prompt;
    return `${prompt.slice(0, maxLength).trimEnd()}…`;
}
