"use client";

import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { PersonaResponse } from "@/types/responses/persona.response";
import { PersonaFormState, usePersonaForm } from "../hooks/use.persona.form";

interface PersonaFormContextValue extends PersonaFormState {
    isEditing: boolean;
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
    readonly children: ReactNode;
}

export function PersonaFormProvider({ persona, personas, children }: Props) {
    const formState = usePersonaForm(persona);

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
            isEditing: Boolean(persona),
            takenNames,
        }),
        [formState, persona, takenNames],
    );

    return (
        <PersonaFormContext.Provider value={value}>
            {children}
        </PersonaFormContext.Provider>
    );
}
