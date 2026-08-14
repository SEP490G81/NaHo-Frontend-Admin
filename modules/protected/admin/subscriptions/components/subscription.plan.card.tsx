"use client";

import React from "react";
import { SubscriptionPlanResponse } from "@/types/responses/subscription.response";
import { Check, Edit3, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button, Chip } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";

interface SubscriptionPlanCardProps {
    readonly plan: SubscriptionPlanResponse;
}

export function SubscriptionPlanCard({ plan }: SubscriptionPlanCardProps) {
    const t = useTranslations("subscriptionManagement.card");
    const { openEditPlanModal } = useSubscriptionModal();

    const formatCurrency = (amount: number, currency: string) => {
        if (amount === 0) return t("free");
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency || "VND",
        }).format(amount);
    };

    const isBasic = plan.code === "BASIC";
    const isPremium = plan.code === "PREMIUM";

    const getCardStyle = () => {
        if (isPremium) {
            return "border-2 border-amber-400 dark:border-amber-600 bg-bgc-app shadow-xl scale-[1.02]";
        }
        if (isBasic) {
            return "border-2 border-bgc-highlight bg-bgc-app shadow-lg";
        }
        return "border border-bdc-primary bg-bgc-app shadow-sm";
    };

    const getHeaderIcon = () => {
        if (isPremium)
            return (
                <Sparkles className="h-6 w-6 animate-pulse text-amber-500" />
            );
        if (isBasic) return <Zap className="text-bgc-highlight h-6 w-6" />;
        return <ShieldCheck className="text-text-muted h-6 w-6" />;
    };

    return (
        <div
            className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${getCardStyle()}`}
        >
            {isPremium && (
                <div className="bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-md">
                    {t("mostPopular")}
                </div>
            )}

            <div className="space-y-4">
                {/* Title & Badge */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {getHeaderIcon()}
                        <h3 className="text-text-contrast text-xl font-black">
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
                <p className="text-text-muted line-clamp-2 min-h-[36px] text-xs">
                    {plan.description}
                </p>

                {/* Pricing */}
                <div className="border-bdc-primary border-y py-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-text-contrast text-3xl font-black">
                            {formatCurrency(
                                plan.priceAmount,
                                plan.priceCurrency,
                            )}
                        </span>
                        {plan.durationDays && (
                            <span className="text-text-muted text-xs font-semibold">
                                {t("perDays", { days: plan.durationDays })}
                            </span>
                        )}
                    </div>
                </div>

                {/* Limits Feature List */}
                <ul className="text-text-contrast space-y-2.5 text-xs">
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                            {t("dailySpeakingLimit", {
                                limit: plan.dailySpeakingQuestionEvaluationLimit,
                            })}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                            {t("maxRecordingSeconds", {
                                seconds:
                                    plan.maxSpeakingQuestionRecordingSeconds,
                            })}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                            {t("maxConcurrentAiSessions", {
                                count: plan.maxConcurrentAiSessionCount,
                            })}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                            {t("maxTurnsPerAiSession", {
                                turns: plan.maxTurnsPerAiSession,
                            })}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                            {t("dailyAiSessionLimit", {
                                limit: plan.dailyAiSessionEvaluationLimit,
                            })}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span>
                            {t("maxAiTurnSpeakingSeconds", {
                                seconds: plan.maxAiTurnSpeakingSeconds,
                            })}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Check
                            className={`h-4 w-4 ${plan.sampleAnswerEnabled ? "text-emerald-500" : "text-text-muted"} shrink-0`}
                        />
                        <span
                            className={
                                plan.sampleAnswerEnabled
                                    ? "font-semibold"
                                    : "text-text-muted line-through"
                            }
                        >
                            {plan.sampleAnswerEnabled
                                ? t("sampleAnswerEnabled")
                                : t("sampleAnswerDisabled")}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Action Button */}
            <div className="pt-4">
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit3 className="h-4 w-4" />}
                    onClick={() => openEditPlanModal(plan)}
                    sx={{
                        borderRadius: "16px",
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-contrast)",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            borderColor: "var(--color-bgc-highlight)",
                            color: "var(--color-bgc-highlight)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("editButton")}
                </Button>
            </div>
        </div>
    );
}

