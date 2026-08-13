"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PROVIDER_TABS } from "../constants/cost.service.constants";
import { ServiceProviderTab } from "../types/azure.cost.type";
import { Cloud, Cpu, Server } from "lucide-react";

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
                return <Cloud className="h-4 w-4" />;
            case "openai":
                return <Cpu className="h-4 w-4" />;
            case "aws":
                return <Server className="h-4 w-4" />;
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-bdc-primary)] pb-3">
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
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                                : isEnabled
                                  ? "bg-[var(--color-bgc-app)] text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                                  : "cursor-not-allowed bg-gray-100/60 text-gray-400 opacity-60 dark:bg-gray-800/40 dark:text-gray-600"
                        }`}
                    >
                        {getIcon(tab.id)}
                        <span>{t(tab.labelKey)}</span>
                        {!isEnabled && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">
                                Sắp có
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
