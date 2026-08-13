"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip } from "@mui/material";
import { Eye } from "lucide-react";
import { UserResponse } from "@/types/responses/user.response";
import EmailVerifiedBadge from "@/modules/protected/admin/users/components/email.verified.badge";
import UserChangeStatusButton from "@/modules/protected/admin/users/features/user.change.status.button";
import { useUserDetailModal } from "@/modules/protected/admin/users/providers/user.detail.provider";

interface UserTableRowProps {
    user: UserResponse;
    index: number;
    pageOffset: number;
    cellClass: string;
}

export default function UserTableRow({
    user,
    index,
    pageOffset,
    cellClass,
}: Readonly<UserTableRowProps>) {
    const t = useTranslations("userManagement.table");
    const tActions = useTranslations("userManagement.actions");
    const { openDetail } = useUserDetailModal();

    return (
        <tr className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors">
            {/* STT */}
            <td className={cellClass}>{pageOffset + index + 1}</td>

            {/* Email */}
            <td className={cellClass}>
                <span className="block max-w-[220px] truncate">
                    {user.email}
                </span>
            </td>

            {/* Username */}
            <td className={cellClass}>{user.username ?? "—"}</td>

            {/* Full Name */}
            <td className={cellClass}>{user.fullName ?? "—"}</td>

            {/* Role */}
            <td className={cellClass}>
                <span className="bg-bgc-highlight/10 text-bgc-highlight inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {user.role?.roleName ?? "—"}
                </span>
            </td>

            {/* Email Verified */}
            <td className={cellClass}>
                <EmailVerifiedBadge
                    isVerified={user.isEmailVerified}
                    verifiedLabel={t("verified")}
                    notVerifiedLabel={t("notVerified")}
                />
            </td>

            {/* Actions: View detail & Lock/Unlock (Update button deleted) */}
            <td className={cellClass}>
                <div className="flex items-center gap-1">
                    {/* View detail — teal */}
                    <Tooltip title={tActions("viewDetail")}>
                        <IconButton
                            size="small"
                            onClick={() => openDetail(user)}
                            sx={{
                                color: "#14b8a6",
                                backgroundColor: "rgba(20,184,166,0.08)",
                                "&:hover": {
                                    backgroundColor: "rgba(20,184,166,0.18)",
                                },
                            }}
                        >
                            <Eye className="h-4 w-4" />
                        </IconButton>
                    </Tooltip>

                    {/* Lock / Unlock button */}
                    <UserChangeStatusButton
                        userId={user.id}
                        status={user.status}
                    />
                </div>
            </td>
        </tr>
    );
}
