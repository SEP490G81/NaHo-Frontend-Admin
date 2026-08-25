"use client";

import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/types/responses/user.response";
import { fetchUserByIdClient } from "@/services/client/user.service";

export function useUserDetailById(userId: number | null) {
    return useQuery<UserResponse | null>({
        queryKey: ["user-detail-by-id", userId],
        enabled: Boolean(userId),
        queryFn: async () => {
            if (!userId) return null;
            return fetchUserByIdClient(userId);
        },
    });
}
