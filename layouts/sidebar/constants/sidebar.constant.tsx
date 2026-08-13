import React from "react";
import {
    Award,
    CreditCard,
    Flag,
    LayoutDashboard,
    MessagesSquare,
    Mic,
    Receipt,
    Trophy,
    Users,
} from "lucide-react";

export interface SubNavItem {
    titleKey: string;
    url: string;
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
    { titleKey: "subscriptionManagement", url: "/subscription-plans", icon: Award },
    { titleKey: "costServiceManagement", url: "/cost-service-management", icon: Receipt },
    { titleKey: "reportManagement", url: "/reports", icon: Flag },
    { titleKey: "kaiwaRoadmap", url: "/books", icon: Mic },
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
