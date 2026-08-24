import React from "react";
import {
    Award,
    Bot,
    CreditCard,
    Flag,
    LayoutDashboard,
    MessagesSquare,
    Receipt,
    ShieldAlert,
    Users,
    LibraryBig,
    BookType,
    FolderKanban,
    NotebookPen,
    Target
} from "lucide-react";

import { RoleName } from "@/types/enums/user.enum";

export interface SubNavItem {
    titleKey: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface NavItem {
    titleKey: string;
    url?: string;
    icon: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
    roles?: RoleName[];
    children?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    { titleKey: "dashboard", url: "/dashboard", icon: LayoutDashboard, roles: [RoleName.ADMIN] },
    { titleKey: "userManagement", url: "/users", icon: Users, roles: [RoleName.ADMIN] },
    { titleKey: "paymentManagement", url: "/payments", icon: CreditCard, roles: [RoleName.ADMIN] },
    {
        titleKey: "subscriptionManagement",
        url: "/subscription-plans",
        icon: Award,
        roles: [RoleName.ADMIN],
    },
    {
        titleKey: "costServiceManagement",
        url: "/cost-service-management",
        icon: Receipt,
        roles: [RoleName.ADMIN],
    },
    { titleKey: "reportManagement", url: "/reports", icon: Flag, roles: [RoleName.ADMIN] },
    {
        titleKey: "contentManagement",
        icon: LibraryBig,
        roles: [RoleName.CONTENT_MANAGER],
        children: [
            { titleKey: "bookManagement", url: "/books" },
            { titleKey: "vocabularyManagement", url: "/vocabularies" },
            { titleKey: "grammarManagement", url: "/grammars" },
        ],
    },
    {
        titleKey: "contentReportManagement",
        url: "/content-reports",
        icon: ShieldAlert,
        roles: [RoleName.CONTENT_MANAGER],
    },
    { titleKey: "personaManagement", url: "/personas", icon: Bot, roles: [RoleName.CONTENT_MANAGER] },
];
