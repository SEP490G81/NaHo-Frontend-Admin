"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    createPersona as createPersonaService,
    deletePersona as deletePersonaService,
    fetchPersonas,
    fetchTopicOptions,
    updatePersona as updatePersonaService,
} from "@/services/client/persona.service";
import { PersonaResponse } from "@/types/responses/persona.response";
import { TopicOption } from "@/app/api/_mock/topic.options.data";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";
import { AiPersonasContextType } from "../types/ai.personas.type";

const AiPersonasContext = createContext<AiPersonasContextType | null>(null);

const AiPersonasProvider = ({ children }: { children: React.ReactNode }) => {
    const t = useTranslations("aiPersonas");
    const tForm = useTranslations("aiPersonas.form");
    const tDelete = useTranslations("aiPersonas.delete");

    const [personas, setPersonas] = useState<PersonaResponse[]>([]);
    const [topicOptions, setTopicOptions] = useState<TopicOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [editingPersona, setEditingPersona] =
        useState<PersonaResponse | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deletingPersona, setDeletingPersona] =
        useState<PersonaResponse | null>(null);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchPersonas(), fetchTopicOptions()])
            .then(([personaResult, topicResult]) => {
                setPersonas(personaResult.data);
                setTopicOptions(topicResult.data);
            })
            .catch(() => toast.error(t("loadError")))
            .finally(() => setIsLoading(false));
    }, [t]);

    const openCreateForm = useCallback(() => {
        setEditingPersona(null);
        setIsFormOpen(true);
    }, []);

    const openEditForm = useCallback((persona: PersonaResponse) => {
        setEditingPersona(persona);
        setIsFormOpen(true);
    }, []);

    const closeForm = useCallback(() => {
        setIsFormOpen(false);
        setEditingPersona(null);
    }, []);

    const requestDelete = useCallback((persona: PersonaResponse) => {
        setDeletingPersona(persona);
    }, []);

    const cancelDelete = useCallback(() => {
        setDeletingPersona(null);
    }, []);

    const createPersona = useCallback(
        async (request: CreatePersonaRequest): Promise<boolean> => {
            setIsSaving(true);
            try {
                const result = await createPersonaService(request);
                setPersonas((prev) => [...prev, result.data]);
                toast.success(tForm("createSuccess"));
                return true;
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : tForm("saveError"),
                );
                return false;
            } finally {
                setIsSaving(false);
            }
        },
        [tForm],
    );

    const updatePersona = useCallback(
        async (request: UpdatePersonaRequest): Promise<boolean> => {
            setIsSaving(true);
            try {
                const result = await updatePersonaService(request);
                setPersonas((prev) =>
                    prev.map((p) => (p.id === result.data.id ? result.data : p)),
                );
                toast.success(tForm("updateSuccess"));
                return true;
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : tForm("saveError"),
                );
                return false;
            } finally {
                setIsSaving(false);
            }
        },
        [tForm],
    );

    const deletePersona = useCallback(async (): Promise<void> => {
        if (!deletingPersona) return;
        try {
            await deletePersonaService(deletingPersona.id);
            setPersonas((prev) =>
                prev.filter((p) => p.id !== deletingPersona.id),
            );
            toast.success(tDelete("success"));
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : tDelete("error"),
            );
        } finally {
            setDeletingPersona(null);
        }
    }, [deletingPersona, tDelete]);

    const value = useMemo<AiPersonasContextType>(
        () => ({
            personas,
            topicOptions,
            isLoading,
            isSaving,
            editingPersona,
            isFormOpen,
            deletingPersona,
            openCreateForm,
            openEditForm,
            closeForm,
            requestDelete,
            cancelDelete,
            createPersona,
            updatePersona,
            deletePersona,
        }),
        [
            personas,
            topicOptions,
            isLoading,
            isSaving,
            editingPersona,
            isFormOpen,
            deletingPersona,
            openCreateForm,
            openEditForm,
            closeForm,
            requestDelete,
            cancelDelete,
            createPersona,
            updatePersona,
            deletePersona,
        ],
    );

    return (
        <AiPersonasContext.Provider value={value}>
            {children}
        </AiPersonasContext.Provider>
    );
};

export { AiPersonasProvider };

export const useAiPersonas = (): AiPersonasContextType => {
    const ctx = useContext(AiPersonasContext);
    if (!ctx)
        throw new Error("useAiPersonas must be used within AiPersonasProvider");
    return ctx;
};
