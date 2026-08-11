"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Lock, Unlock } from "lucide-react";
import { useChangeUserStatus } from "@/modules/protected/users/hooks/use.change.user.status";
import { UserStatus } from "@/types/enums/user.enum";

interface UserChangeStatusButtonProps {
    userId: string | number;
    status?: string | null;
}

/**
 * Feature Component: Nút chuyển đổi trạng thái (Khóa / Mở khóa) của user.
 * Tương tác và gọi API thông qua hook useChangeUserStatus.
 *
 * - Trạng thái ACTIVE (Đang hoạt động): Hiển thị icon Unlock (xanh). Tooltip: "Khóa tài khoản". Bấm vào -> Khóa tài khoản -> Thông báo "Khóa tài khoản thành công!".
 * - Trạng thái UNACTIVE (Bị khóa): Hiển thị icon Lock (đỏ). Tooltip: "Mở khóa tài khoản". Bấm vào -> Mở khóa tài khoản -> Thông báo "Mở khóa tài khoản thành công!".
 */
export default function UserChangeStatusButton({
    userId,
    status,
}: Readonly<UserChangeStatusButtonProps>) {
    const tActions = useTranslations("userManagement.actions");
    const { mutate, isPending } = useChangeUserStatus();

    const isActive = status === UserStatus.ACTIVE;
    const tooltipTitle = isActive ? tActions("lock") : tActions("unlock");

    return (
        <Tooltip title={tooltipTitle}>
            <span>
                <IconButton
                    size="small"
                    disabled={isPending}
                    onClick={() => mutate(userId)}
                    sx={{
                        color: isActive
                            ? "var(--color-text-success)"
                            : "var(--color-text-error)",
                        backgroundColor: isActive
                            ? "rgba(46,155,91,0.08)"
                            : "rgba(239,35,60,0.08)",
                        "&:hover": {
                            backgroundColor: isActive
                                ? "rgba(239,35,60,0.18)"
                                : "rgba(46,155,91,0.18)",
                        },
                        "&.Mui-disabled": {
                            opacity: 0.6,
                        },
                    }}
                >
                    {isPending ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : isActive ? (
                        <Unlock className="h-4 w-4" />
                    ) : (
                        <Lock className="h-4 w-4" />
                    )}
                </IconButton>
            </span>
        </Tooltip>
    );
}
