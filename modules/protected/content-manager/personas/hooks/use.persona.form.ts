"use client";

import { useCallback, useState } from "react";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    PersonaFormErrors,
    PersonaFormField,
    PersonaFormValues,
} from "../types/persona.form.type";
import { PersonaStyleOption } from "../types/persona.grid.type";
import { buildInitialFormValues } from "../utils/persona.form.util";
import { validatePersonaForm } from "../utils/persona.validator";

/**
 * State của form thêm/sửa nhân vật. Component cha luôn remount form theo `key`
 * nên state khởi tạo thẳng từ prop, không cần effect đồng bộ.
 */
export function usePersonaForm(
    persona: PersonaResponse | null,
    styleOptions: PersonaStyleOption[],
) {
    const [values, setValues] = useState<PersonaFormValues>(() =>
        buildInitialFormValues(persona, styleOptions),
    );
    const [errors, setErrors] = useState<PersonaFormErrors>({});

    const setField = useCallback(
        <K extends PersonaFormField>(field: K, value: PersonaFormValues[K]) => {
            setValues((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => {
                if (!prev[field]) return prev;
                const next = { ...prev };
                delete next[field];
                return next;
            });
        },
        [],
    );

    /** Chọn phong cách có sẵn: đổ luôn nội dung để xem trước và sửa nếu cần. */
    const selectExistingStyle = useCallback(
        (styleId: string) => {
            const option = styleOptions.find(
                (item) => String(item.style.id) === styleId,
            );

            setValues((prev) => ({
                ...prev,
                suggestedConversationStyleId: styleId,
                styleDescription: option?.style.description ?? "",
                stylePrompt: option?.style.prompt ?? "",
                styleFormalityLevel:
                    option?.style.formalityLevel ?? prev.styleFormalityLevel,
                styleMarugotoLevel: option?.style.marugotoLevel ?? "",
            }));
            setErrors((prev) => ({
                ...prev,
                suggestedConversationStyleId: undefined,
            }));
        },
        [styleOptions],
    );

    /** @param takenNames tên các nhân vật khác đã lowercase (BE yêu cầu unique). */
    const validate = useCallback(
        (takenNames: string[]) => {
            const nextErrors = validatePersonaForm(values, takenNames);
            setErrors(nextErrors);
            return Object.keys(nextErrors).length === 0;
        },
        [values],
    );

    return { values, errors, setField, selectExistingStyle, validate };
}

export type PersonaFormState = ReturnType<typeof usePersonaForm>;
