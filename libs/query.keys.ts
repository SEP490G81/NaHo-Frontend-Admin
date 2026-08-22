export const queryKeys = {
    auth: {
        currentUser: ["current-user"] as const,
    },
    users: {
        all: ["users-all"] as const,
    },
    payments: {
        all: ["payments-all"] as const,
    },
    reports: {
        all: ["reports-admin"] as const,
    },
    personas: {
        all: ["personas-all"] as const,
    },
    subscriptions: {
        plans: ["subscription-plans"] as const,
        user: (userId: number) => ["user-subscription", userId] as const,
    },
    azureCost: {
        summary: ["azure-cost-summary"] as const,
        chart: (params?: Record<string, unknown>) =>
            ["azure-cost-chart", params] as const,
    },
    awsCost: {
        summary: ["aws-cost-summary"] as const,
        chart: (params?: Record<string, unknown>) =>
            ["aws-cost-chart", params] as const,
    },
    openAiCost: {
        summary: ["openai-cost-summary"] as const,
        chart: (params?: Record<string, unknown>) =>
            ["openai-cost-chart", params] as const,
    },
};
