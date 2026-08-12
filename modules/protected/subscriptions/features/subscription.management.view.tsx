"use client";

import React from "react";
import { Award, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserFilterProvider } from "@/modules/protected/users/providers/user.filter.provider";
import { UserDetailProvider } from "@/modules/protected/users/providers/user.detail.provider";
import { SubscriptionModalProvider } from "../providers/subscription.modal.provider";
import { SubscriptionPlansGrid } from "./subscription.plans.grid";
import { UserSubscriptionTableContent } from "./user.subscription.table.content";
import { SubscriptionUpgradeModal } from "../components/subscription.upgrade.modal";

export default function SubscriptionManagementView() {
    const t = useTranslations("subscriptionManagement");

    return (
        <SubscriptionModalProvider>
            <UserFilterProvider>
                <UserDetailProvider>
                    <div className="flex flex-col gap-8 p-6">
                        {/* Header */}
                        <div className="flex flex-col gap-1 bg-white p-4 rounded-xl dark:bg-gray-900">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                                    <Award className="h-4 w-4" />
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                    {t("pageTitle")}
                                </h1>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {t("pageSubtitle")}
                            </p>
                        </div>

                        {/* Subscription Plans Grid */}
                        <div className="space-y-3">
                            <div className="flex flex-col gap-0.5">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {t("overviewTitle")}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    {t("overviewSubtitle")}
                                </p>
                            </div>
                            <SubscriptionPlansGrid />
                        </div>

                        {/* User Management Table with Subscriptions */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-pink-500" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {t("userTableTitle")}
                                </h2>
                            </div>
                            <UserSubscriptionTableContent />
                        </div>

                        {/* Upgrade Modal */}
                        <SubscriptionUpgradeModal />
                    </div>
                </UserDetailProvider>
            </UserFilterProvider>
        </SubscriptionModalProvider>
    );
}
