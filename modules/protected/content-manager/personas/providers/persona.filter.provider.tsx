"use client";

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { DEFAULT_PERSONA_FILTER } from "../constants/persona.constants";
import { PersonaFilterState } from "../types/persona.grid.type";

interface PersonaFilterContextValue {
    filter: PersonaFilterState;
    pendingKeyword: string;
    setPendingKeyword: (keyword: string) => void;
    setFormalityLevel: (value: string) => void;
    setStatus: (value: string) => void;
    applySearch: () => void;
    resetFilter: () => void;
}

const PersonaFilterContext = createContext<PersonaFilterContextValue | null>(
    null,
);

export function usePersonaFilter(): PersonaFilterContextValue {
    const ctx = useContext(PersonaFilterContext);
    if (!ctx) {
        throw new Error(
            "usePersonaFilter must be used within <PersonaFilterProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

export function PersonaFilterProvider({ children }: Props) {
    const [filter, setFilter] = useState<PersonaFilterState>(
        DEFAULT_PERSONA_FILTER,
    );
    const [pendingKeyword, setPendingKeyword] = useState("");

    const applySearch = useCallback(() => {
        setFilter((prev) => ({ ...prev, searchKeyword: pendingKeyword }));
    }, [pendingKeyword]);

    /** Đổi bộ lọc thì áp dụng luôn từ khóa đang gõ dở cho khớp kết quả. */
    const setFormalityLevel = useCallback(
        (formalityLevel: string) => {
            setFilter((prev) => ({
                ...prev,
                formalityLevel,
                searchKeyword: pendingKeyword,
            }));
        },
        [pendingKeyword],
    );

    const setStatus = useCallback(
        (status: string) => {
            setFilter((prev) => ({
                ...prev,
                status,
                searchKeyword: pendingKeyword,
            }));
        },
        [pendingKeyword],
    );

    const resetFilter = useCallback(() => {
        setFilter(DEFAULT_PERSONA_FILTER);
        setPendingKeyword("");
    }, []);

    const value = useMemo<PersonaFilterContextValue>(
        () => ({
            filter,
            pendingKeyword,
            setPendingKeyword,
            setFormalityLevel,
            setStatus,
            applySearch,
            resetFilter,
        }),
        [
            filter,
            pendingKeyword,
            applySearch,
            setFormalityLevel,
            setStatus,
            resetFilter,
        ],
    );

    return (
        <PersonaFilterContext.Provider value={value}>
            {children}
        </PersonaFilterContext.Provider>
    );
}
