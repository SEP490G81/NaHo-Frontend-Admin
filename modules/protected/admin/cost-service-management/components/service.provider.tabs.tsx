"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PROVIDER_TABS } from "../constants/cost.service.constants";
import { ServiceProviderTab } from "../types/azure.cost.type";
import azureLogo from "../assets/azure.png";
import awsLogo from "../assets/aws.webp";
import openAiLogo from "../assets/openAI.jpg";

interface ServiceProviderTabsProps {
    readonly activeTab: ServiceProviderTab;
    readonly onTabChange: (tab: ServiceProviderTab) => void;
}

export function ServiceProviderTabs({
    activeTab,
    onTabChange,
}: ServiceProviderTabsProps) {
    const t = useTranslations("costServiceManagement");

    const getIcon = (id: ServiceProviderTab) => {
        switch (id) {
            case "azure":
                return (
                    <Image
                        src={azureLogo}
                        alt="Azure Logo"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                    />
                );
            case "openai":
                return (
                    <Image
                        src={openAiLogo}
                        alt="OpenAI Logo"
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-lg object-contain"
                    />
                );
            case "aws":
                return (
                    <Image
                        src={awsLogo}
                        alt="AWS Logo"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                    />
                );
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-[var(--color-bdc-primary)] pb-3">
            {PROVIDER_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const isEnabled = tab.enabled;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => isEnabled && onTabChange(tab.id)}
                        disabled={!isEnabled}
                        className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-200 ${isActive
                            ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-500/25 scale-[1.02]"
                            : isEnabled
                                ? "bg-[var(--color-bgc-app)] text-gray-700 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-pink-400"
                                : "cursor-not-allowed bg-gray-100/60 text-gray-400 opacity-60 dark:bg-gray-800/40 dark:text-gray-600"
                            }`}
                    >
                        {getIcon(tab.id)}
                        <span>{t(tab.labelKey)}</span>
                        {!isEnabled && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-700 uppercase dark:bg-amber-950/80 dark:text-amber-300">
                                Sắp có
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
