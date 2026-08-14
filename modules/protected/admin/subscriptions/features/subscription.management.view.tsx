"use client";

import React from "react";
import { Award } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { SubscriptionPlansGrid } from "./subscription.plans.grid";
import { SubscriptionModalProvider } from "../providers/subscription.modal.provider";

export default function SubscriptionManagementView() {
    const t = useTranslations("subscriptionManagement");

    return (
        <SubscriptionModalProvider>
            <div className="flex w-full flex-col gap-y-4">
                {/* Header */}
                <ContainerBox>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-8 w-8 items-center justify-center rounded-xl font-bold">
                                <Award className="h-4 w-4" />
                            </div>
                            <h1 className="text-text-contrast text-2xl font-bold">
                                {t("pageTitle")}
                            </h1>
                        </div>
                        <p className="text-text-muted mt-1 text-xs">
                            {t("pageSubtitle")}
                        </p>
                    </div>
                </ContainerBox>

                {/* Subscription Plans Grid */}
                <div className="space-y-3">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-text-contrast text-lg font-bold">
                            {t("overviewTitle")}
                        </h2>
                        <p className="text-text-muted text-xs">
                            {t("overviewSubtitle")}
                        </p>
                    </div>
                    <SubscriptionPlansGrid />
                </div>
            </div>
        </SubscriptionModalProvider>
    );
}

