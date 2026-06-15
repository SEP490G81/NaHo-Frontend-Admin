import React from "react";
import { AllRoute, MetadataTitleKey, StaticRoute } from "@/intl/type";
import { Messages } from "next-intl";

export type SidebarItem = {
    id: string;
    nameLinkKey: MetadataTitleKey;
    activeLinks: AllRoute[];
    redirectLink: StaticRoute;
    icon: React.ReactNode;
    hasBadge?: boolean;
};

export type SidebarItemGroup = {
    id: string;
    title: SidebarGroupTitleKey;
    items: SidebarItem[];
};

type SidebarGroupTitleKey =
    keyof Messages["common"]["layout"]["sidebar"]["sidebarGroup"]["title"];

export enum SidebarEffectClassName {
    ACTIVE = "bg-bgc-highlight shadow-md text-text-contrast",
    MUTED = "text-tc-muted hover:text-tc-highlight hover:bg-hbgc-app",
}
