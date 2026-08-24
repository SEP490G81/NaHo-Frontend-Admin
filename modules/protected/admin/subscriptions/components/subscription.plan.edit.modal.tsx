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
    FormControlLabel,
    IconButton,
    MenuItem,
    Switch,
    TextField,
} from "@mui/material";
import {
    AlertCircle,
    Edit3,
    Layers,
    ShieldCheck,
    Sliders,
    Sparkles,
    X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUpdateSubscriptionPlanMutation } from "../hooks/use.subscription.mutation";
import { UpdateSubscriptionPlanRequest } from "@/types/requests/subscription.request";
import { SubscriptionPlanResponse } from "@/types/responses/subscription.response";

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

interface EditPlanFormProps {
    readonly plan: SubscriptionPlanResponse;
    readonly onClose: () => void;
}

function EditPlanForm({ plan, onClose }: EditPlanFormProps) {
    const t = useTranslations("subscriptionManagement.editPlanModal");
    const mutation = useUpdateSubscriptionPlanMutation();

    const [description, setDescription] = useState<string>(
        plan.description || "",
    );
    const [tier, setTier] = useState<string>(plan.tier || plan.code || "FREE");
    const [priceAmount, setPriceAmount] = useState<number>(
        plan.priceAmount ?? 0,
    );
    const [priceCurrency, setPriceCurrency] = useState<string>(
        plan.priceCurrency || "VND",
    );
    const [durationDays, setDurationDays] = useState<string>(
        plan.durationDays !== null && plan.durationDays !== undefined
            ? String(plan.durationDays)
            : "",
    );
    const [dailySpeakingLimit, setDailySpeakingLimit] = useState<number>(
        plan.dailySpeakingQuestionEvaluationLimit ?? 0,
    );
    const [maxRecordingSecs, setMaxRecordingSecs] = useState<number>(
        plan.maxSpeakingQuestionRecordingSeconds ?? 0,
    );
    const [maxConcurrentAi, setMaxConcurrentAi] = useState<number>(
        plan.maxConcurrentAiSessionCount ?? 0,
    );
    const [maxTurnsPerAi, setMaxTurnsPerAi] = useState<number>(
        plan.maxTurnsPerAiSession ?? 0,
    );
    const [dailyAiLimit, setDailyAiLimit] = useState<number>(
        plan.dailyAiSessionEvaluationLimit ?? 0,
    );
    const [maxAiSpeakingSecs, setMaxAiSpeakingSecs] = useState<number>(
        plan.maxAiTurnSpeakingSeconds ?? 0,
    );
    const [sampleAnswerEnabled, setSampleAnswerEnabled] = useState<boolean>(
        Boolean(plan.sampleAnswerEnabled),
    );
    const [status, setStatus] = useState<string>(plan.status || "ACTIVE");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        const payload: UpdateSubscriptionPlanRequest = {
            description,
            tier,
            priceAmount: Number(priceAmount),
            priceCurrency,
            durationDays:
                durationDays.trim() === "" ? null : Number(durationDays),
            dailySpeakingQuestionEvaluationLimit: Number(dailySpeakingLimit),
            maxSpeakingQuestionRecordingSeconds: Number(maxRecordingSecs),
            maxConcurrentAiSessionCount: Number(maxConcurrentAi),
            maxTurnsPerAiSession: Number(maxTurnsPerAi),
            dailyAiSessionEvaluationLimit: Number(dailyAiLimit),
            maxAiTurnSpeakingSeconds: Number(maxAiSpeakingSecs),
            sampleAnswerEnabled,
            status,
        };

        try {
            await mutation.mutateAsync({
                id: plan.id,
                body: payload,
            });
            toast.success(t("successToast"));
            onClose();
        } catch (err: unknown) {
            const errorObj = err as { detail?: string; message?: string };
            const msg =
                errorObj?.detail || errorObj?.message || t("errorToast");
            setErrorMessage(msg);
            toast.error(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Header */}
            <DialogTitle className="text-text-contrast flex items-center justify-between px-6 py-4 font-bold">
                <div className="flex items-center gap-3">
                    <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-9 w-9 items-center justify-center rounded-xl font-bold">
                        <Edit3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">
                            {t("title", {
                                id: plan.id,
                                tier: plan.code,
                            })}
                        </h2>
                        <p className="text-text-muted text-xs font-normal">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
                <IconButton
                    onClick={onClose}
                    size="small"
                    className="text-text-muted"
                >
                    <X className="h-4 w-4" />
                </IconButton>
            </DialogTitle>
            <Divider className="border-bdc-primary" />

            <DialogContent className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-6">
                {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Section 1: Basic Info & Pricing */}
                <div className="space-y-3">
                    <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                        <Layers className="h-4 w-4" />
                        <span>{t("sections.basicInfo")}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.tier")}
                            </label>
                            <TextField
                                fullWidth
                                size="small"
                                value={tier}
                                onChange={(e) => setTier(e.target.value)}
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.status")}
                            </label>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                sx={inputSx}
                            >
                                <MenuItem value="ACTIVE">
                                    {t("statusOptions.ACTIVE")}
                                </MenuItem>
                                <MenuItem value="INACTIVE">
                                    {t("statusOptions.INACTIVE")}
                                </MenuItem>
                            </TextField>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.description")}
                            </label>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                size="small"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.priceAmount")}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={priceAmount}
                                onChange={(e) =>
                                    setPriceAmount(Number(e.target.value))
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.priceCurrency")}
                            </label>
                            <TextField
                                fullWidth
                                size="small"
                                value={priceCurrency}
                                onChange={(e) =>
                                    setPriceCurrency(e.target.value)
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.durationDays")}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={durationDays}
                                placeholder={t(
                                    "fields.durationDaysPlaceholder",
                                )}
                                onChange={(e) =>
                                    setDurationDays(e.target.value)
                                }
                                sx={inputSx}
                            />
                        </div>
                    </div>
                </div>

                <Divider className="border-bdc-primary" />

                {/* Section 2: Quotas & Limits */}
                <div className="space-y-3">
                    <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                        <Sliders className="h-4 w-4" />
                        <span>{t("sections.quotas")}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t(
                                    "fields.dailySpeakingQuestionEvaluationLimit",
                                )}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={dailySpeakingLimit}
                                onChange={(e) =>
                                    setDailySpeakingLimit(
                                        Number(e.target.value),
                                    )
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t(
                                    "fields.maxSpeakingQuestionRecordingSeconds",
                                )}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={maxRecordingSecs}
                                onChange={(e) =>
                                    setMaxRecordingSecs(Number(e.target.value))
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.maxConcurrentAiSessionCount")}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={maxConcurrentAi}
                                onChange={(e) =>
                                    setMaxConcurrentAi(Number(e.target.value))
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.maxTurnsPerAiSession")}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={maxTurnsPerAi}
                                onChange={(e) =>
                                    setMaxTurnsPerAi(Number(e.target.value))
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.dailyAiSessionEvaluationLimit")}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={dailyAiLimit}
                                onChange={(e) =>
                                    setDailyAiLimit(Number(e.target.value))
                                }
                                sx={inputSx}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-text-contrast text-xs font-bold">
                                {t("fields.maxAiTurnSpeakingSeconds")}
                            </label>
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                value={maxAiSpeakingSecs}
                                onChange={(e) =>
                                    setMaxAiSpeakingSecs(Number(e.target.value))
                                }
                                sx={inputSx}
                            />
                        </div>
                    </div>
                </div>

                <Divider className="border-bdc-primary" />

                {/* Section 3: Advanced Features */}
                <div className="space-y-3">
                    <div className="text-bgc-highlight flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
                        <Sparkles className="h-4 w-4" />
                        <span>{t("sections.advanced")}</span>
                    </div>
                    <div className="bg-bgc-app border-bdc-primary flex items-center justify-between rounded-2xl border p-4">
                        <div>
                            <span className="text-text-contrast block text-xs font-bold">
                                {t("fields.sampleAnswerEnabled")}
                            </span>
                            <span className="text-text-muted block text-[11px]">
                                Cho phép người dùng sử dụng gói này xem đáp án
                                gợi ý mẫu trong quá trình học.
                            </span>
                        </div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={sampleAnswerEnabled}
                                    onChange={(e) =>
                                        setSampleAnswerEnabled(e.target.checked)
                                    }
                                    color="primary"
                                />
                            }
                            label=""
                        />
                    </div>
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
                    disabled={mutation.isPending}
                    startIcon={
                        mutation.isPending ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <ShieldCheck className="h-4 w-4" />
                        )
                    }
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 3,
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {mutation.isPending ? t("submitting") : t("submitBtn")}
                </Button>
            </DialogActions>
        </form>
    );
}

export function SubscriptionPlanEditModal() {
    const { editingPlan, closeEditPlanModal } = useSubscriptionModal();

    if (!editingPlan) return null;

    return (
        <Dialog
            open={Boolean(editingPlan)}
            onClose={closeEditPlanModal}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-3xl bg-bgc-modal border border-bdc-primary shadow-2xl",
                },
            }}
        >
            <EditPlanForm
                key={editingPlan.id}
                plan={editingPlan}
                onClose={closeEditPlanModal}
            />
        </Dialog>
    );
}
