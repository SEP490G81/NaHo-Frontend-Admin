"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { UserFilterProvider } from "@/modules/protected/admin/users/providers/user.filter.provider";
import { UserDetailProvider } from "@/modules/protected/admin/users/providers/user.detail.provider";
import UserSearchBox from "@/modules/protected/admin/users/components/user.search.box";
import UserTableContent from "@/modules/protected/admin/users/features/user.table.content";
import UserDetailModalWrapper from "@/modules/protected/admin/users/features/user.detail.modal.wrapper";
import ScrollToTopButton from "@/modules/protected/admin/users/components/scroll.to.top.button";

export default function UserManagementView() {
    const t = useTranslations("userManagement");

    return (
        <UserFilterProvider>
            <UserDetailProvider>
                <div className="flex w-full flex-col gap-y-4">
                    {/* Search / Filter Box (includes page title) */}
                    <ContainerBox>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-text-contrast text-2xl font-bold">
                                {t("pageTitle")}
                            </h1>
                            <UserSearchBox />
                        </div>
                    </ContainerBox>

                    {/* Table + Pagination */}
                    <ContainerBox>
                        <UserTableContent />
                    </ContainerBox>

                    {/* Back to top floating button */}
                    <ScrollToTopButton />

                    {/* User Detail Modal */}
                    <UserDetailModalWrapper />
                </div>
            </UserDetailProvider>
        </UserFilterProvider>
    );
}
