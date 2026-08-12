"use client";

import React from "react";
import { useUserQuery } from "@/modules/protected/users/hooks/use.user.query";
import { useUserFilter } from "@/modules/protected/users/providers/user.filter.provider";
import UserSearchBox from "@/modules/protected/users/components/user.search.box";
import UserTablePagination from "@/modules/protected/users/components/user.table.pagination";
import UserDetailModalWrapper from "@/modules/protected/users/features/user.detail.modal.wrapper";
import { UserSubscriptionTable } from "../components/user.subscription.table";

export function UserSubscriptionTableContent() {
    const { filter } = useUserFilter();
    const { data, isLoading } = useUserQuery();

    const users = data?.data ?? [];
    const pageMeta = data?.meta?.pageMeta;
    const pageOffset = filter.page * filter.size;

    return (
        <div className="flex flex-col gap-5">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800">                <UserSearchBox />
            </div>
            <UserSubscriptionTable
                users={users}
                pageOffset={pageOffset}
                isLoading={isLoading}
            />
            <UserTablePagination pageMeta={pageMeta} />
            <UserDetailModalWrapper />
        </div>
    );
}
