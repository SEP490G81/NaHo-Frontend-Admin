"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import {
    upgradeUserSubscriptionClient,
    updateSubscriptionPlanClient,
} from "@/services/client/subscription.service";
import {
    UpgradeSubscriptionRequest,
    UpdateSubscriptionPlanRequest,
} from "@/types/requests/subscription.request";

export function useUpgradeSubscriptionMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpgradeSubscriptionRequest) => {
            return upgradeUserSubscriptionClient(body);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.subscriptions.user(variables.userId),
            });
            queryClient.invalidateQueries({
                queryKey: [...queryKeys.users.all],
            });
        },
    });
}

export function useUpdateSubscriptionPlanMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            body,
        }: {
            id: number;
            body: UpdateSubscriptionPlanRequest;
        }) => {
            return updateSubscriptionPlanClient(id, body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...queryKeys.subscriptions.plans],
            });
        },
    });
}

