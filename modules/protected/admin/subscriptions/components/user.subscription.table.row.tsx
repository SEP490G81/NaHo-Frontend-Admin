"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip, Chip, Button, Skeleton } from "@mui/material";
import { Eye, ArrowUpCircle } from "lucide-react";
import { UserResponse } from "@/types/responses/user.response";
import EmailVerifiedBadge from "@/modules/protected/admin/users/components/email.verified.badge";
import { useUserDetailModal } from "@/modules/protected/admin/users/providers/user.detail.provider";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUserSubscriptionQuery } from "../hooks/use.subscription.query";

import { SubscriptionPlanBadge } from "./subscription.plan.badge";

interface UserSubscriptionTableRowProps {
    user: UserResponse;
    index: number;
    pageOffset: number;
    cellClass: string;
}

export function UserSubscriptionTableRow({
    user,
    index,
    pageOffset,
    cellClass,
}: Readonly<UserSubscriptionTableRowProps>) {
    const t = useTranslations("userManagement.table");
    const tActions = useTranslations("userManagement.actions");
    const { openDetail } = useUserDetailModal();
    const { openUpgradeModal } = useSubscriptionModal();

    const { data: userSubResponse, isLoading: isSubLoading } = useUserSubscriptionQuery(user.id);
    const userSub = userSubResponse?.data;
    const currentPlanCode = userSub?.subscriptionPlan?.code || "FREE";
    const isPremium = currentPlanCode === "PREMIUM";

    return (
        <tr className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors">
            {/* STT */}
            <td className={cellClass}>{pageOffset + index + 1}</td>

            {/* Email */}
            <td className={cellClass}>
                <span className="block max-w-[200px] truncate" title={user.email}>
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

            {/* Gói cước hiện tại (Subscription Plan) */}
            <td className={cellClass}>
                {isSubLoading ? (
                    <Skeleton variant="rounded" width={90} height={24} className="rounded-md" />
                ) : (
                    <div className="flex items-center gap-1.5">
                        <SubscriptionPlanBadge planCode={currentPlanCode} />
                        {userSub?.status && (
                            <Chip
                                label={userSub.status}
                                size="small"
                                color={
                                    userSub.status === "ACTIVE"
                                        ? "success"
                                        : userSub.status === "EXPIRED"
                                          ? "warning"
                                          : "error"
                                }
                                className="text-[10px] font-bold"
                            />
                        )}
                    </div>
                )}
            </td>

            {/* Actions: View Detail & Upgrade Button */}
            <td className={cellClass}>
                <div className="flex items-center gap-2">
                    {/* View Detail */}
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

                    {/* Upgrade Button */}
                    <Button
                        size="small"
                        variant="contained"
                        disabled={isPremium || isSubLoading}
                        onClick={() =>
                            openUpgradeModal({
                                userId: user.id,
                                currentPlanCode,
                            })
                        }
                        startIcon={<ArrowUpCircle className="h-3.5 w-3.5" />}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 shadow-none transition-all ${
                            isPremium
                                ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                                : "bg-pink-50 hover:bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:hover:bg-pink-900/80 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60"
                        }`}
                    >
                        {isPremium ? "PREMIUM" : "Nâng cấp"}
                    </Button>
                </div>
            </td>
        </tr>
    );
}
