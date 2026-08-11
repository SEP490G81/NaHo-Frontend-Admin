"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserLearningProgressClient } from "@/services/client/user.learning.progress.service";
import { UserLearningProgressResponse } from "@/types/responses/user.response";

/**
 * Hook to fetch user learning progress by userId.
 * Gracefully returns null if the progress is not found (404),
 * which indicates the user hasn't started learning yet.
 */
export function useUserLearningProgress(userId: number | null) {
    return useQuery<UserLearningProgressResponse | null>({
        queryKey: ["user-learning-progress", userId],
        queryFn: async () => {
            if (!userId) return null;
            try {
                return await getUserLearningProgressClient(userId);
            } catch (error: unknown) {
                const err = error as { status?: number; message?: string };
                // Return null if backend returns 404 (indicating no progress yet)
                if (err?.status === 404 || err?.message?.includes("404")) {
                    return null;
                }
                throw error;
            }
        },
        enabled: !!userId,
    });
}
