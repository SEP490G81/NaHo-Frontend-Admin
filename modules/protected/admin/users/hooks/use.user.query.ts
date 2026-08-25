"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { useUserFilter } from "@/modules/protected/admin/users/providers/user.filter.provider";
import { ApiResponse } from "@/types/responses/base.response";
import { UserResponse } from "@/types/responses/user.response";
import { UserQueryRequest } from "@/types/requests/user.query.request";
import { Gender, UserStatus } from "@/types/enums/user.enum";
import { fetchAllUsersClient } from "@/services/client/user.service";

/**
 * Client-side hook: gọi Next.js proxy `/api/users/all` (POST)
 * với filter state từ context.
 */
export function useUserQuery() {
    const { filter } = useUserFilter();

    return useQuery<ApiResponse<UserResponse[]>>({
        queryKey: [...queryKeys.users.all, filter],
        queryFn: async () => {
            const body: UserQueryRequest = {
                page: filter.page,
                size: filter.size,
                sortColumn: filter.sortColumn,
                sortDirection: filter.sortDirection,
                searchKeyword: filter.searchKeyword || undefined,
                gender: (filter.gender as Gender) || undefined,
                status: (filter.status as UserStatus) || undefined,
                isEmailVerified: filter.isEmailVerified ?? undefined,
                roleId: filter.roleId ?? undefined,
                dobFrom: filter.dobFrom || undefined,
                dobTo: filter.dobTo || undefined,
            };

            return fetchAllUsersClient(body);
        },
    });
}
