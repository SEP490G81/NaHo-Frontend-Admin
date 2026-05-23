"use client";
import React from "react";
import { Box } from "@mui/material";
import LogoButton from "@/layouts/sidebar/components/logo.button";
import { SIDEBAR_GROUPS } from "@/layouts/sidebar/constants/sidebar.constant";
import { useSidebarCollapse } from "@/layouts/sidebar/providers/sidebar.collapse.provider";
import SingleSidebarItem from "@/layouts/sidebar/components/single.sidebar.item";
import { useTranslations } from "next-intl";
import LogoutButton from "@/layouts/sidebar/features/logout.button";

const SidebarGroups = () => {
    const { isCollapse } = useSidebarCollapse();
    const t = useTranslations("layout.sidebar.sidebarGroup.title");

    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                left: 0,
                width: isCollapse ? "76px" : "236px",
                height: "100vh",
                paddingInline: "18px",
                paddingBlock: "14px",
                transition: "all .2s ease",
                bgcolor: "var(--color-bgc-app)",
                borderRightWidth: "1px",
                borderRightStyle: "solid",
                borderRightColor: "var(--color-bdc-primary)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <LogoButton />

            <div className="mt-5 flex flex-1 flex-col">
                <ul className="flex w-max flex-1 flex-col justify-between gap-y-10">
                    {SIDEBAR_GROUPS.map((group) => {
                        return (
                            <div key={group.id}>
                                {!isCollapse && (
                                    <h2 className="text-text-muted mb-3 text-sm font-semibold uppercase">
                                        {t(group.title)}
                                    </h2>
                                )}
                                <div className="flex w-max flex-col gap-y-3">
                                    {group.items.map((item) => {
                                        return (
                                            <SingleSidebarItem
                                                item={item}
                                                key={item.id}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </ul>
                <LogoutButton />
            </div>
        </Box>
    );
};

export default SidebarGroups;
