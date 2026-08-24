"use client";

import React from "react";
import { Shield } from "lucide-react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { getUserFullName } from "@/layouts/protected-header/utils/header.util";
import UserAvatar from "@/components/ui/user.avatar";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

interface Props {
    isCollapsed?: boolean;
}

export default function SidebarUserAvatar({
    isCollapsed = false,
}: Readonly<Props>) {
    const { data: user } = useCurrentUser();

    const name =
        getUserFullName(user) || user?.username || user?.email || "User";
    const email = user?.email ?? "";
    const roleName = user?.role?.roleName ?? "";

    if (isCollapsed) {
        return (
            <div className="flex w-full items-center justify-center py-3">
                <TooltipCustom
                    arrow
                    placement="right"
                    title={`${name} (${roleName || email})`}
                >
                    <div>
                        <UserAvatar user={user} size={38} />
                    </div>
                </TooltipCustom>
            </div>
        );
    }

    return (
        <div className="flex w-full items-center gap-3 px-3.5 py-3">
            <UserAvatar user={user} size={42} className="shrink-0" />

            <div className="min-w-0 flex-1 flex-col">
                <p
                    className="text-text-contrast truncate text-sm leading-tight font-bold"
                    title={name}
                >
                    {name}
                </p>
                {roleName && (
                    <div className="mt-1 flex items-center">
                        <span className="bg-bgc-highlight/15 text-bgc-highlight inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide">
                            <Shield className="h-2.5 w-2.5" />
                            {roleName}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
