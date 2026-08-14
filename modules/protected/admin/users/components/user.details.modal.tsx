"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { X } from "lucide-react";
import {
    UserLearningProgressResponse,
    UserResponse,
} from "@/types/responses/user.response";
import UserAccountInfoCard from "@/modules/protected/admin/users/components/user.account.info.card";
import UserLearningProgressCard from "@/modules/protected/admin/users/components/user.learning.progress.card";

interface UserDetailsModalProps {
    open: boolean;
    onClose: () => void;
    user: UserResponse | null;
    progress: UserLearningProgressResponse | null;
    isProgressLoading: boolean;
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            scroll="body"
            slotProps={{
                paper: {
                    className:
                        "bg-bgc-modal text-text-contrast border border-bdc-primary rounded-2xl shadow-2xl overflow-hidden",
                    sx: {
                        backgroundColor: "var(--color-bgc-modal)",
                        color: "var(--color-text-contrast)",
                        borderRadius: "20px",
                    },
                },
            }}
        >
            {/* Header with Title and Close Button */}
            <DialogTitle className="border-bdc-primary bg-bgc-app flex items-center justify-between border-b px-6 py-4">
                <span className="text-base font-bold tracking-wide">
                    {t("title")}
                </span>
                <IconButton
                    onClick={onClose}
                    size="small"
                    aria-label="close"
                    className="text-text-muted hover:text-text-contrast hover:bg-hbgc-app transition-colors"
                >
                    <X className="h-5 w-5" />
                </IconButton>
            </DialogTitle>

            <DialogContent style={{ padding: 0 }}>
                <div className="flex flex-col gap-5 p-5">
                    {/* 1. Account Information */}
                    <UserAccountInfoCard user={user} />

                    {/* 2. Learning Progress */}
                    <UserLearningProgressCard
                        progress={progress}
                        isLoading={isProgressLoading}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
