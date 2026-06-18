export const queryKeys = {
    userManagement: {
        list: (params: string) => ["user-management", "list", params] as const,
        detail: (id: number) => ["user-management", "detail", id] as const,
        roles: ["user-management", "roles"] as const,
    },
    userReports: {
        list: ["user-reports", "list"] as const,
    },
    systemNotifications: {
        logs: ["system-notifications", "logs"] as const,
        streakConfig: ["system-notifications", "streak-config"] as const,
    },
    aiPersonas: {
        list: ["ai-personas", "list"] as const,
    },
    customQuestions: {
        list: (params: string) => ["custom-questions", "list", params] as const,
        detail: (id: string) => ["custom-questions", "detail", id] as const,
        pendingCount: ["custom-questions", "pending-count"] as const,
        topicOptions: ["custom-questions", "topic-options"] as const,
    },
};
