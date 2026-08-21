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
    TextField,
} from "@mui/material";
import { AlertTriangle, CheckSquare, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { MIN_ADMIN_REPLY_LENGTH } from "../constants/content.report.constants";
import { useContentReportMutation } from "../hooks/use.content.report.mutation";
import { useContentReportById } from "../hooks/use.content.report.query";
import { useContentReportDetail } from "../providers/content.report.detail.provider";
import { ContentReport } from "../types/content.report.type";

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        fontSize: "0.85rem",
        backgroundColor: "var(--color-bgc-app)",
        color: "var(--color-text-contrast)",
        "& fieldset": { borderColor: "var(--color-bdc-primary)" },
        "&:hover fieldset": { borderColor: "var(--color-bgc-highlight)" },
        "&.Mui-focused fieldset": { borderColor: "var(--color-bgc-highlight)" },
    },
};

interface FormProps {
    readonly report: ContentReport;
    readonly onClose: () => void;
}

function ContentReportResolveForm({ report, onClose }: FormProps) {
    const t = useTranslations("contentReportManagement.resolveModal");
    const mutation = useContentReportMutation();

    const [adminReply, setAdminReply] = useState("");
    const [showError, setShowError] = useState(false);

    const isReplyTooShort = adminReply.trim().length < MIN_ADMIN_REPLY_LENGTH;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isReplyTooShort) {
            setShowError(true);
            return;
        }

        await mutation.mutateAsync({
            reportId: report.id,
            body: { isResolved: true, adminReply: adminReply.trim() },
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle className="text-text-contrast flex items-center justify-between px-6 py-4 font-bold">
                <div className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-emerald-600" />
                    <span>
                        {t("title")} #{report.id}
                    </span>
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

            <DialogContent className="space-y-4 px-6 py-5">
                <div className="bg-bgc-app border-bdc-primary rounded-xl border p-3 text-xs">
                    <p className="text-text-contrast font-bold">
                        {report.title}
                    </p>
                    <p className="text-text-muted mt-0.5 line-clamp-2">
                        {report.description}
                    </p>
                </div>

                {/* Backend không cho phép mở lại báo cáo đã xử lý và tự gửi email
                    cho người báo cáo, nên phải cảnh báo trước khi xác nhận. */}
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="space-y-1">
                        <p className="font-bold">{t("warningTitle")}</p>
                        <p>{t("warningIrreversible")}</p>
                        <p>{t("warningEmail")}</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="content-report-admin-reply"
                        className="text-text-contrast text-xs font-bold"
                    >
                        {t("replyInputLabel")}
                    </label>
                    <TextField
                        id="content-report-admin-reply"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder={t("replyPlaceholder")}
                        value={adminReply}
                        onChange={(e) => {
                            setAdminReply(e.target.value);
                            setShowError(false);
                        }}
                        error={showError && isReplyTooShort}
                        helperText={
                            showError && isReplyTooShort
                                ? t("replyRequired", {
                                      min: MIN_ADMIN_REPLY_LENGTH,
                                  })
                                : t("replyHint")
                        }
                        size="small"
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
                    disabled={mutation.isPending}
                    startIcon={
                        mutation.isPending ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )
                    }
                    className="rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                >
                    {t("submitBtn")}
                </Button>
            </DialogActions>
        </form>
    );
}

export function ContentReportResolveModal() {
    const { resolveReportId, closeResolve } = useContentReportDetail();
    const report = useContentReportById(resolveReportId);

    if (!report) {
        return null;
    }

    return (
        <Dialog
            open
            onClose={closeResolve}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-2xl bg-bgc-modal border border-bdc-primary shadow-xl",
                },
            }}
        >
            <ContentReportResolveForm
                key={report.id}
                report={report}
                onClose={closeResolve}
            />
        </Dialog>
    );
}
