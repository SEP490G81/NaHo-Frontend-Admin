"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Divider,
    TextField,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import { X, ArrowUpCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUpgradeSubscriptionMutation } from "../hooks/use.subscription.mutation";

const PLAN_HIERARCHY: Record<string, number> = {
    FREE: 1,
    BASIC: 2,
    PREMIUM: 3,
};

export function SubscriptionUpgradeModal() {
    const t = useTranslations("subscriptionManagement.upgradeModal");
    const { upgradeTargetUser, closeUpgradeModal } = useSubscriptionModal();
    const mutation = useUpgradeSubscriptionMutation();

    const [selectedPlanCode, setSelectedPlanCode] = useState<string>("BASIC");
    const [durationDays, setDurationDays] = useState<number>(30);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (upgradeTargetUser) {
            const currentLevel = PLAN_HIERARCHY[upgradeTargetUser.currentPlanCode] || 1;
            if (currentLevel < 2) {
                setSelectedPlanCode("BASIC");
            } else if (currentLevel < 3) {
                setSelectedPlanCode("PREMIUM");
            }
            setErrorMessage("");
        }
    }, [upgradeTargetUser]);

    if (!upgradeTargetUser) return null;

    const currentLevel = PLAN_HIERARCHY[upgradeTargetUser.currentPlanCode] || 1;
    const isPremium = upgradeTargetUser.currentPlanCode === "PREMIUM";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const targetLevel = PLAN_HIERARCHY[selectedPlanCode] || 1;
        if (targetLevel <= currentLevel) {
            setErrorMessage(t("errorHigher", { target: selectedPlanCode, current: upgradeTargetUser.currentPlanCode }));
            return;
        }

        if (!durationDays || durationDays <= 0) {
            setErrorMessage(t("errorDuration"));
            return;
        }

        try {
            await mutation.mutateAsync({
                userId: upgradeTargetUser.userId,
                planCode: selectedPlanCode,
                durationDays: Number(durationDays),
            });
            closeUpgradeModal();
        } catch (err: any) {
            setErrorMessage(err?.detail || err?.message || t("errorFailed"));
        }
    };

    return (
        <Dialog
            open={Boolean(upgradeTargetUser)}
            onClose={closeUpgradeModal}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    className: "rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="flex items-center justify-between font-bold text-gray-900 dark:text-gray-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <ArrowUpCircle className="h-5 w-5 text-pink-500" />
                        <span>{t("title", { userId: upgradeTargetUser.userId })}</span>
                    </div>
                    <IconButton onClick={closeUpgradeModal} size="small">
                        <X className="h-4 w-4" />
                    </IconButton>
                </DialogTitle>
                <Divider />

                <DialogContent className="space-y-4 px-6 py-5">
                    {/* Current Plan Summary */}
                    <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs flex justify-between items-center">
                        <span className="text-gray-500">{t("currentPlanLabel")}</span>
                        <span className="font-bold text-pink-600 dark:text-pink-400 text-sm">
                            {upgradeTargetUser.currentPlanCode}
                        </span>
                    </div>

                    {errorMessage && (
                        <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Target Plan Select */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {t("targetPlanLabel")}
                        </label>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={selectedPlanCode}
                            onChange={(e) => setSelectedPlanCode(e.target.value)}
                            disabled={isPremium}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    fontSize: "0.85rem",
                                },
                            }}
                        >
                            {currentLevel < 2 && <MenuItem value="BASIC">BASIC (Gói cơ bản - 99k/tháng)</MenuItem>}
                            {currentLevel < 3 && <MenuItem value="PREMIUM">PREMIUM (Gói nâng cao - 249k/tháng)</MenuItem>}
                        </TextField>
                    </div>

                    {/* Duration Days Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {t("durationLabel")}
                        </label>
                        <TextField
                            type="number"
                            fullWidth
                            size="small"
                            value={durationDays}
                            onChange={(e) => setDurationDays(Number(e.target.value))}
                            placeholder={t("durationPlaceholder")}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    fontSize: "0.85rem",
                                },
                            }}
                        />
                    </div>
                </DialogContent>
                <Divider />
                <DialogActions className="px-6 py-4">
                    <Button onClick={closeUpgradeModal} variant="outlined" color="inherit">
                        {t("cancel")}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={mutation.isPending || isPremium}
                        startIcon={
                            mutation.isPending ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : (
                                <ArrowUpCircle className="h-4 w-4" />
                            )
                        }
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl"
                    >
                        {t("submitBtn")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
