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
import ContainerBox from "@/components/ui/container.box";
import { useSubscriptionModal } from "../providers/subscription.modal.provider";
import { useUserSubscriptionQuery } from "../hooks/use.subscription.query";
import { SubscriptionPlanBadge } from "./subscription.plan.badge";

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
};

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
        <ContainerBox>
            <div className="space-y-4">
                <div className="flex flex-col gap-1">
                    <h3 className="text-text-contrast flex items-center gap-2 text-base font-bold">
                        <UserCheck className="text-bgc-highlight h-5 w-5" />
                        <span>{t("title")}</span>
                    </h3>
                    <p className="text-text-muted text-xs">
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
                        sx={inputSx}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search className="text-text-muted h-4 w-4" />
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
                        {t("searchButton")}
                    </Button>
                </form>

                {/* Display Lookup Results */}
                {lookupUserId && (
                    <div className="bg-bgc-app border-bdc-primary space-y-4 rounded-xl border p-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <CircularProgress
                                    size={24}
                                    className="text-bgc-highlight"
                                />
                            </div>
                        ) : isError || !userSub ? (
                            <div className="flex items-center gap-2 text-xs text-amber-600">
                                <ShieldAlert className="h-4 w-4 shrink-0" />
                                <span>{t("notFound", { id: lookupUserId })}</span>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="space-y-1 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="text-text-contrast text-sm font-bold">
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
                                    <div className="text-text-muted flex flex-wrap items-center gap-4 pt-1">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="text-text-muted h-3.5 w-3.5" />
                                            <span>
                                                {t("startTime", {
                                                    time: formatDate(
                                                        userSub.startTime,
                                                    ),
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="text-text-muted h-3.5 w-3.5" />
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
                                    sx={{
                                        borderRadius: "10px",
                                        backgroundColor: "var(--color-bgc-highlight)",
                                        color: "#fff",
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        px: 2,
                                        py: 1,
                                        "&:hover": {
                                            backgroundColor: "var(--color-bgc-highlight)",
                                            opacity: 0.9,
                                        },
                                        "&.Mui-disabled": {
                                            backgroundColor: "var(--color-bdc-primary)",
                                            color: "var(--color-text-muted)",
                                        },
                                    }}
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
        </ContainerBox>
    );
}

