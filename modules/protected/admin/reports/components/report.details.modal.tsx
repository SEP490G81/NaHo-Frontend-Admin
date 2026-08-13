"use client";

import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from "@mui/material";
import {
    CheckCircle2,
    ExternalLink,
    FileText,
    Flag,
    Image as ImageIcon,
    MessageSquare,
    X,
    ZoomIn,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useReportDetail } from "../providers/report.detail.provider";
import { ReportStatusBadge } from "./report.status.badge";
import { ReportFileResponse } from "@/types/responses/report.response";

export function ReportDetailsModal() {
    const t = useTranslations("reportManagement.detailsModal");
    const { selectedReportDetail, closeDetail, openResolve } =
        useReportDetail();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    if (!selectedReportDetail) return null;

    const handleResolveClick = () => {
        const currentReport = selectedReportDetail;
        closeDetail();
        openResolve(currentReport);
    };

    return (
        <>
            <Dialog
                open={Boolean(selectedReportDetail)}
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
                        <Flag className="h-5 w-5 text-pink-500" />
                        <span>
                            {t("title")} #{selectedReportDetail.id}
                        </span>
                    </div>
                    <IconButton onClick={closeDetail} size="small">
                        <X className="h-4 w-4" />
                    </IconButton>
                </DialogTitle>
                <Divider />

                <DialogContent className="space-y-6 px-6 py-5">
                    {/* Header Info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600 dark:bg-pink-950 dark:text-pink-300">
                                #{selectedReportDetail.id}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                                    {selectedReportDetail.title}
                                </h3>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    Người báo cáo:{" "}
                                    <strong className="text-gray-700 dark:text-gray-300">
                                        {selectedReportDetail.fullName ||
                                            `User #${selectedReportDetail.userId}`}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <ReportStatusBadge
                            isResolved={selectedReportDetail.isResolved}
                        />
                    </div>

                    {/* Report Description */}
                    <div className="space-y-2">
                        <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                            <FileText className="h-4 w-4 text-pink-500" />
                            <span>{t("descriptionLabel")}</span>
                        </h4>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed whitespace-pre-wrap text-gray-800 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-200">
                            {selectedReportDetail.description}
                        </div>
                    </div>

                    {/* DIRECT EMBEDDED IMAGES / ATTACHMENTS */}
                    {selectedReportDetail.files &&
                        selectedReportDetail.files.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                    <ImageIcon className="h-4 w-4 text-blue-500" />
                                    <span>
                                        {t("attachedFiles")} (
                                        {selectedReportDetail.files.length})
                                    </span>
                                </h4>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {selectedReportDetail.files.map(
                                        (file: ReportFileResponse) => {
                                            const isImage =
                                                file.contentType?.startsWith(
                                                    "image/",
                                                ) || Boolean(file.accessUrl);

                                            return (
                                                <div
                                                    key={file.id}
                                                    className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50"
                                                >
                                                    {/* Direct Image Preview Header */}
                                                    {isImage ? (
                                                        <div
                                                            className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden bg-gray-900/5 dark:bg-black/40"
                                                            onClick={() =>
                                                                setPreviewImage(
                                                                    file.accessUrl,
                                                                )
                                                            }
                                                        >
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                src={
                                                                    file.accessUrl
                                                                }
                                                                alt={
                                                                    file.originalFileName
                                                                }
                                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                                <ZoomIn className="h-5 w-5" />
                                                                <span>
                                                                    Phóng to
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-24 items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-800">
                                                            <ImageIcon className="h-8 w-8" />
                                                        </div>
                                                    )}

                                                    {/* File Info Bar */}
                                                    <div className="flex items-center justify-between border-t border-gray-100 bg-white p-3 text-xs dark:border-gray-800 dark:bg-gray-900">
                                                        <span
                                                            className="max-w-[200px] truncate font-semibold text-gray-700 dark:text-gray-300"
                                                            title={
                                                                file.originalFileName
                                                            }
                                                        >
                                                            {
                                                                file.originalFileName
                                                            }
                                                        </span>
                                                        <a
                                                            href={
                                                                file.accessUrl
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex shrink-0 items-center gap-1 font-medium text-pink-600 hover:text-pink-700 hover:underline"
                                                        >
                                                            <span>Mở link</span>
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        )}

                    {/* Admin Reply Section */}
                    {selectedReportDetail.adminReply && (
                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                                <MessageSquare className="h-4 w-4" />
                                <span>{t("adminReplyLabel")}</span>
                            </h4>
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-sm whitespace-pre-wrap text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                                {selectedReportDetail.adminReply}
                            </div>
                        </div>
                    )}
                </DialogContent>
                <Divider />
                <DialogActions className="flex justify-between px-6 py-4">
                    <Button
                        onClick={closeDetail}
                        variant="outlined"
                        color="inherit"
                    >
                        {t("close")}
                    </Button>
                    {!selectedReportDetail.isResolved && (
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

            {/* Image Zoom Lightbox Sub-Modal */}
            {previewImage && (
                <Dialog
                    open={Boolean(previewImage)}
                    onClose={() => setPreviewImage(null)}
                    maxWidth="lg"
                >
                    <div className="relative flex min-h-[50vh] flex-col items-center justify-center bg-black/95 p-2">
                        <IconButton
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-3 right-3 z-10 bg-black/60 text-white hover:bg-black/90"
                        >
                            <X className="h-6 w-6" />
                        </IconButton>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={previewImage}
                            alt="Attachment zoomed"
                            className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}
