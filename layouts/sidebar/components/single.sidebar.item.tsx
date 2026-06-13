import React from "react";
import { SidebarItem } from "@/layouts/sidebar/types/sidebar.type";
import { useSidebarCollapse } from "@/layouts/sidebar/providers/sidebar.collapse.provider";
import { Link, usePathname } from "@/intl/i18n/navigation";
import { getSidebarItemEffectClassNameByItemPaths } from "@/layouts/sidebar/utils/sidebar.util";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { Badge } from "@mui/material";
import { useTranslations } from "next-intl";

const SingleSidebarItem = ({ item }: { item: SidebarItem }) => {
    const t = useTranslations("common.metadata.title");

    const { isCollapse } = useSidebarCollapse();
    const pathname = usePathname();

    const linkEffectClass = getSidebarItemEffectClassNameByItemPaths(
        pathname,
        item.activeLinks,
    );

    return (
        <TooltipCustom
            title={isCollapse ? t(`${item.nameLinkKey}`) : ""}
            placement="right"
            arrow
        >
            <Link
                href={item.redirectLink}
                className={`${isCollapse ? "w-10" : "w-50"} flex h-10 items-center overflow-hidden rounded-md pl-2 transition-all duration-150 ${linkEffectClass}`}
            >
                {item.hasBadge ? (
                    <span className="mr-4 flex h-10 items-center justify-center">
                        <Badge
                            badgeContent={9}
                            color="error"
                            max={99}
                            overlap="circular"
                            slotProps={{
                                badge: {
                                    sx: {
                                        width: "18px",
                                        height: "18px",
                                        minWidth: "18px",
                                        top: "22%",
                                    },
                                },
                            }}
                        >
                            {item.icon}
                        </Badge>
                    </span>
                ) : (
                    <span className="flex h-10 items-center justify-center">
                        {item.icon}
                    </span>
                )}
                <p
                    className={`text-sm font-semibold whitespace-nowrap ${isCollapse && "hidden"} ml-4`}
                >
                    {t(`${item.nameLinkKey}`)}
                </p>
            </Link>
        </TooltipCustom>
    );
};

export default SingleSidebarItem;
