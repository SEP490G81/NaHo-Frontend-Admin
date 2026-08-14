"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, Divider } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { usePathname } from "@/i18n/navigation";
import { useUiStore } from "@/store/uiStore";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import HeaderDecoration from "@/layouts/protected-header/components/header.decoration";
import NotificationButton from "@/layouts/protected-header/features/notification.button";
import SettingsButton from "@/layouts/protected-header/components/settings.button";
import LogoutButton from "@/layouts/protected-header/features/logout.button";
import { LAST_NON_SETTINGS_KEY } from "@/modules/protected/shared/settings/hooks/use.settings.back";

export default function ProtectedHeader() {
    const t = useTranslations();
    const pathname = usePathname();
    const { toggleSidebarCollapse, isSidebarCollapsed } = useUiStore();

    useEffect(() => {
        if (typeof window !== "undefined" && pathname && !pathname.startsWith("/settings")) {
            sessionStorage.setItem(LAST_NON_SETTINGS_KEY, pathname);
        }
    }, [pathname]);

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between overflow-hidden border-b px-3 py-3.5">
            <HeaderDecoration />

            {/* Left: collapse toggle (desktop) + mobile menu button */}
            <div className="z-10 flex min-w-0 items-center justify-start gap-x-3">
                <TooltipCustom
                    arrow
                    title={
                        isSidebarCollapsed
                            ? t("common.layout.header.expandSidebar")
                            : t("common.layout.header.collapseSidebar")
                    }
                    placement="bottom"
                >
                    <Button
                        onClick={toggleSidebarCollapse}
                        variant="outlined"
                        color="primary"
                        sx={{
                            width: "40px",
                            minWidth: "40px",
                            height: "40px",
                            display: { xs: "none", md: "inline-flex" },
                        }}
                    >
                        {isSidebarCollapsed ? (
                            <KeyboardDoubleArrowLeftOutlinedIcon className="h-5 w-5" />
                        ) : (
                            <KeyboardDoubleArrowRightOutlinedIcon className="h-5 w-5" />
                        )}
                    </Button>
                </TooltipCustom>
            </div>

            {/* Right: notifications, settings, divider, logout */}
            <div className="z-10 flex items-center gap-x-3">
                <NotificationButton />
                <SettingsButton />

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        height: 24,
                        my: "auto",
                        borderColor: "var(--color-bdc-primary)",
                    }}
                />

                <LogoutButton />
            </div>
        </div>
    );
}
