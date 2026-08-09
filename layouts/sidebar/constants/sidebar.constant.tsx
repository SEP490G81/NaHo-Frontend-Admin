import React from "react";
import {
    LayoutDashboard,
    MessagesSquare,
    Mic,
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
