"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@mui/material";
import { Flame, Star, Trophy, XCircle } from "lucide-react";
import { UserLearningProgressResponse } from "@/types/responses/user.response";
import { getLeagueConfig } from "@/modules/protected/admin/users/constants/user.league.constants";

interface UserLearningProgressCardProps {
    progress: UserLearningProgressResponse | null;
    isLoading: boolean;
}

export default function UserLearningProgressCard({
    progress,
    isLoading,
}: Readonly<UserLearningProgressCardProps>) {
    const t = useTranslations("userManagement.detailsModal");
    const leagueInfo = progress
        ? getLeagueConfig(progress.leaderboardUser?.leagueId ?? null)
        : null;

    return (
        <div className="flex flex-col gap-2.5">
            <h3 className="border-bgc-highlight text-text-contrast border-l-4 pl-2.5 text-xs font-bold tracking-wider uppercase">
                {t("progressSection")}
            </h3>

            {isLoading ? (
                <div className="flex items-center justify-center p-6">
                    <CircularProgress
                        size={28}
                        className="text-bgc-highlight"
                    />
                </div>
            ) : progress ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {/* Rank / League Card */}
                    <div className="bg-bgc-page/40 border-bdc-primary flex flex-col justify-between gap-1.5 rounded-xl border p-3.5">
                        <div className="text-text-muted flex items-center gap-1.5">
                            <Trophy
                                className="h-4 w-4 shrink-0"
                                style={{
                                    color:
                                        leagueInfo?.color ??
                                        "var(--color-bgc-highlight)",
                                }}
                            />
                            <span className="text-[11px] font-bold tracking-wider uppercase">
                                {t("rank")}
                            </span>
                        </div>
                        <div className="mt-1 flex flex-col">
                            <span
                                className="text-sm font-extrabold"
                                style={{
                                    color: leagueInfo?.color ?? "inherit",
                                }}
                            >
                                {leagueInfo
                                    ? `${leagueInfo.name} League`
                                    : t("unspecified")}
                            </span>
                            {progress.leaderboardUser?.rank && (
                                <span className="text-text-muted text-xs font-medium">
                                    #{progress.leaderboardUser.rank}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Total Points Card */}
                    <div className="bg-bgc-page/40 border-bdc-primary flex flex-col justify-between gap-1.5 rounded-xl border p-3.5">
                        <div className="text-text-muted flex items-center gap-1.5">
                            <Star className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
                            <span className="text-[11px] font-bold tracking-wider uppercase">
                                {t("totalPoint")}
                            </span>
                        </div>
                        <span className="text-text-contrast text-lg font-black tracking-tight">
                            {progress.totalPoint.toLocaleString()}
                        </span>
                    </div>

                    {/* Current Streak Card */}
                    <div className="bg-bgc-page/40 border-bdc-primary flex flex-col justify-between gap-1.5 rounded-xl border p-3.5">
                        <div className="text-text-muted flex items-center gap-1.5">
                            <Flame className="h-4 w-4 shrink-0 fill-orange-500 text-orange-500" />
                            <span className="text-[11px] font-bold tracking-wider uppercase">
                                {t("currentStreak")}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-text-contrast text-lg font-black tracking-tight">
                                {progress.currentStreak}
                            </span>
                            <span className="text-text-muted text-xs font-medium">
                                days
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-bdc-primary bg-bgc-page/40 flex items-center gap-3 rounded-xl border p-4">
                    <XCircle className="text-text-muted h-5 w-5 shrink-0" />
                    <span className="text-text-muted text-xs font-medium">
                        {t("noProgress")}
                    </span>
                </div>
            )}
        </div>
    );
}
