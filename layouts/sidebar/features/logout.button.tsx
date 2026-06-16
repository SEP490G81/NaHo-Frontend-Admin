import React from "react";
import { Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useSidebarCollapse } from "@/layouts/sidebar/providers/sidebar.collapse.provider";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

const LogoutButton = () => {
    const t = useTranslations();
    const { isCollapse } = useSidebarCollapse();

    const handleLogout = () => {
        console.log("logout");
    };

    return (
        <>
            <Divider
                sx={{ my: "14px", borderColor: "var(--color-bdc-primary)" }}
            />
            <TooltipCustom
                color={"--color-hbgc-error"}
                title={isCollapse ? t("common.layout.sidebar.logout") : ""}
                placement="right"
                arrow
            >
                <button
                    type="button"
                    onClick={handleLogout}
                    className={`${isCollapse ? "w-10" : "w-50"} text-text-contrast bg-bgc-error hover:bg-hbgc-error flex h-10 cursor-pointer items-center overflow-hidden rounded-md pl-2 transition-all duration-150`}
                >
                    <span className="flex h-10 items-center justify-center">
                        <LogoutOutlinedIcon />
                    </span>
                    <p
                        className={`text-sm font-semibold whitespace-nowrap ${isCollapse && "hidden"} ml-4`}
                    >
                        {t("common.layout.sidebar.logout")}
                    </p>
                </button>
            </TooltipCustom>
        </>
    );
};

export default LogoutButton;
