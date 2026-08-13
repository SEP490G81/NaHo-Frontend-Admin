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
    Switch,
    TextField,
} from "@mui/material";
import { CheckSquare, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReportDetail } from "../providers/report.detail.provider";
import { useReportStatusMutation } from "../hooks/use.report.mutation";

export function ReportResolveModal() {
    const t = useTranslations("reportManagement.resolveModal");
    const { selectedReportResolve, closeResolve } = useReportDetail();
    const mutation = useReportStatusMutation();

    const [adminReply, setAdminReply] = useState("");
    const [isResolved, setIsResolved] = useState(true);

    useEffect(() => {
        if (selectedReportResolve) {
            setAdminReply(selectedReportResolve.adminReply || "");
            setIsResolved(selectedReportResolve.isResolved ?? true);
        }
    }, [selectedReportResolve]);

    if (!selectedReportResolve) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedReportResolve) return;

        await mutation.mutateAsync({
            reportId: selectedReportResolve.id,
            body: {
                isResolved,
                adminReply: adminReply.trim(),
            },
        });

        closeResolve();
    };

    return (
        <Dialog
            open={Boolean(selectedReportResolve)}
            onClose={closeResolve}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="flex items-center justify-between px-6 py-4 font-bold text-gray-900 dark:text-gray-100">
                    <div className="flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-emerald-600" />
                        <span>
                            {t("title")} #{selectedReportResolve.id}
                        </span>
                    </div>
                    <IconButton onClick={closeResolve} size="small">
                        <X className="h-4 w-4" />
                    </IconButton>
                </DialogTitle>
                <Divider />

                <DialogContent className="space-y-4 px-6 py-5">
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs dark:border-gray-800 dark:bg-gray-800/40">
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                            {selectedReportResolve.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-gray-500">
                            {selectedReportResolve.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3 dark:border-gray-800">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
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
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
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
                    <Button
                        onClick={closeResolve}
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
                                <Send className="h-4 w-4" />
                            )
                        }
                        className="rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                    >
                        {t("submitBtn")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
