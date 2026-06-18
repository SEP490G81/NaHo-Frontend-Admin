import { SidebarEffectClassName } from "@/layouts/sidebar/types/sidebar.type";

export const getSidebarItemEffectClassNameByItemPaths = (
    pathname: string,
    itemPaths: string[],
): string => {
    // Khớp đúng route hoặc các trang con của nó (vd: /content-manager/prompt-moderation/mq-1)
    const isActive = itemPaths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
    return isActive
        ? SidebarEffectClassName.ACTIVE
        : SidebarEffectClassName.MUTED;
};
