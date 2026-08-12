"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import {
    fetchSubscriptionPlansClient,
    fetchUserSubscriptionClient,
} from "@/services/client/subscription.service";

export function useSubscriptionPlansQuery() {
    return useQuery({
        queryKey: [...queryKeys.subscriptions.plans],
        queryFn: async () => {
            return fetchSubscriptionPlansClient();
        },
    });
}

export function useUserSubscriptionQuery(userId: number | null) {
    return useQuery({
        queryKey: userId ? queryKeys.subscriptions.user(userId) : ["disabled"],
        enabled: Boolean(userId && userId > 0),
        queryFn: async () => {
            if (!userId) return null;
            return fetchUserSubscriptionClient(userId);
        },
    });
}
