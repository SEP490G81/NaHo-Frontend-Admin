"use client";

import React, { useState } from "react";
import {
    Button,
    TextField,
    CircularProgress,
    Chip,
    InputAdornment,
} from "@mui/material";
import { Search, UserCheck, ArrowUpCircle, Calendar, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUserSubscriptionQuery } from "../hooks/use.subscription.query";
import { SubscriptionPlanBadge } from "./subscription.plan.badge";

export function UserSubscriptionLookupBox() {
    const t = useTranslations("subscriptionManagement.lookupBox");
    const { lookupUserId, setLookupUserId, openUpgradeModal } = useSubscriptionModal();
    const [inputUserId, setInputUserId] = useState<string>("");

    const { data: userSubResponse, isLoading, isError } = useUserSubscriptionQuery(lookupUserId);

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
        <div className="rounded-2xl border border-[var(--color-bdc-primary)] bg-[var(--color-bgc-app)] p-6 shadow-sm space-y-5">
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-pink-500" />
                    <span>{t("title")}</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("subtitle")}
                </p>
            </div>

            {/* Input Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
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
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Search className="h-4 w-4" />}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-xs px-5 py-2.5"
                >
                    {t("searchButton")}
                </Button>
            </form>

            {/* Display Lookup Results */}
            {lookupUserId && (
                <div className="rounded-xl border border-pink-100 dark:border-pink-900/50 bg-pink-50/40 dark:bg-pink-950/20 p-4 space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-4">
                            <CircularProgress size={24} className="text-pink-500" />
                        </div>
                    ) : isError || !userSub ? (
                        <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                            <ShieldAlert className="h-4 w-4 shrink-0" />
                            <span>{t("notFound", { id: lookupUserId })}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                                        User #{userSub.userId}
                                    </span>
                                    <SubscriptionPlanBadge planCode={currentPlanCode} />
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
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 pt-1">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                        <span>{t("startTime", { time: formatDate(userSub.startTime) })}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                        <span>{t("endTime", { time: formatDate(userSub.endTime) })}</span>
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
                                startIcon={<ArrowUpCircle className="h-4 w-4" />}
                                className={`font-bold text-xs rounded-xl px-4 py-2 shadow-none transition-all ${isPremium
                                    ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                                    : "bg-pink-100 hover:bg-pink-200 text-pink-700 dark:bg-pink-950 dark:hover:bg-pink-900 dark:text-pink-300 border border-pink-300 dark:border-pink-800"
                                    }`}
                            >
                                {isPremium ? t("alreadyPremium") : t("upgradeButton")}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
