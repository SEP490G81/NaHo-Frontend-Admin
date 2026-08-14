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
        <div className="border-bdc-primary flex flex-wrap items-center justify-start gap-3 border-b pb-3">
            {PROVIDER_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const isEnabled = tab.enabled;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => isEnabled && onTabChange(tab.id)}
                        disabled={!isEnabled}
                        className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                            isActive
                                ? "bg-bgc-highlight text-white shadow-sm"
                                : isEnabled
                                  ? "bg-bgc-app border-bdc-primary text-text-contrast hover:bg-hbgc-app border"
                                  : "bg-bgc-app/50 border-bdc-primary/50 text-text-muted cursor-not-allowed border opacity-60"
                        }`}
                    >
                        {getIcon(tab.id)}
                        <span>{t(tab.labelKey)}</span>
                        {!isEnabled && (
                            <span className="bg-bgc-highlight/10 text-bgc-highlight rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                                Sắp có
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
