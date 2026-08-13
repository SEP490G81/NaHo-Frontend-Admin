"use client";

import React from "react";
import {
    Avatar,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from "@mui/material";
import {
    Calendar,
    CheckCircle2,
    CreditCard,
    Mail,
    User as UserIcon,
    UserCheck,
    X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePaymentDetail } from "../providers/payment.detail.provider";
import { PaymentStatusBadge } from "./payment.status.badge";
import { useUserDetailById } from "../hooks/use.user.detail.by.id";
import { UserStatus } from "@/types/enums/user.enum";

export function PaymentDetailsModal() {
    const t = useTranslations("paymentManagement.detailsModal");
    const { isDetailOpen, selectedPayment, closeDetail } = usePaymentDetail();

    const { data: user, isLoading: isUserLoading } = useUserDetailById(
        selectedPayment?.userId ?? null,
    );

    if (!selectedPayment) return null;

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency || "VND",
        }).format(amount);
    };

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return t("unspecified");
        return new Date(dateStr).toLocaleString("vi-VN");
    };

    const isUserActive = user?.status === UserStatus.ACTIVE;

    return (
        <Dialog
            open={isDetailOpen}
            onClose={closeDetail}
            maxWidth="md"
            fullWidth
            scroll="body"
            slotProps={{
                paper: {
                    className:
                        "rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                },
            }}
        >
            <DialogTitle className="flex items-center justify-between px-6 py-4 font-bold text-gray-900 dark:text-gray-100">
                <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[var(--color-bgc-highlight)]" />
                    <span>{t("title")}</span>
                </div>
                <IconButton onClick={closeDetail} size="small">
                    <X className="h-4 w-4" />
                </IconButton>
            </DialogTitle>
            <Divider />

            <DialogContent className="space-y-6 px-6 py-5">
                {/* 1. Header Payment Info Card */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                {t("orderCode")}
                            </p>
                            <p className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">
                                {selectedPayment.orderCode}
                            </p>
                        </div>
                        <PaymentStatusBadge status={selectedPayment.status} />
                    </div>
                </div>

                {/* 2. User Details Section */}
                <div className="space-y-3">
                    <h3 className="flex items-center gap-2 border-l-4 border-[var(--color-bgc-highlight)] pl-2 text-sm font-bold text-gray-900 dark:text-gray-100">
                        <UserIcon className="h-4 w-4 text-[var(--color-bgc-highlight)]" />
                        <span>{t("userInfoSection")}</span>
                    </h3>

                    {isUserLoading ? (
                        <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800">
                            <CircularProgress
                                size={28}
                                className="text-pink-500"
                            />
                        </div>
                    ) : user ? (
                        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/40">
                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <Avatar
                                    src={user.avatarUrl ?? undefined}
                                    alt={user.fullName ?? user.username}
                                    sx={{ width: 60, height: 60 }}
                                    className="border border-pink-200 dark:border-pink-900"
                                />
                                <div className="flex flex-col items-center gap-1 sm:items-start">
                                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                                        {user.fullName ?? user.username}
                                    </h4>
                                    <span className="text-xs text-gray-500">
                                        @{user.username}
                                    </span>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        {user.role?.roleName && (
                                            <Chip
                                                label={user.role.roleName}
                                                size="small"
                                                className="bg-pink-100 text-xs font-semibold text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                                            />
                                        )}
                                        <Chip
                                            label={
                                                isUserActive
                                                    ? "ACTIVE"
                                                    : user.status || "UNACTIVE"
                                            }
                                            size="small"
                                            color={
                                                isUserActive
                                                    ? "success"
                                                    : "error"
                                            }
                                            className="text-xs font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-2 text-xs sm:grid-cols-2 dark:border-gray-800">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Mail className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                    <span className="font-semibold">
                                        {t("email")}:
                                    </span>
                                    <span className="truncate">
                                        {user.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle2
                                        className={`h-3.5 w-3.5 ${user.isEmailVerified ? "text-emerald-500" : "text-rose-500"} shrink-0`}
                                    />
                                    <span className="font-semibold">
                                        Xác thực Email:
                                    </span>
                                    <span>
                                        {user.isEmailVerified
                                            ? "Đã xác thực"
                                            : "Chưa xác thực"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <UserCheck className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                    <span className="font-semibold">
                                        {t("gender")}:
                                    </span>
                                    <span>
                                        {user.gender || t("unspecified")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                    <span className="font-semibold">
                                        {t("dob")}:
                                    </span>
                                    <span>{user.dob || t("unspecified")}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-400">
                            <span>
                                User ID:{" "}
                                <strong>#{selectedPayment.userId}</strong>{" "}
                                (Không tìm thấy thông tin chi tiết tài khoản).
                            </span>
                        </div>
                    )}
                </div>

                {/* 3. Transaction Details Grid */}
                <div className="space-y-3">
                    <h3 className="flex items-center gap-2 border-l-4 border-[var(--color-bgc-highlight)] pl-2 text-sm font-bold text-gray-900 dark:text-gray-100">
                        <CreditCard className="h-4 w-4 text-[var(--color-bgc-highlight)]" />
                        <span>{t("paymentSection")}</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                            <span className="text-xs font-medium text-gray-500">
                                {t("planId")}
                            </span>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Plan #{selectedPayment.subscriptionPlanId}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                            <span className="text-xs font-medium text-gray-500">
                                {t("amount")}
                            </span>
                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(
                                    selectedPayment.amount,
                                    selectedPayment.currency,
                                )}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                            <span className="text-xs font-medium text-gray-500">
                                {t("provider")}
                            </span>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {selectedPayment.provider}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                            <span className="text-xs font-medium text-gray-500">
                                {t("transactionId")}
                            </span>
                            <p className="truncate font-mono text-xs font-semibold text-gray-900 dark:text-gray-100">
                                {selectedPayment.providerTransactionId ||
                                    t("unspecified")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Timeline Information */}
                <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/30 p-4 text-xs dark:border-gray-800 dark:bg-gray-800/20">
                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            {t("createdTime")}:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(selectedPayment.createdTime)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            {t("expiresTime")}:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(selectedPayment.expiresTime)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">{t("paidTime")}:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(selectedPayment.paidTime)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            {t("modifiedTime")}:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(selectedPayment.modifiedTime)}
                        </span>
                    </div>
                </div>
            </DialogContent>
            <Divider />
            <DialogActions className="px-6 py-4">
                <Button
                    onClick={closeDetail}
                    variant="outlined"
                    color="inherit"
                >
                    {t("close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
