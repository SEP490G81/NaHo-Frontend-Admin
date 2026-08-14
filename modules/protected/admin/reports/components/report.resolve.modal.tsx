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
    Switch,
    TextField,
} from "@mui/material";
import { CheckSquare, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReportDetail } from "../providers/report.detail.provider";
import { useReportStatusMutation } from "../hooks/use.report.mutation";
import { ReportResponse } from "@/types/responses/report.response";

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

interface ReportResolveFormProps {
    readonly report: ReportResponse;
    readonly onClose: () => void;
}

function ReportResolveForm({ report, onClose }: ReportResolveFormProps) {
    const t = useTranslations("reportManagement.resolveModal");
    const mutation = useReportStatusMutation();

    const [adminReply, setAdminReply] = useState(report.adminReply || "");
    const [isResolved, setIsResolved] = useState(report.isResolved ?? true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await mutation.mutateAsync({
            reportId: report.id,
            body: {
                isResolved,
                adminReply: adminReply.trim(),
            },
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
                <IconButton onClick={onClose} size="small" className="text-text-muted">
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

                <div className="border-bdc-primary flex items-center justify-between rounded-xl border p-3">
                    <span className="text-text-contrast text-xs font-semibold">
                        {t("statusToggleLabel")}
                    </span>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isResolved}
                                onChange={(e) =>
                                    setIsResolved(e.target.checked)
                                }
                                color="success"
                            />
                        }
                        label={
                            <span
                                className={`text-xs font-bold ${isResolved ? "text-emerald-600" : "text-amber-600"}`}
                            >
                                {isResolved
                                    ? t("statusResolved")
                                    : t("statusUnresolved")}
                            </span>
                        }
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-text-contrast text-xs font-bold">
                        {t("replyInputLabel")}
                    </label>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        placeholder={t("replyPlaceholder")}
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
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

export function ReportResolveModal() {
    const { selectedReportResolve, closeResolve } = useReportDetail();

    if (!selectedReportResolve) return null;

    return (
        <Dialog
            open={Boolean(selectedReportResolve)}
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
            <ReportResolveForm
                key={selectedReportResolve.id}
                report={selectedReportResolve}
                onClose={closeResolve}
            />
        </Dialog>
    );
}


