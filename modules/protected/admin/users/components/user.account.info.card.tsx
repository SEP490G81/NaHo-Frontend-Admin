"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Calendar, CheckCircle2, Mail, Shield, User } from "lucide-react";
import { UserResponse } from "@/types/responses/user.response";
import { UserStatus } from "@/types/enums/user.enum";
import UserAvatar from "@/components/ui/user.avatar";

interface UserAccountInfoCardProps {
    user: UserResponse;
}

export default function UserAccountInfoCard({
    user,
}: Readonly<UserAccountInfoCardProps>) {
    const t = useTranslations("userManagement.detailsModal");
    const isActive = user.status === UserStatus.ACTIVE;

    return (
        <div className="flex flex-col gap-4">
            {/* Profile Hero Box */}
            <div className="bg-bgc-page/60 border-bdc-primary relative flex flex-col items-center gap-4 rounded-xl border p-4 sm:flex-row sm:p-5">
                <UserAvatar
                    user={user}
                    size={68}
                    className="ring-bgc-highlight/30 shadow-md ring-2"
                />
                <div className="flex flex-1 flex-col items-center gap-1 sm:items-start">
                    <h2 className="text-text-contrast text-base font-bold sm:text-lg">
                        {user.fullName || t("unspecified")}
                    </h2>
                    <span className="text-text-muted text-xs">
                        @{user.username || user.email}
                    </span>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="bg-bgc-highlight/15 text-bgc-highlight inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold">
                            <Shield className="h-3 w-3" />
                            {user.role?.roleName || t("unspecified")}
                        </span>
                        <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                                isActive
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                            }`}
                        >
                            {isActive ? "ACTIVE" : "UNACTIVE"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Account Details Grid */}
            <div className="flex flex-col gap-2.5">
                <h3 className="border-bgc-highlight text-text-contrast border-l-4 pl-2.5 text-xs font-bold tracking-wider uppercase">
                    {t("accountSection")}
                </h3>
                <div className="bg-bgc-page/40 border-bdc-primary grid grid-cols-1 gap-3 rounded-xl border p-3.5 sm:grid-cols-2">
                    {/* Email */}
                    <div className="flex items-center gap-2.5">
                        <Mail className="text-text-muted h-4 w-4 shrink-0" />
                        <div className="flex min-w-0 flex-col">
                            <span className="text-text-muted text-xs font-medium">
                                {t("email")}
                            </span>
                            <span
                                className="text-text-contrast truncate text-xs font-semibold"
                                title={user.email}
                            >
                                {user.email}
                            </span>
                        </div>
                    </div>

                    {/* Email Verified */}
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2
                            className={`h-4 w-4 shrink-0 ${
                                user.isEmailVerified
                                    ? "text-emerald-500"
                                    : "text-rose-500"
                            }`}
                        />
                        <div className="flex flex-col">
                            <span className="text-text-muted text-xs font-medium">
                                {t("emailVerified")}
                            </span>
                            <span
                                className={`text-xs font-semibold ${
                                    user.isEmailVerified
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-rose-600 dark:text-rose-400"
                                }`}
                            >
                                {user.isEmailVerified
                                    ? t("verified")
                                    : t("notVerified")}
                            </span>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="flex items-center gap-2.5">
                        <User className="text-text-muted h-4 w-4 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-text-muted text-xs font-medium">
                                {t("gender")}
                            </span>
                            <span className="text-text-contrast text-xs font-semibold">
                                {user.gender || t("unspecified")}
                            </span>
                        </div>
                    </div>

                    {/* DOB */}
                    <div className="flex items-center gap-2.5">
                        <Calendar className="text-text-muted h-4 w-4 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-text-muted text-xs font-medium">
                                {t("dob")}
                            </span>
                            <span className="text-text-contrast text-xs font-semibold">
                                {user.dob || t("unspecified")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
