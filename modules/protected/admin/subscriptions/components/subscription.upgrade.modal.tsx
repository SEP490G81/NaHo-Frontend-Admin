"use client";

import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    MenuItem,
    TextField,
} from "@mui/material";
import { AlertCircle, ArrowUpCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUpgradeSubscriptionMutation } from "../hooks/use.subscription.mutation";

const PLAN_HIERARCHY: Record<string, number> = {
    FREE: 1,
    BASIC: 2,
    PREMIUM: 3,
};

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontSize: "0.85rem",
        backgroundColor: "var(--color-bgc-app)",
        color: "var(--color-text-contrast)",
        "& fieldset": { borderColor: "var(--color-bdc-primary)" },
        "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-bgc-highlight)",
        },
    },
    "& .MuiInputLabel-root": {
        color: "var(--color-text-muted)",
        fontSize: "0.85rem",
        "&.Mui-focused": { color: "var(--color-bgc-highlight)" },
    },
    "& .MuiSelect-icon": { color: "var(--color-text-muted)" },
};

interface UpgradeFormProps {
    readonly targetUser: {
        readonly userId: number;
        readonly currentPlanCode: string;
    };
    readonly onClose: () => void;
}

function UpgradeForm({ targetUser, onClose }: UpgradeFormProps) {
    const t = useTranslations("subscriptionManagement.upgradeModal");
    const mutation = useUpgradeSubscriptionMutation();

    const currentLevel = PLAN_HIERARCHY[targetUser.currentPlanCode] || 1;
    const isPremium = targetUser.currentPlanCode === "PREMIUM";

    const [selectedPlanCode, setSelectedPlanCode] = useState<string>(
        currentLevel < 2 ? "BASIC" : "PREMIUM",
    );
    const [durationDays, setDurationDays] = useState<number>(30);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const targetLevel = PLAN_HIERARCHY[selectedPlanCode] || 1;
        if (targetLevel <= currentLevel) {
            setErrorMessage(
                t("errorHigher", {
                    target: selectedPlanCode,
                    current: targetUser.currentPlanCode,
                }),
            );
            return;
        }

        if (!durationDays || durationDays <= 0) {
            setErrorMessage(t("errorDuration"));
            return;
        }

        try {
            await mutation.mutateAsync({
                userId: targetUser.userId,
                planCode: selectedPlanCode,
                durationDays: Number(durationDays),
            });
            onClose();
        } catch (err: unknown) {
            const errorObj = err as { detail?: string; message?: string };
            setErrorMessage(errorObj?.detail || errorObj?.message || t("errorFailed"));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle className="text-text-contrast flex items-center justify-between px-6 py-4 font-bold">
                <div className="flex items-center gap-2">
                    <ArrowUpCircle className="text-bgc-highlight h-5 w-5" />
                    <span>
                        {t("title", { userId: targetUser.userId })}
                    </span>
                </div>
                <IconButton onClick={onClose} size="small" className="text-text-muted">
                    <X className="h-4 w-4" />
                </IconButton>
            </DialogTitle>
            <Divider className="border-bdc-primary" />

            <DialogContent className="space-y-4 px-6 py-5">
                {/* Current Plan Summary */}
                <div className="bg-bgc-app border-bdc-primary flex items-center justify-between rounded-xl border p-3 text-xs">
                    <span className="text-text-muted">
                        {t("currentPlanLabel")}
                    </span>
                    <span className="text-bgc-highlight text-sm font-bold">
                        {targetUser.currentPlanCode}
                    </span>
                </div>

                {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Target Plan Select */}
                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("targetPlanLabel")}
                    </label>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        value={selectedPlanCode}
                        onChange={(e) =>
                            setSelectedPlanCode(e.target.value)
                        }
                        disabled={isPremium}
                        sx={inputSx}
                    >
                        {currentLevel < 2 && (
                            <MenuItem value="BASIC">
                                BASIC (Gói cơ bản - 99k/tháng)
                            </MenuItem>
                        )}
                        {currentLevel < 3 && (
                            <MenuItem value="PREMIUM">
                                PREMIUM (Gói nâng cao - 249k/tháng)
                            </MenuItem>
                        )}
                    </TextField>
                </div>

                {/* Duration Days Input */}
                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("durationLabel")}
                    </label>
                    <TextField
                        type="number"
                        fullWidth
                        size="small"
                        value={durationDays}
                        onChange={(e) =>
                            setDurationDays(Number(e.target.value))
                        }
                        placeholder={t("durationPlaceholder")}
                        sx={inputSx}
                    />
                </div>
            </DialogContent>
            <Divider className="border-bdc-primary" />
            <DialogActions className="px-6 py-4">
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: "10px",
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-contrast)",
                        textTransform: "none",
                    }}
                >
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
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {t("submitBtn")}
                </Button>
            </DialogActions>
        </form>
    );
}

export function SubscriptionUpgradeModal() {
    const { upgradeTargetUser, closeUpgradeModal } = useSubscriptionModal();

    if (!upgradeTargetUser) return null;

    return (
        <Dialog
            open={Boolean(upgradeTargetUser)}
            onClose={closeUpgradeModal}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-2xl bg-bgc-modal border border-bdc-primary shadow-xl",
                },
            }}
        >
            <UpgradeForm
                key={upgradeTargetUser.userId}
                targetUser={upgradeTargetUser}
                onClose={closeUpgradeModal}
            />
        </Dialog>
    );
}

