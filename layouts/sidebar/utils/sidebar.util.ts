import { SidebarEffectClassName } from "@/layouts/sidebar/types/sidebar.type";

export const getSidebarItemEffectClassNameByItemPaths = (
    pathname: string,
    itemPaths: string[],
): string => {
    const isActive = itemPaths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
    return isActive
        ? SidebarEffectClassName.ACTIVE
        : SidebarEffectClassName.MUTED;
};
