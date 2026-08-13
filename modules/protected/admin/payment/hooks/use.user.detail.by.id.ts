"use client";

import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/types/responses/user.response";
import { ApiResponse } from "@/types/responses/base.response";

export function useUserDetailById(userId: number | null) {
    return useQuery<UserResponse | null>({
        queryKey: ["user-detail-by-id", userId],
        enabled: Boolean(userId),
        queryFn: async () => {
            if (!userId) return null;
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) return null;
            const json = await res.json();
            return (
                (json as ApiResponse<UserResponse>).data ??
                (json as UserResponse)
            );
        },
    });
}
