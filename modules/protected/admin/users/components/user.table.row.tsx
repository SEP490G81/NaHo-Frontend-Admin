"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, IconButton, Skeleton, Tooltip } from "@mui/material";
import { ArrowUpCircle, Eye } from "lucide-react";
import { UserResponse } from "@/types/responses/user.response";
import EmailVerifiedBadge from "@/modules/protected/admin/users/components/email.verified.badge";
import UserChangeStatusButton from "@/modules/protected/admin/users/features/user.change.status.button";
import { useUserDetailModal } from "@/modules/protected/admin/users/providers/user.detail.provider";
import { useSubscriptionModal } from "@/modules/protected/admin/subscriptions/providers/subscription.modal.provider";
import { useUserSubscriptionQuery } from "@/modules/protected/admin/subscriptions/hooks/use.subscription.query";
import { SubscriptionPlanBadge } from "@/modules/protected/admin/subscriptions/components/subscription.plan.badge";

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
    const { openUpgradeModal } = useSubscriptionModal();

    const { data: userSubResponse, isLoading: isSubLoading } =
        useUserSubscriptionQuery(user.id);
    const userSub = userSubResponse?.data;
    const currentPlanCode = userSub?.subscriptionPlan?.code || "FREE";
    const isPremium = currentPlanCode === "PREMIUM";

    return (
        <tr className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors">
            {/* STT */}
            <td className={cellClass}>{pageOffset + index + 1}</td>

            {/* Email */}
            <td className={cellClass}>
                <span
                    className="mx-auto block max-w-[220px] truncate"
                    title={user.email}
                >
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
                    <div className="flex justify-center">
                        <Skeleton
                            variant="rounded"
                            width={90}
                            height={24}
                            className="rounded-md"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-1.5">
                        <SubscriptionPlanBadge planCode={currentPlanCode} />
                    </div>
                )}
            </td>

            {/* Actions: View detail, Upgrade, Lock/Unlock */}
            <td className={cellClass}>
                <div className="flex items-center justify-center gap-1.5">
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

                    {/* Upgrade Button */}
                    <Tooltip title={tActions("upgrade")}>
                        <span>
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
                                startIcon={
                                    <ArrowUpCircle className="h-3.5 w-3.5" />
                                }
                                className={`!rounded-lg !px-2 !py-1 !text-xs !font-bold !shadow-none transition-all ${
                                    isPremium
                                        ? "!bg-gray-100 !text-gray-400 dark:!bg-gray-800 dark:!text-gray-500"
                                        : "border border-pink-200 !bg-pink-50 !text-pink-600 hover:!bg-pink-100 dark:border-pink-800/60 dark:!bg-pink-950/60 dark:!text-pink-300 dark:hover:!bg-pink-900/80"
                                }`}
                            >
                                {isPremium ? "PREMIUM" : tActions("upgrade")}
                            </Button>
                        </span>
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
