import { Avatar, Divider, Popover } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { useCurrentUser } from "@/hooks/use.current.user";
import {
    getFirstCharacter,
    getUserAvatarUrl,
    getUserFullName,
} from "@/layouts/protected-header/utils/header.util";
import { ACCOUNT_MENU_ITEMS } from "@/layouts/protected-header/constants/protected.header.constant";
import LogoutButton from "@/layouts/protected-header/features/logout.button";

const AccountMenu = ({
    anchorEl,
    setAnchorEl,
}: {
    anchorEl: HTMLElement | null;
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}) => {
    const t = useTranslations();
    const pathname = usePathname();
    const { data: user } = useCurrentUser();

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    sx: {
                        ml: 1.5,
                        boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "16px",
                        border: "1px solid var(--color-bdc-primary)",
                        backgroundColor: "var(--color-bgc-app)",
                    },
                },
            }}
        >
            <div>
                <div className="flex min-w-75 items-center gap-x-3 p-3.5">
                    <Avatar
                        src={getUserAvatarUrl(user)}
                        sx={{
                            width: "52px",
                            height: "52px",
                            bgcolor: "var(--color-bgc-highlight)",
                        }}
                    >
                        {getFirstCharacter(user)}
                    </Avatar>

                    <div className="min-w-0 flex-1 text-left">
                        <h2 className="text-text-primary truncate text-sm font-semibold">
                            {getUserFullName(user)}
                        </h2>
                        <p className="text-tc-muted mt-0.5 truncate text-xs font-medium">
                            {user ? user.email : ""}
                        </p>
                    </div>
                </div>

                <Divider />

                <div className="flex flex-col gap-y-1 px-1.5 py-2">
                    {ACCOUNT_MENU_ITEMS.map((item) => {
                        if (item.type === "STATIC") {
                            return <div key={item.id}>{item.component}</div>;
                        }

                        const isActive =
                            item.type === "LINK" &&
                            item.redirectLink !== "/" &&
                            (pathname === item.redirectLink ||
                                pathname.startsWith(item.redirectLink + "/"));

                        return (
                            <Link
                                href={item.redirectLink}
                                key={item.id}
                                onClick={handleClose}
                                className={cn(
                                    "group relative flex h-10 items-center justify-start rounded-md px-3.5 transition-all duration-150",
                                    isActive
                                        ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                        : "text-text-contrast hover:text-text-highlight hover:bg-hbgc-page",
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-10 w-8 items-center transition-colors",
                                        isActive
                                            ? "text-bgc-highlight"
                                            : "text-text-muted group-hover:text-text-highlight",
                                    )}
                                >
                                    {item.icon}
                                </span>
                                <p className="text-sm font-semibold whitespace-nowrap">
                                    {t(
                                        `common.layout.header.accountMenu.${item.titleKey}`,
                                    )}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <Divider />

                <LogoutButton />
            </div>
        </Popover>
    );
};

export default AccountMenu;
