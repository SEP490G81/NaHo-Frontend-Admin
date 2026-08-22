import React from "react";
import {
    Award,
    Bot,
    CreditCard,
    Flag,
    LayoutDashboard,
    Receipt,
    ShieldAlert,
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
        titleKey: "contentReportManagement",
        url: "/content-reports",
        icon: ShieldAlert,
    },
    { titleKey: "personaManagement", url: "/personas", icon: Bot },
];
