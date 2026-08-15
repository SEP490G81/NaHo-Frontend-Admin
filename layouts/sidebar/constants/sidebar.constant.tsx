import React from "react";
import {
    Award,
    CreditCard,
    Flag,
    LayoutDashboard,
    MessagesSquare,
    Receipt,
    Trophy,
    Users,
    LibraryBig,
    BookType,
    FolderKanban,
    NotebookPen,
    Target
} from "lucide-react";

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
    children?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    { titleKey: "dashboard", url: "/dashboard", icon: LayoutDashboard },
    { titleKey: "userManagement", url: "/users", icon: Users },
    { titleKey: "paymentManagement", url: "/payments", icon: CreditCard },
    {
        titleKey: "subscriptionManagement",
        url: "/subscription-plans",
        icon: Award,
    },
    {
        titleKey: "costServiceManagement",
        url: "/cost-service-management",
        icon: Receipt,
    },
    { titleKey: "reportManagement", url: "/reports", icon: Flag },
    {
        titleKey: "contentManagement",
        icon: LibraryBig,
        children: [
            { titleKey: "editBook", url: "/books", icon: BookType },
            { titleKey: "editTopic", url: "/topics", icon: FolderKanban },
            { titleKey: "editLesson", url: "/lessons", icon: NotebookPen },
            { titleKey: "editObjective", url: "/objectives", icon: Target },
        ]
    },
    {
        titleKey: "freeAiChat",
        url: "/dialogue-setup",
        icon: MessagesSquare,
        disabled: false,
    },
    {
        titleKey: "leaderboard",
        url: "/leaderboard",
        icon: Trophy,
        disabled: false,
    },
];
