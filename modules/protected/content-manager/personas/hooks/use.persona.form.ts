"use client";

import { useCallback, useState } from "react";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    PersonaFormErrors,
    PersonaFormField,
    PersonaFormValues,
} from "../types/persona.form.type";
import { buildInitialFormValues } from "../utils/persona.form.util";
import { validatePersonaForm } from "../utils/persona.validator";

/**
 * State của form thêm/sửa nhân vật. Component cha luôn remount form theo `key`
 * nên state khởi tạo thẳng từ prop, không cần effect đồng bộ.
 */
export function usePersonaForm(persona: PersonaResponse | null) {
    const [values, setValues] = useState<PersonaFormValues>(() =>
        buildInitialFormValues(persona),
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

    const validate = useCallback(
        (takenNames: string[]) => {
            const nextErrors = validatePersonaForm(values, takenNames);
            setErrors(nextErrors);
            return Object.keys(nextErrors).length === 0;
        },
        [values],
    );

    return { values, errors, setField, validate };
}

export type PersonaFormState = ReturnType<typeof usePersonaForm>;
