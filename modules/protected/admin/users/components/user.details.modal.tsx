"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    Avatar,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
} from "@mui/material";
import {
    BookOpen,
    Calendar,
    CheckCircle2,
    Flame,
    Mail,
    Star,
    Trophy,
    User,
    X,
    XCircle,
} from "lucide-react";
import {
    UserLearningProgressResponse,
    UserResponse,
} from "@/types/responses/user.response";
import { UserStatus } from "@/types/enums/user.enum";

interface UserDetailsModalProps {
    open: boolean;
    onClose: () => void;
    user: UserResponse | null;
    progress: UserLearningProgressResponse | null;
    isProgressLoading: boolean;
}

function getLeagueInfo(leagueId: number | null) {
    if (!leagueId) return null;
    const leagues = [
        { name: "Bronze", color: "var(--color-league-bronze)" },
        { name: "Silver", color: "var(--color-league-silver)" },
        { name: "Gold", color: "var(--color-league-gold)" },
        { name: "Sapphire", color: "var(--color-league-sapphire)" },
        { name: "Ruby", color: "var(--color-league-ruby)" },
        { name: "Emerald", color: "var(--color-league-emerald)" },
        { name: "Amethyst", color: "var(--color-league-amethyst)" },
        { name: "Pearl", color: "var(--color-league-pearl)" },
        { name: "Obsidian", color: "var(--color-league-obsidian)" },
        { name: "Diamond", color: "var(--color-league-diamond)" },
    ];
    const idx = (leagueId - 1) % leagues.length;
    return leagues[idx >= 0 ? idx : 0];
}

export default function UserDetailsModal({
    open,
    onClose,
    user,
    progress,
    isProgressLoading,
}: Readonly<UserDetailsModalProps>) {
    const t = useTranslations("userManagement.detailsModal");

    if (!user) return null;

    const isActive = user.status === UserStatus.ACTIVE;
    const leagueInfo = progress
        ? getLeagueInfo(progress.leaderboardUser?.leagueId ?? null)
        : null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="body"
            slotProps={{
                paper: {
                    className:
                        "bg-bgc-modal text-text-contrast border border-bdc-primary rounded-xl",
                    sx: {
                        backgroundColor: "var(--color-bgc-modal)",
                        color: "var(--color-text-contrast)",
                        borderRadius: "16px",
                    },
                },
            }}
        >
            <DialogTitle className="border-bdc-primary flex items-center justify-between border-b px-6 py-4">
                <span className="text-lg font-bold">{t("title")}</span>
                <IconButton
                    onClick={onClose}
                    size="small"
                    className="text-text-muted hover:text-text-contrast"
                >
                    <X className="h-5 w-5" />
                </IconButton>
            </DialogTitle>

            <DialogContent className="flex flex-col gap-6 px-6 py-6">
                {/* 1. Header Profile Box */}
                <div className="bg-bgc-page/50 border-bdc-primary flex flex-col items-center gap-4 rounded-lg border p-4 sm:flex-row">
                    <Avatar
                        src={user.avatarUrl ?? undefined}
                        alt={user.fullName ?? user.username}
                        sx={{ width: 72, height: 72 }}
                        className="border-bdc-primary border"
                    />
                    <div className="flex flex-col items-center gap-1 sm:items-start">
                        <h2 className="text-text-contrast text-xl font-bold">
                            {user.fullName ?? t("unspecified")}
                        </h2>
                        <span className="text-text-muted text-sm">
                            @{user.username}
                        </span>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Chip
                                label={user.role?.roleName}
                                size="small"
                                className="bg-bgc-highlight/10 text-bgc-highlight text-xs font-semibold"
                            />
                            <Chip
                                label={isActive ? "ACTIVE" : "LOCKED"}
                                size="small"
                                color={isActive ? "success" : "error"}
                                className="text-xs font-semibold"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Account Information Details */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-md border-bgc-highlight mb-1 border-l-4 pl-2 font-bold">
                        {t("accountSection")}
                    </h3>
                    <Grid container spacing={2}>
                        <Grid
                            size={{ xs: 12, sm: 6 }}
                            className="flex items-center gap-2"
                        >
                            <Mail className="text-text-muted h-4 w-4" />
                            <span className="min-w-[100px] text-sm font-semibold">
                                {t("email")}:
                            </span>
                            <span className="text-sm break-all">
                                {user.email}
                            </span>
                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 6 }}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle2
                                className={`h-4 w-4 ${user.isEmailVerified ? "text-text-success" : "text-text-error"}`}
                            />
                            <span className="min-w-[100px] text-sm font-semibold">
                                {t("emailVerified")}:
                            </span>
                            <span className="text-sm">
                                {user.isEmailVerified
                                    ? t("verified")
                                    : t("notVerified")}
                            </span>
                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 6 }}
                            className="flex items-center gap-2"
                        >
                            <User className="text-text-muted h-4 w-4" />
                            <span className="min-w-[100px] text-sm font-semibold">
                                {t("gender")}:
                            </span>
                            <span className="text-sm">
                                {user.gender ? user.gender : t("unspecified")}
                            </span>
                        </Grid>
                        <Grid
                            size={{ xs: 12, sm: 6 }}
                            className="flex items-center gap-2"
                        >
                            <Calendar className="text-text-muted h-4 w-4" />
                            <span className="min-w-[100px] text-sm font-semibold">
                                {t("dob")}:
                            </span>
                            <span className="text-sm">
                                {user.dob ? user.dob : t("unspecified")}
                            </span>
                        </Grid>
                    </Grid>

                    {/* Authentication Providers */}
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <span className="text-text-muted text-sm font-semibold">
                            {t("authProviders")}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {user.authProviders.length > 0 ? (
                                user.authProviders.map((provider) => (
                                    <Chip
                                        key={provider.id}
                                        label={provider.providerName}
                                        size="small"
                                        variant="outlined"
                                        className="border-bdc-primary text-xs"
                                    />
                                ))
                            ) : (
                                <Chip
                                    label="Credentials"
                                    size="small"
                                    variant="outlined"
                                    className="border-bdc-primary text-xs"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Learning Progress Details */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-md border-bgc-highlight mb-1 border-l-4 pl-2 font-bold">
                        {t("progressSection")}
                    </h3>

                    {isProgressLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <CircularProgress
                                size={32}
                                className="text-bgc-highlight"
                            />
                        </div>
                    ) : progress ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Points & League Box */}
                            <div className="bg-bgc-page/50 border-bdc-primary flex flex-col gap-2 rounded-lg border p-4">
                                <div className="text-text-muted flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    <span className="text-xs font-semibold uppercase">
                                        {t("totalPoint")}
                                    </span>
                                </div>
                                <span className="text-text-contrast text-2xl font-black">
                                    {progress.totalPoint}
                                </span>
                                {leagueInfo && (
                                    <div className="mt-1 flex items-center gap-1.5">
                                        <Trophy
                                            className="h-4 w-4"
                                            style={{ color: leagueInfo.color }}
                                        />
                                        <span
                                            className="text-xs font-medium"
                                            style={{ color: leagueInfo.color }}
                                        >
                                            {leagueInfo.name} League
                                        </span>
                                        {progress.leaderboardUser?.rank && (
                                            <span className="text-text-muted text-xs">
                                                (#
                                                {progress.leaderboardUser.rank})
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Streaks Box */}
                            <div className="bg-bgc-page/50 border-bdc-primary flex flex-col gap-2 rounded-lg border p-4">
                                <div className="text-text-muted flex items-center gap-2">
                                    <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
                                    <span className="text-xs font-semibold uppercase">
                                        {t("currentStreak")}
                                    </span>
                                </div>
                                <span className="text-text-contrast text-2xl font-black">
                                    {progress.currentStreak}{" "}
                                    <span className="text-text-muted text-xs font-normal">
                                        days
                                    </span>
                                </span>
                                <span className="text-text-muted text-xs">
                                    {t("longestStreak")}:{" "}
                                    {progress.longestStreak} days
                                </span>
                            </div>

                            {/* Learning Status Nodes Box */}
                            <div className="bg-bgc-page/50 border-bdc-primary flex flex-col gap-2 rounded-lg border p-4">
                                <div className="text-text-muted flex items-center gap-2">
                                    <BookOpen className="text-bgc-highlight h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase">
                                        {t("farthestNode")}
                                    </span>
                                </div>
                                <span className="text-md text-text-contrast font-bold">
                                    {progress.farthestAvailableNodeId
                                        ? `Node ID: ${progress.farthestAvailableNodeId} (${progress.farthestAvailableNodeGlobalOrderIndex})`
                                        : "—"}
                                </span>
                                <div className="text-text-muted flex flex-col text-xs">
                                    <span>
                                        {t("lastNode")}:{" "}
                                        {progress.lastLearningNodeId
                                            ? `Node ID: ${progress.lastLearningNodeId}`
                                            : "—"}
                                    </span>
                                    {progress.lastLearningAt && (
                                        <span className="truncate">
                                            {t("lastLearningAt")}:{" "}
                                            {new Date(
                                                progress.lastLearningAt,
                                            ).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 rounded-lg border border-red-200/50 bg-red-500/5 p-4 text-red-600 dark:text-red-400">
                            <XCircle className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm font-medium">
                                {t("noProgress")}
                            </span>
                        </div>
                    )}
                </div>
            </DialogContent>

            <DialogActions className="border-bdc-primary border-t px-6 py-4">
                <Button
                    onClick={onClose}
                    variant="outlined"
                    className="border-bdc-primary text-text-contrast hover:bg-hbgc-app"
                    sx={{
                        color: "var(--color-text-contrast)",
                        borderColor: "var(--color-bdc-primary)",
                    }}
                >
                    {t("close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
