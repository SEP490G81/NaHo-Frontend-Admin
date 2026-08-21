"use client";

import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from "@mui/material";
import { CheckCircle2, FileText, Flag, MessageSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContentReportFileGallery } from "../components/content.report.file.gallery";
import { ContentReportStatusBadge } from "../components/content.report.status.badge";
import { ContentReportTypeBadge } from "../components/content.report.type.badge";
import { useContentReportById } from "../hooks/use.content.report.query";
import { useContentReportDetail } from "../providers/content.report.detail.provider";
import { ContentReportTargetPanel } from "./content.report.target.panel";

export function ContentReportDetailsModal() {
    const t = useTranslations("contentReportManagement.detailsModal");
    const { detailReportId, closeDetail, openResolve } =
        useContentReportDetail();
    const report = useContentReportById(detailReportId);

    if (!report) {
        return null;
    }

    const handleResolveClick = () => {
        closeDetail();
        openResolve(report.id);
    };

    return (
        <Dialog
            open
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
                    <Flag className="text-bgc-highlight h-5 w-5" />
                    <span>
                        {t("title")} #{report.id}
                    </span>
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
                <div className="bg-bgc-app border-bdc-primary flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-10 w-10 items-center justify-center rounded-xl font-bold">
                            #{report.id}
                        </div>
                        <div>
                            <h3 className="text-text-contrast text-base font-bold">
                                {report.title}
                            </h3>
                            <p className="text-text-muted mt-0.5 text-xs">
                                {t("reporter")}{" "}
                                <strong className="text-text-contrast">
                                    {report.fullName ||
                                        `User #${report.userId}`}
                                </strong>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ContentReportTypeBadge
                            reportType={report.reportType}
                        />
                        <ContentReportStatusBadge
                            isResolved={report.isResolved}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-text-muted flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                        <FileText className="text-bgc-highlight h-4 w-4" />
                        <span>{t("descriptionLabel")}</span>
                    </h4>
                    <div className="bg-bgc-app border-bdc-primary text-text-contrast rounded-xl border p-4 text-sm leading-relaxed whitespace-pre-wrap">
                        {report.description}
                    </div>
                </div>

                <ContentReportTargetPanel report={report} />

                <ContentReportFileGallery files={report.files ?? []} />

                {report.adminReply && (
                    <div className="space-y-2">
                        <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                            <MessageSquare className="h-4 w-4" />
                            <span>{t("adminReplyLabel")}</span>
                        </h4>
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-sm whitespace-pre-wrap text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                            {report.adminReply}
                        </div>
                    </div>
                )}
            </DialogContent>
            <Divider className="border-bdc-primary" />
            <DialogActions className="flex justify-between px-6 py-4">
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
                {!report.isResolved && (
                    <Button
                        onClick={handleResolveClick}
                        variant="contained"
                        startIcon={<CheckCircle2 className="h-4 w-4" />}
                        className="rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                    >
                        {t("resolveReportBtn")}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
