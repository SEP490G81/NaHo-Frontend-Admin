"use client";

import React from "react";
import { useUserQuery } from "@/modules/protected/users/hooks/use.user.query";
import { useUserFilter } from "@/modules/protected/users/providers/user.filter.provider";
import UserTable from "@/modules/protected/users/components/user.table";
import UserTablePagination from "@/modules/protected/users/components/user.table.pagination";

/**
 * Tách phần gọi API ra component con để hook useUserQuery
 * nằm bên trong UserFilterProvider.
 */
export default function UserTableContent() {
    const { filter } = useUserFilter();
    const { data, isLoading } = useUserQuery();

    const users = data?.data ?? [];
    const pageMeta = data?.meta?.pageMeta;
    const pageOffset = filter.page * filter.size;

    return (
        <div className="flex flex-col gap-4">
            <UserTable
                users={users}
                pageOffset={pageOffset}
                isLoading={isLoading}
            />
            <UserTablePagination pageMeta={pageMeta} />
        </div>
    );
}
