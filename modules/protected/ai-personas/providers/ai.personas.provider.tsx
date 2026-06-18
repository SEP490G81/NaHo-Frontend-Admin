"use client";
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createPersona as createPersonaService,
    deletePersona as deletePersonaService,
    fetchPersonas,
    fetchTopicOptions,
    updatePersona as updatePersonaService,
} from "@/services/client/persona.service";
import { queryKeys } from "@/libs/query.keys";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";
import { AiPersonasContextType } from "../types/ai.personas.type";

const AiPersonasContext = createContext<AiPersonasContextType | null>(null);

const AiPersonasProvider = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("aiPersonas");
    const tForm = useTranslations("aiPersonas.form");
    const tDelete = useTranslations("aiPersonas.delete");
    const queryClient = useQueryClient();

    const [editingPersona, setEditingPersona] =
        useState<PersonaResponse | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deletingPersona, setDeletingPersona] =
        useState<PersonaResponse | null>(null);

    const personasQuery = useQuery({
        queryKey: queryKeys.aiPersonas.list,
        queryFn: fetchPersonas,
    });

    const topicsQuery = useQuery({
        queryKey: queryKeys.aiPersonas.topics,
        queryFn: fetchTopicOptions,
    });

    useEffect(() => {
        if (personasQuery.isError) toast.error(t("loadError"));
    }, [personasQuery.isError, t]);

    const createMutation = useMutation({
        mutationFn: (request: CreatePersonaRequest) =>
            createPersonaService(request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.aiPersonas.list,
            });
            toast.success(tForm("createSuccess"));
        },
        onError: (error) =>
            toast.error(
                error instanceof Error ? error.message : tForm("saveError"),
            ),
    });

    const updateMutation = useMutation({
        mutationFn: (request: UpdatePersonaRequest) =>
            updatePersonaService(request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.aiPersonas.list,
            });
            toast.success(tForm("updateSuccess"));
        },
        onError: (error) =>
            toast.error(
                error instanceof Error ? error.message : tForm("saveError"),
            ),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deletePersonaService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.aiPersonas.list,
            });
            toast.success(tDelete("success"));
        },
        onError: () => toast.error(tDelete("error")),
    });

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
            try {
                await createMutation.mutateAsync(request);
                return true;
            } catch {
                return false;
            }
        },
        [createMutation],
    );

    const updatePersona = useCallback(
        async (request: UpdatePersonaRequest): Promise<boolean> => {
            try {
                await updateMutation.mutateAsync(request);
                return true;
            } catch {
                return false;
            }
        },
        [updateMutation],
    );

    const deletePersona = useCallback(async (): Promise<void> => {
        if (!deletingPersona) return;
        await deleteMutation.mutateAsync(deletingPersona.id);
        setDeletingPersona(null);
    }, [deletingPersona, deleteMutation]);

    const value = useMemo<AiPersonasContextType>(
        () => ({
            personas: personasQuery.data ?? [],
            topicOptions: topicsQuery.data ?? [],
            isLoading: personasQuery.isLoading,
            isSaving: createMutation.isPending || updateMutation.isPending,
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
            personasQuery.data,
            topicsQuery.data,
            personasQuery.isLoading,
            createMutation.isPending,
            updateMutation.isPending,
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
