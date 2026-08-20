"use client";

import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { PersonaResponse } from "@/types/responses/persona.response";
import { PersonaFormState, usePersonaForm } from "../hooks/use.persona.form";
import { PersonaStyleOption } from "../types/persona.grid.type";
import { countOtherPersonasUsingStyle } from "../utils/persona.format.util";

interface PersonaFormContextValue extends PersonaFormState {
    styleOptions: PersonaStyleOption[];
    isEditing: boolean;
    /** Số nhân vật KHÁC dùng chung phong cách đang sửa (cảnh báo ghi đè). */
    sharedStyleUsageCount: number;
    /** Tên các nhân vật khác (lowercase) - BE ràng buộc tên là duy nhất. */
    takenNames: string[];
}

const PersonaFormContext = createContext<PersonaFormContextValue | null>(null);

export function usePersonaFormContext(): PersonaFormContextValue {
    const ctx = useContext(PersonaFormContext);
    if (!ctx) {
        throw new Error(
            "usePersonaFormContext must be used within <PersonaFormProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly persona: PersonaResponse | null;
    readonly personas: PersonaResponse[];
    readonly styleOptions: PersonaStyleOption[];
    readonly children: ReactNode;
}

export function PersonaFormProvider({
    persona,
    personas,
    styleOptions,
    children,
}: Props) {
    const formState = usePersonaForm(persona, styleOptions);

    const sharedStyleUsageCount = useMemo(
        () =>
            countOtherPersonasUsingStyle(
                personas,
                Number(formState.values.suggestedConversationStyleId) || null,
                persona?.id ?? null,
            ),
        [personas, formState.values.suggestedConversationStyleId, persona?.id],
    );

    const takenNames = useMemo(
        () =>
            personas
                .filter((item) => item.id !== persona?.id)
                .map((item) => item.name.trim().toLowerCase()),
        [personas, persona?.id],
    );

    const value = useMemo<PersonaFormContextValue>(
        () => ({
            ...formState,
            styleOptions,
            isEditing: Boolean(persona),
            sharedStyleUsageCount,
            takenNames,
        }),
        [formState, styleOptions, persona, sharedStyleUsageCount, takenNames],
    );

    return (
        <PersonaFormContext.Provider value={value}>
            {children}
        </PersonaFormContext.Provider>
    );
}
