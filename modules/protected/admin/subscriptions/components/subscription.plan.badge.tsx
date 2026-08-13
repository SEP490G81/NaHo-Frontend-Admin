"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface SubscriptionPlanBadgeProps {
    readonly planCode?: string;
}

export function SubscriptionPlanBadge({
    planCode,
}: SubscriptionPlanBadgeProps) {
    const t = useTranslations("subscriptionManagement.plans");
    const code = (planCode || "FREE").toUpperCase();

    if (code === "PREMIUM") {
        return (
            <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-900 shadow-2xs dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300">
                {t("premium")}
            </span>
        );
    }

    if (code === "BASIC") {
        return (
            <span className="inline-flex items-center rounded-full border border-pink-300 bg-pink-100 px-2.5 py-0.5 text-xs font-black text-pink-700 shadow-2xs dark:border-pink-700 dark:bg-pink-950 dark:text-pink-300">
                {t("basic")}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-2.5 py-0.5 text-xs font-black text-sky-800 shadow-2xs dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300">
            {t("free")}
        </span>
    );
}
