"use client";

import React, { useState } from "react";
import {
    Button,
    Chip,
    CircularProgress,
    InputAdornment,
    TextField,
} from "@mui/material";
import {
    ArrowUpCircle,
    Calendar,
    Search,
    ShieldAlert,
    UserCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUserSubscriptionQuery } from "../hooks/use.subscription.query";
import { SubscriptionPlanBadge } from "./subscription.plan.badge";

export function UserSubscriptionLookupBox() {
    const t = useTranslations("subscriptionManagement.lookupBox");
    const { lookupUserId, setLookupUserId, openUpgradeModal } =
        useSubscriptionModal();
    const [inputUserId, setInputUserId] = useState<string>("");

    const {
        data: userSubResponse,
        isLoading,
        isError,
    } = useUserSubscriptionQuery(lookupUserId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const idNum = Number(inputUserId.trim());
        if (idNum && idNum > 0) {
            setLookupUserId(idNum);
        }
    };

    const userSub = userSubResponse?.data;
    const currentPlanCode = userSub?.subscriptionPlan?.code || "FREE";
    const isPremium = currentPlanCode === "PREMIUM";

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleString("vi-VN");
    };

    return (
        <div className="space-y-5 rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-6 shadow-sm">
            <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
                    <UserCheck className="h-5 w-5 text-pink-500" />
                    <span>{t("title")}</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("subtitle")}
                </p>
            </div>

            {/* Input Search Form */}
            <form
                onSubmit={handleSearch}
                className="flex flex-col gap-3 sm:flex-row"
            >
                <TextField
                    size="small"
                    type="number"
                    placeholder={t("placeholder")}
                    value={inputUserId}
                    onChange={(e) => setInputUserId(e.target.value)}
                    className="flex-1"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontSize: "0.85rem",
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading || !inputUserId.trim()}
                    startIcon={
                        isLoading ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )
                    }
                    className="rounded-xl bg-pink-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-pink-700"
                >
                    {t("searchButton")}
                </Button>
            </form>

            {/* Display Lookup Results */}
            {lookupUserId && (
                <div className="space-y-4 rounded-xl border border-pink-100 bg-pink-50/40 p-4 dark:border-pink-900/50 dark:bg-pink-950/20">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <CircularProgress
                                size={24}
                                className="text-pink-500"
                            />
                        </div>
                    ) : isError || !userSub ? (
                        <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                            <ShieldAlert className="h-4 w-4 shrink-0" />
                            <span>{t("notFound", { id: lookupUserId })}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                        User #{userSub.userId}
                                    </span>
                                    <SubscriptionPlanBadge
                                        planCode={currentPlanCode}
                                    />
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
                                    />
                                </div>
                                <div className="flex flex-wrap items-center gap-4 pt-1 text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                        <span>
                                            {t("startTime", {
                                                time: formatDate(
                                                    userSub.startTime,
                                                ),
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                        <span>
                                            {t("endTime", {
                                                time: formatDate(
                                                    userSub.endTime,
                                                ),
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                disabled={isPremium}
                                onClick={() =>
                                    openUpgradeModal({
                                        userId: userSub.userId,
                                        currentPlanCode,
                                    })
                                }
                                startIcon={
                                    <ArrowUpCircle className="h-4 w-4" />
                                }
                                className={`rounded-xl px-4 py-2 text-xs font-bold shadow-none transition-all ${
                                    isPremium
                                        ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                                        : "border border-pink-300 bg-pink-100 text-pink-700 hover:bg-pink-200 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300 dark:hover:bg-pink-900"
                                }`}
                            >
                                {isPremium
                                    ? t("alreadyPremium")
                                    : t("upgradeButton")}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
