"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchPersonasClient } from "@/services/client/persona.service";
import { ApiResponse } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";

export function usePersonaQuery() {
    return useQuery<ApiResponse<PersonaResponse[]>>({
        queryKey: [...queryKeys.personas.all],
        queryFn: async () => {
            return fetchPersonasClient();
        },
    });
}
