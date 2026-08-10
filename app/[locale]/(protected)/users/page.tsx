import React from "react";
import { getTranslations } from "next-intl/server";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchAllUsers } from "@/services/server/admin.user.service";
import { DEFAULT_FILTER } from "@/modules/protected/users/constants/user.table.constants";
import UserManagementView from "@/modules/protected/users/features/user.management.view";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("userManagement"),
    };
}

const UsersPage = async () => {
    // Prefetch default user list on the server
    const queryClient = new QueryClient();
    const defaultRequest = {
        page: DEFAULT_FILTER.page,
        size: DEFAULT_FILTER.size,
        sortColumn: DEFAULT_FILTER.sortColumn,
        sortDirection: DEFAULT_FILTER.sortDirection,
    };

    await queryClient.prefetchQuery({
        queryKey: [...queryKeys.users.all, DEFAULT_FILTER],
        queryFn: () => fetchAllUsers(defaultRequest),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <UserManagementView />
        </HydrationBoundary>
    );
};

export default UsersPage;

