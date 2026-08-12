"use client";

import React from "react";
import { SubscriptionPlanResponse } from "@/types/responses/subscription.response";
import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Chip } from "@mui/material";
import { useTranslations } from "next-intl";

interface SubscriptionPlanCardProps {
    readonly plan: SubscriptionPlanResponse;
}

export function SubscriptionPlanCard({ plan }: SubscriptionPlanCardProps) {
    const t = useTranslations("subscriptionManagement.card");

    const formatCurrency = (amount: number, currency: string) => {
        if (amount === 0) return t("free");
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency || "VND",
        }).format(amount);
    };

    const isFree = plan.code === "FREE";
    const isBasic = plan.code === "BASIC";
    const isPremium = plan.code === "PREMIUM";

    const getCardStyle = () => {
        if (isPremium) {
            return "border-2 border-amber-400 dark:border-amber-600 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 dark:from-amber-950/30 dark:via-gray-900 dark:to-gray-900 shadow-xl scale-[1.02]";
        }
        if (isBasic) {
            return "border-2 border-pink-400 dark:border-pink-600 bg-gradient-to-b from-pink-50/70 via-white to-pink-50/30 dark:from-pink-950/30 dark:via-gray-900 dark:to-gray-900 shadow-lg";
        }
        return "border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm";
    };

    const getHeaderIcon = () => {
        if (isPremium) return <Sparkles className="h-6 w-6 text-amber-500 animate-pulse" />;
        if (isBasic) return <Zap className="h-6 w-6 text-pink-500" />;
        return <ShieldCheck className="h-6 w-6 text-slate-500" />;
    };

    return (
        <div className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${getCardStyle()}`}>
            {isPremium && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                    {t("mostPopular")}
                </div>
            )}

            <div className="space-y-4">
                {/* Title & Badge */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {getHeaderIcon()}
                        <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                            {plan.code}
                        </h3>
                    </div>
                    <Chip
                        label={plan.status}
                        size="small"
                        color={plan.status === "ACTIVE" ? "success" : "default"}
                        className="text-xs font-extrabold"
                    />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 dark:text-gray-400 min-h-[36px] line-clamp-2">
                    {plan.description}
                </p>

                {/* Pricing */}
                <div className="py-2 border-y border-gray-100 dark:border-gray-800">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-gray-900 dark:text-gray-100">
                            {formatCurrency(plan.priceAmount, plan.priceCurrency)}
                        </span>
                        {plan.durationDays && (
                            <span className="text-xs font-semibold text-gray-500">
                                {t("perDays", { days: plan.durationDays })}
                            </span>
                        )}
                    </div>
                </div>

                {/* Limits Feature List */}
                <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t("dailySpeakingLimit", { limit: plan.dailySpeakingQuestionEvaluationLimit })}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t("maxRecordingSeconds", { seconds: plan.maxSpeakingQuestionRecordingSeconds })}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t("maxConcurrentAiSessions", { count: plan.maxConcurrentAiSessionCount })}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t("maxTurnsPerAiSession", { turns: plan.maxTurnsPerAiSession })}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t("dailyAiSessionLimit", { limit: plan.dailyAiSessionEvaluationLimit })}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t("maxAiTurnSpeakingSeconds", { seconds: plan.maxAiTurnSpeakingSeconds })}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${plan.sampleAnswerEnabled ? "text-emerald-500" : "text-gray-300"} shrink-0`} />
                        <span className={plan.sampleAnswerEnabled ? "font-semibold" : "text-gray-400 line-through"}>
                            {plan.sampleAnswerEnabled ? t("sampleAnswerEnabled") : t("sampleAnswerDisabled")}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
