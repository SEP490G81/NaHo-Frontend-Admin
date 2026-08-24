"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { PersonaResponse } from "@/types/responses/persona.response";

interface PersonaModalContextValue {
    isFormOpen: boolean;
    /** null = đang tạo mới, khác null = đang chỉnh sửa nhân vật này. */
    editingPersona: PersonaResponse | null;
    openCreateForm: () => void;
    openEditForm: (persona: PersonaResponse) => void;
    closeForm: () => void;
    detailPersona: PersonaResponse | null;
    openDetail: (persona: PersonaResponse) => void;
    closeDetail: () => void;
}

const PersonaModalContext = createContext<PersonaModalContextValue | null>(
    null,
);

export function usePersonaModal(): PersonaModalContextValue {
    const ctx = useContext(PersonaModalContext);
    if (!ctx) {
        throw new Error(
            "usePersonaModal must be used within <PersonaModalProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

export function PersonaModalProvider({ children }: Props) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPersona, setEditingPersona] =
        useState<PersonaResponse | null>(null);
    const [detailPersona, setDetailPersona] = useState<PersonaResponse | null>(
        null,
    );

    const openCreateForm = () => {
        setEditingPersona(null);
        setIsFormOpen(true);
    };

    const openEditForm = (persona: PersonaResponse) => {
        setEditingPersona(persona);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingPersona(null);
    };

    const openDetail = (persona: PersonaResponse) => setDetailPersona(persona);
    const closeDetail = () => setDetailPersona(null);

    return (
        <PersonaModalContext.Provider
            value={{
                isFormOpen,
                editingPersona,
                openCreateForm,
                openEditForm,
                closeForm,
                detailPersona,
                openDetail,
                closeDetail,
            }}
        >
            {children}
        </PersonaModalContext.Provider>
    );
}
