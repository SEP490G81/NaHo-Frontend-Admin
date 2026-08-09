"use client";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import {
    getFirstCharacter,
    getUserAvatarUrl,
    getUserFullName,
} from "@/layouts/protected-header/utils/header.util";
import AccountMenu from "@/layouts/sidebar/components/account.menu";
import { cn } from "@/libs/utils";

interface Props {
    isCollapsed?: boolean;
}

const UserAvatar = ({ isCollapsed = false }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { data: user } = useCurrentUser();

    const name = getUserFullName(user) || user?.username || user?.email || "";

    return (
        <div className="w-full">
            <div
                className={cn(
                    "group hover:bg-hbgc-app hover:border-bdc-primary flex w-full cursor-pointer items-center border border-transparent px-2.5 py-3.5 text-left transition-colors",
                    isCollapsed ? "justify-center" : "justify-start gap-3",
                )}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <Avatar
                    src={getUserAvatarUrl(user)}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        width: "40px",
                        height: "40px",
                    }}
                >
                    {getFirstCharacter(user)}
                </Avatar>

                {!isCollapsed && (
                    <div className="min-w-0 flex-1">
                        <p className="text-text-contrast truncate text-sm leading-tight font-bold">
                            {name}
                        </p>
                    </div>
                )}
            </div>

            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
    );
};

export default UserAvatar;
