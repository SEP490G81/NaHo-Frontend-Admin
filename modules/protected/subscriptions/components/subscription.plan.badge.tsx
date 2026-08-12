"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface SubscriptionPlanBadgeProps {
    readonly planCode?: string;
}

export function SubscriptionPlanBadge({ planCode }: SubscriptionPlanBadgeProps) {
    const t = useTranslations("subscriptionManagement.plans");
    const code = (planCode || "FREE").toUpperCase();

    if (code === "PREMIUM") {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black border shadow-2xs bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700">
                {t("premium")}
            </span>
        );
    }

    if (code === "BASIC") {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black border shadow-2xs bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-700">
                {t("basic")}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black border shadow-2xs bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800">
            {t("free")}
        </span>
    );
}
