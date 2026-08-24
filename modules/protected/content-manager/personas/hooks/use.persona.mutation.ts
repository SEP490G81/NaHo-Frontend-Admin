"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import {
    createPersonaClient,
    updatePersonaClient,
} from "@/services/client/persona.service";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";

export function useCreatePersonaMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: CreatePersonaRequest) => {
            return createPersonaClient(body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...queryKeys.personas.all],
            });
        },
    });
}

export function useUpdatePersonaMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            personaId,
            body,
        }: {
            personaId: number;
            body: UpdatePersonaRequest;
        }) => {
            return updatePersonaClient(personaId, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...queryKeys.personas.all],
            });
        },
    });
}
