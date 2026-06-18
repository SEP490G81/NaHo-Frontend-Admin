export const queryKeys = {
    userManagement: {
        list: (params: string) => ["user-management", "list", params] as const,
        detail: (id: number) => ["user-management", "detail", id] as const,
        roles: ["user-management", "roles"] as const,
    },
    userReports: {
        list: ["user-reports", "list"] as const,
    },
};
