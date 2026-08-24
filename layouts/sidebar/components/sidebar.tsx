"use client";

import React from "react";
import { usePathname } from "@/i18n/navigation";
import { Box, Drawer, List } from "@mui/material";
import { cn } from "@/libs/utils";
import { NAV_ITEMS } from "@/layouts/sidebar/constants/sidebar.constant";
import { useUiStore } from "@/store/uiStore";
import SidebarLogoButton from "./sidebar.logo.button";
import SidebarItem from "./sidebar.item";
import UserAvatar from "./user.avatar";

import { useCurrentUser } from "@/hooks/use.current.user";

const DRAWER_WIDTH = 260;

export function Sidebar() {
    const pathname = usePathname();
    const { data: user } = useCurrentUser();
    const {
        isSidebarOpen,
        isSidebarCollapsed,
        toggleSidebarCollapse,
        closeSidebar,
    } = useUiStore();
    const [openSubMenus, setOpenSubMenus] = React.useState<
        Record<string, boolean>
    >({});

    const filteredNavItems = React.useMemo(() => {
        if (!user?.role?.roleName) return NAV_ITEMS;
        return NAV_ITEMS.filter(
            (item) =>
                !item.roles || item.roles.includes(user.role.roleName),
        );
    }, [user?.role?.roleName]);

    React.useEffect(() => {
        const initialOpenState: Record<string, boolean> = {};

        filteredNavItems.forEach((item) => {
            if (item.children) {
                const hasActiveChild = item.children.some(
                    (child) =>
                        pathname === child.url ||
                        pathname.startsWith(child.url + "/"),
                );

                if (hasActiveChild) {
                    initialOpenState[item.titleKey] = true;
                }
            }
        });
    }, [pathname, filteredNavItems]);

    const toggleSubMenu = (titleKey: string) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [titleKey]: !prev[titleKey],
        }));
    };

    const renderDrawerContent = (isCollapsed: boolean) => (
        <div className="flex h-full flex-col justify-between overflow-hidden">
            {/* Header: chỉ còn logo */}
            <div
                className={cn(
                    "border-bdc-primary flex min-h-16.5 shrink-0 items-center justify-center border-b py-3.5",
                    isCollapsed ? "px-2" : "px-4",
                )}
            >
                <SidebarLogoButton>
                    {!isCollapsed && (
                        <h1 className="text-text-contrast text-xl font-bold tracking-wider">
                            NaHo
                        </h1>
                    )}
                </SidebarLogoButton>
            </div>

            {/* Menu items */}
            <Box className="flex flex-1 flex-col overflow-y-auto py-4">
                <List
                    disablePadding
                    className={cn("space-y-2", isCollapsed ? "px-1.5" : "px-3")}
                >
                    {filteredNavItems.map((item) => (
                        <SidebarItem
                            key={item.titleKey}
                            item={item}
                            pathname={pathname}
                            isCollapsed={isCollapsed}
                            isOpen={openSubMenus[item.titleKey]}
                            onToggleSubMenu={() => toggleSubMenu(item.titleKey)}
                            onCloseSidebar={closeSidebar}
                            toggleSidebarCollapse={toggleSidebarCollapse}
                        />
                    ))}
                </List>
            </Box>

            {/* User Avatar Footer */}
            <div className={cn("border-bdc-primary shrink-0 border-t")}>
                <UserAvatar isCollapsed={isCollapsed} />
            </div>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { md: isSidebarCollapsed ? 72 : DRAWER_WIDTH },
                flexShrink: { md: 0 },
                transition: "width 0.2s ease-in-out",
            }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={closeSidebar}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        backgroundColor: "var(--color-bgc-app)",
                        borderRight: "1px solid var(--color-bdc-primary)",
                    },
                }}
            >
                {renderDrawerContent(false)}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: isSidebarCollapsed ? 72 : DRAWER_WIDTH,
                        boxSizing: "border-box",
                        backgroundColor: "var(--color-bgc-app)",
                        borderRight: "1px solid var(--color-bdc-primary)",
                        transition: "width 0.2s ease-in-out",
                        overflowX: "hidden",
                    },
                }}
            >
                {renderDrawerContent(isSidebarCollapsed)}
            </Drawer>
        </Box>
    );
}

export default Sidebar;
