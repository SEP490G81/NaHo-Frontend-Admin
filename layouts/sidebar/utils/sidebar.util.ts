import { SidebarEffectClassName } from "@/layouts/sidebar/types/sidebar.type";

export const getSidebarItemEffectClassNameByItemPaths = (
    pathname: string,
    itemPaths: string[],
): string => {
    return itemPaths.includes(pathname)
        ? SidebarEffectClassName.ACTIVE
        : SidebarEffectClassName.MUTED;
};
