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
                        "rounded-2xl bg-bgc-modal border border-bdc-primary shadow-xl",
                },
            }}
        >
            <DialogTitle className="text-text-contrast flex items-center justify-between px-6 py-4 font-bold">
                <div className="flex items-center gap-2">
                    <CreditCard className="text-bgc-highlight h-5 w-5" />
                    <span>{t("title")}</span>
                </div>
                <IconButton
                    onClick={closeDetail}
                    size="small"
                    className="text-text-muted"
                >
                    <X className="h-4 w-4" />
                </IconButton>
            </DialogTitle>
            <Divider className="border-bdc-primary" />

            <DialogContent className="space-y-6 px-6 py-5">
                {/* 1. Header Payment Info Card */}
                <div className="bg-bgc-app border-bdc-primary rounded-xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-text-muted text-xs font-semibold tracking-wider uppercase">
                                {t("orderCode")}
                            </p>
                            <p className="text-text-contrast font-mono text-lg font-bold">
                                {selectedPayment.orderCode}
                            </p>
                        </div>
                        <PaymentStatusBadge status={selectedPayment.status} />
                    </div>
                </div>

                {/* 2. User Details Section */}
                <div className="space-y-3">
                    <h3 className="border-bgc-highlight text-text-contrast flex items-center gap-2 border-l-4 pl-2 text-sm font-bold">
                        <UserIcon className="text-bgc-highlight h-4 w-4" />
                        <span>{t("userInfoSection")}</span>
                    </h3>

                    {isUserLoading ? (
                        <div className="bg-bgc-app border-bdc-primary flex items-center justify-center rounded-xl border p-6">
                            <CircularProgress
                                size={28}
                                className="text-bgc-highlight"
                            />
                        </div>
                    ) : user ? (
                        <div className="bg-bgc-app border-bdc-primary space-y-4 rounded-xl border p-4">
                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <Avatar
                                    src={user.avatarUrl ?? undefined}
                                    alt={user.fullName ?? user.username}
                                    sx={{ width: 60, height: 60 }}
                                    className="border-bdc-primary border"
                                />
                                <div className="flex flex-col items-center gap-1 sm:items-start">
                                    <h4 className="text-text-contrast text-base font-bold">
                                        {user.fullName ?? user.username}
                                    </h4>
                                    <span className="text-text-muted text-xs">
                                        @{user.username}
                                    </span>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        {user.role?.roleName && (
                                            <Chip
                                                label={user.role.roleName}
                                                size="small"
                                                className="bg-bgc-highlight/10 text-bgc-highlight text-xs font-semibold"
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

                            <div className="border-bdc-primary grid grid-cols-1 gap-3 border-t pt-2 text-xs sm:grid-cols-2">
                                <div className="text-text-contrast flex items-center gap-2">
                                    <Mail className="text-text-muted h-3.5 w-3.5 shrink-0" />
                                    <span className="font-semibold">
                                        {t("email")}:
                                    </span>
                                    <span className="truncate">
                                        {user.email}
                                    </span>
                                </div>
                                <div className="text-text-contrast flex items-center gap-2">
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
                                <div className="text-text-contrast flex items-center gap-2">
                                    <UserCheck className="text-text-muted h-3.5 w-3.5 shrink-0" />
                                    <span className="font-semibold">
                                        {t("gender")}:
                                    </span>
                                    <span>
                                        {user.gender || t("unspecified")}
                                    </span>
                                </div>
                                <div className="text-text-contrast flex items-center gap-2">
                                    <Calendar className="text-text-muted h-3.5 w-3.5 shrink-0" />
                                    <span className="font-semibold">
                                        {t("dob")}:
                                    </span>
                                    <span>{user.dob || t("unspecified")}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-bgc-app border-bdc-primary text-text-muted rounded-xl border p-4 text-xs">
                            <span>
                                User ID:{" "}
                                <strong className="text-text-contrast">
                                    #{selectedPayment.userId}
                                </strong>{" "}
                                (Không tìm thấy thông tin chi tiết tài khoản).
                            </span>
                        </div>
                    )}
                </div>

                {/* 3. Transaction Details Grid */}
                <div className="space-y-3">
                    <h3 className="border-bgc-highlight text-text-contrast flex items-center gap-2 border-l-4 pl-2 text-sm font-bold">
                        <CreditCard className="text-bgc-highlight h-4 w-4" />
                        <span>{t("paymentSection")}</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border-bdc-primary bg-bgc-app rounded-xl border p-3">
                            <span className="text-text-muted text-xs font-medium">
                                {t("planId")}
                            </span>
                            <p className="text-text-contrast text-sm font-semibold">
                                Plan #{selectedPayment.subscriptionPlanId}
                            </p>
                        </div>
                        <div className="border-bdc-primary bg-bgc-app rounded-xl border p-3">
                            <span className="text-text-muted text-xs font-medium">
                                {t("amount")}
                            </span>
                            <p className="text-sm font-bold text-emerald-600">
                                {formatCurrency(
                                    selectedPayment.amount,
                                    selectedPayment.currency,
                                )}
                            </p>
                        </div>
                        <div className="border-bdc-primary bg-bgc-app rounded-xl border p-3">
                            <span className="text-text-muted text-xs font-medium">
                                {t("provider")}
                            </span>
                            <p className="text-text-contrast text-sm font-semibold">
                                {selectedPayment.provider}
                            </p>
                        </div>
                        <div className="border-bdc-primary bg-bgc-app rounded-xl border p-3">
                            <span className="text-text-muted text-xs font-medium">
                                {t("transactionId")}
                            </span>
                            <p className="text-text-contrast truncate font-mono text-xs font-semibold">
                                {selectedPayment.providerTransactionId ||
                                    t("unspecified")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Timeline Information */}
                <div className="border-bdc-primary bg-bgc-app space-y-2 rounded-xl border p-4 text-xs">
                    <div className="flex justify-between">
                        <span className="text-text-muted">
                            {t("createdTime")}:
                        </span>
                        <span className="text-text-contrast font-medium">
                            {formatDate(selectedPayment.createdTime)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-muted">
                            {t("expiresTime")}:
                        </span>
                        <span className="text-text-contrast font-medium">
                            {formatDate(selectedPayment.expiresTime)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-muted">
                            {t("paidTime")}:
                        </span>
                        <span className="text-text-contrast font-medium">
                            {formatDate(selectedPayment.paidTime)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-muted">
                            {t("modifiedTime")}:
                        </span>
                        <span className="text-text-contrast font-medium">
                            {formatDate(selectedPayment.modifiedTime)}
                        </span>
                    </div>
                </div>
            </DialogContent>
            <Divider className="border-bdc-primary" />
            <DialogActions className="px-6 py-4">
                <Button
                    onClick={closeDetail}
                    variant="outlined"
                    sx={{
                        borderRadius: "10px",
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-contrast)",
                        textTransform: "none",
                    }}
                >
                    {t("close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
