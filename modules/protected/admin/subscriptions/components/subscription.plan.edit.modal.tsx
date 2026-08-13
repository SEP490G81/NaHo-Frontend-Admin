"use client";

import React, { useEffect, useState } from "react";
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

export function SubscriptionPlanEditModal() {
    const t = useTranslations("subscriptionManagement.editPlanModal");
    const { editingPlan, closeEditPlanModal } = useSubscriptionModal();
    const mutation = useUpdateSubscriptionPlanMutation();

    const [description, setDescription] = useState<string>("");
    const [tier, setTier] = useState<string>("FREE");
    const [priceAmount, setPriceAmount] = useState<number>(0);
    const [priceCurrency, setPriceCurrency] = useState<string>("VND");
    const [durationDays, setDurationDays] = useState<string>("");
    const [dailySpeakingLimit, setDailySpeakingLimit] = useState<number>(1);
    const [maxRecordingSecs, setMaxRecordingSecs] = useState<number>(45);
    const [maxConcurrentAi, setMaxConcurrentAi] = useState<number>(1);
    const [maxTurnsPerAi, setMaxTurnsPerAi] = useState<number>(5);
    const [dailyAiLimit, setDailyAiLimit] = useState<number>(1);
    const [maxAiSpeakingSecs, setMaxAiSpeakingSecs] = useState<number>(20);
    const [sampleAnswerEnabled, setSampleAnswerEnabled] =
        useState<boolean>(false);
    const [status, setStatus] = useState<string>("ACTIVE");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (editingPlan) {
            setDescription(editingPlan.description || "");
            setTier(editingPlan.tier || editingPlan.code || "FREE");
            setPriceAmount(editingPlan.priceAmount ?? 0);
            setPriceCurrency(editingPlan.priceCurrency || "VND");
            setDurationDays(
                editingPlan.durationDays !== null &&
                    editingPlan.durationDays !== undefined
                    ? String(editingPlan.durationDays)
                    : "",
            );
            setDailySpeakingLimit(
                editingPlan.dailySpeakingQuestionEvaluationLimit ?? 0,
            );
            setMaxRecordingSecs(
                editingPlan.maxSpeakingQuestionRecordingSeconds ?? 0,
            );
            setMaxConcurrentAi(editingPlan.maxConcurrentAiSessionCount ?? 0);
            setMaxTurnsPerAi(editingPlan.maxTurnsPerAiSession ?? 0);
            setDailyAiLimit(editingPlan.dailyAiSessionEvaluationLimit ?? 0);
            setMaxAiSpeakingSecs(editingPlan.maxAiTurnSpeakingSeconds ?? 0);
            setSampleAnswerEnabled(Boolean(editingPlan.sampleAnswerEnabled));
            setStatus(editingPlan.status || "ACTIVE");
            setErrorMessage("");
        }
    }, [editingPlan]);

    if (!editingPlan) return null;

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
                id: editingPlan.id,
                body: payload,
            });
            toast.success(t("successToast"));
            closeEditPlanModal();
        } catch (err: any) {
            const msg = err?.detail || err?.message || t("errorToast");
            setErrorMessage(msg);
            toast.error(msg);
        }
    };

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            fontSize: "0.85rem",
        },
    };

    return (
        <Dialog
            open={Boolean(editingPlan)}
            onClose={closeEditPlanModal}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-3xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl",
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                {/* Header */}
                <DialogTitle className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-bold text-gray-900 dark:border-gray-800 dark:text-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300">
                            <Edit3 className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">
                                {t("title", {
                                    id: editingPlan.id,
                                    tier: editingPlan.code,
                                })}
                            </h2>
                            <p className="text-xs font-normal text-gray-500">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>
                    <IconButton onClick={closeEditPlanModal} size="small">
                        <X className="h-4 w-4" />
                    </IconButton>
                </DialogTitle>

                <DialogContent className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-6">
                    {errorMessage && (
                        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Section 1: Basic Info & Pricing */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-pink-600 uppercase dark:text-pink-400">
                            <Layers className="h-4 w-4" />
                            <span>{t("sections.basicInfo")}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                    {t("fields.description")}
                                </label>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    size="small"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    sx={inputSx}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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

                    <Divider />

                    {/* Section 2: Quotas & Limits */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-pink-600 uppercase dark:text-pink-400">
                            <Sliders className="h-4 w-4" />
                            <span>{t("sections.quotas")}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                        setMaxRecordingSecs(
                                            Number(e.target.value),
                                        )
                                    }
                                    sx={inputSx}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                    {t("fields.maxConcurrentAiSessionCount")}
                                </label>
                                <TextField
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={maxConcurrentAi}
                                    onChange={(e) =>
                                        setMaxConcurrentAi(
                                            Number(e.target.value),
                                        )
                                    }
                                    sx={inputSx}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                    {t("fields.maxAiTurnSpeakingSeconds")}
                                </label>
                                <TextField
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={maxAiSpeakingSecs}
                                    onChange={(e) =>
                                        setMaxAiSpeakingSecs(
                                            Number(e.target.value),
                                        )
                                    }
                                    sx={inputSx}
                                />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    {/* Section 3: Advanced Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-pink-600 uppercase dark:text-pink-400">
                            <Sparkles className="h-4 w-4" />
                            <span>{t("sections.advanced")}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/40">
                            <div>
                                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200">
                                    {t("fields.sampleAnswerEnabled")}
                                </span>
                                <span className="block text-[11px] text-gray-500">
                                    Cho phép người dùng sử dụng gói này xem đáp
                                    án gợi ý mẫu trong quá trình học.
                                </span>
                            </div>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={sampleAnswerEnabled}
                                        onChange={(e) =>
                                            setSampleAnswerEnabled(
                                                e.target.checked,
                                            )
                                        }
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                        </div>
                    </div>
                </DialogContent>

                <DialogActions className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                    <Button
                        onClick={closeEditPlanModal}
                        variant="outlined"
                        color="inherit"
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
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 font-bold text-white hover:from-pink-600 hover:to-rose-600"
                    >
                        {mutation.isPending ? t("submitting") : t("submitBtn")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
