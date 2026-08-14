"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { logout } from "@/services/client/user.service";
import { useRouter } from "@/i18n/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";

export default function LogoutButton() {
    const t = useTranslations();
    const { replace } = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try {
            await logout();
            queryClient.setQueryData(queryKeys.auth.currentUser, null);
            replace("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TooltipCustom arrow title={t("common.layout.header.logoutButton")}>
            <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                    width: "40px",
                    minWidth: "40px",
                    height: "40px",
                    borderColor: "var(--color-text-error)",
                    color: "var(--color-text-error)",
                    "&:hover": {
                        borderColor: "var(--color-text-error)",
                        backgroundColor:
                            "color-mix(in srgb, var(--color-text-error) 10%, transparent)",
                    },
                }}
            >
                <LogoutIcon fontSize="small" />
            </Button>
        </TooltipCustom>
    );
}
