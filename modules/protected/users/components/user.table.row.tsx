"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip } from "@mui/material";
import { Eye, Lock, Unlock } from "lucide-react";
import { UserResponse } from "@/types/responses/user.response";
import EmailVerifiedBadge from "@/modules/protected/users/components/email.verified.badge";
import { toast } from "react-toastify";

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
}: UserTableRowProps) {
    const t = useTranslations("userManagement.table");
    const tActions = useTranslations("userManagement.actions");

    return (
        <tr className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors">
            {/* STT */}
            <td className={cellClass}>{pageOffset + index + 1}</td>

            {/* Email */}
            <td className={cellClass}>
                <span className="max-w-[220px] truncate block">
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
                            onClick={() =>
                                toast.info(`View detail: ${user.id}`)
                            }
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

                    {/* Lock / Unlock — red / green */}
                    <Tooltip
                        title={
                            user.status === "ACTIVE"
                                ? tActions("lock")
                                : tActions("unlock")
                        }
                    >
                        <IconButton
                            size="small"
                            onClick={() =>
                                toast.info(`Toggle lock: ${user.id}`)
                            }
                            sx={{
                                color:
                                    user.status === "ACTIVE"
                                        ? "var(--color-text-error)"
                                        : "var(--color-text-success)",
                                backgroundColor:
                                    user.status === "ACTIVE"
                                        ? "rgba(239,35,60,0.08)"
                                        : "rgba(46,155,91,0.08)",
                                "&:hover": {
                                    backgroundColor:
                                        user.status === "ACTIVE"
                                            ? "rgba(239,35,60,0.18)"
                                            : "rgba(46,155,91,0.18)",
                                },
                            }}
                        >
                            {user.status === "ACTIVE" ? (
                                <Lock className="h-4 w-4" />
                            ) : (
                                <Unlock className="h-4 w-4" />
                            )}
                        </IconButton>
                    </Tooltip>
                </div>
            </td>
        </tr>
    );
}
