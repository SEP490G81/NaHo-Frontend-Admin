import React from "react";
import { useSidebarCollapse } from "@/layouts/sidebar/providers/sidebar.collapse.provider";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { Button } from "@mui/material";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";

const SidebarActionButton = () => {
    const { setIsCollapse, isCollapse } = useSidebarCollapse();
    const t = useTranslations("common.metadata.action");

    return (
        <TooltipCustom title={isCollapse ? t("open") : t("close")}>
            <Button
                variant="text"
                color="primary"
                onClick={() => setIsCollapse((prev) => !prev)}
                sx={{ minWidth: "40px", width: "40px" }}
            >
                <DehazeOutlinedIcon />
            </Button>
        </TooltipCustom>
    );
};

export default SidebarActionButton;
