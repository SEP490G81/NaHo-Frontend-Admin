import { FormalityLevel } from "@/types/enums/persona.enum";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";
import { PersonaResponse } from "@/types/responses/persona.response";
import { PersonaFormValues } from "../types/persona.form.type";
import { PersonaStyleOption } from "../types/persona.grid.type";

const EMPTY_FORM: PersonaFormValues = {
    name: "",
    prompt: "",
    avatarFileId: "",
    styleMode: "EXISTING",
    suggestedConversationStyleId: "",
    styleDescription: "",
    stylePrompt: "",
    styleFormalityLevel: FormalityLevel.NEUTRAL,
    styleMarugotoLevel: "",
};

/**
 * Dựng giá trị khởi tạo cho form: nhân vật cũ thì đổ dữ liệu hiện có, nhân vật
 * mới thì chọn sẵn phong cách đầu tiên trong danh sách gợi ý.
 */
export function buildInitialFormValues(
    persona: PersonaResponse | null,
    styleOptions: PersonaStyleOption[],
): PersonaFormValues {
    if (!persona) {
        return {
            ...EMPTY_FORM,
            suggestedConversationStyleId: styleOptions[0]
                ? String(styleOptions[0].style.id)
                : "",
        };
    }

    const style = persona.conversationStyle;

    return {
        name: persona.name,
        prompt: persona.prompt,
        avatarFileId: persona.avatarFileId ? String(persona.avatarFileId) : "",
        styleMode: "EXISTING",
        suggestedConversationStyleId: style?.id
            ? String(style.id)
            : (persona.suggestedConversationStyleId?.toString() ?? ""),
        styleDescription: style?.description ?? "",
        stylePrompt: style?.prompt ?? "",
        styleFormalityLevel: style?.formalityLevel ?? FormalityLevel.NEUTRAL,
        styleMarugotoLevel: style?.marugotoLevel ?? "",
    };
}

function toNullableNumber(value: string): number | null {
    const trimmed = value.trim();
    return trimmed ? Number(trimmed) : null;
}

function buildStylePayload(values: PersonaFormValues) {
    return {
        description: values.styleDescription.trim() || null,
        prompt: values.stylePrompt.trim(),
        formalityLevel: values.styleFormalityLevel,
        marugotoLevel: values.styleMarugotoLevel || null,
    };
}

export function buildCreateRequest(
    values: PersonaFormValues,
): CreatePersonaRequest {
    const isCustomStyle: boolean = values.styleMode === "CUSTOM";

    return {
        name: values.name.trim(),
        prompt: values.prompt.trim(),
        avatarFileId: toNullableNumber(values.avatarFileId),
        suggestedConversationStyleId: isCustomStyle
            ? null
            : toNullableNumber(values.suggestedConversationStyleId),
        conversationStyle: isCustomStyle ? buildStylePayload(values) : null,
    };
}

/**
 * @param editingStyleId phong cách đang gắn với nhân vật - gửi kèm để BE ghi đè
 * đúng bản ghi thay vì đoán theo phong cách hiện tại.
 */
export function buildUpdateRequest(
    values: PersonaFormValues,
    editingStyleId: number | null,
): UpdatePersonaRequest {
    const isCustomStyle: boolean = values.styleMode === "CUSTOM";

    return {
        name: values.name.trim(),
        prompt: values.prompt.trim(),
        avatarFileId: toNullableNumber(values.avatarFileId),
        suggestedConversationStyleId: toNullableNumber(
            values.suggestedConversationStyleId,
        ),
        conversationStyle: isCustomStyle
            ? { id: editingStyleId, ...buildStylePayload(values) }
            : null,
    };
}
