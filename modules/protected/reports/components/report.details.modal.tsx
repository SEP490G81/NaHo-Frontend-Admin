"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Divider,
} from "@mui/material";
import {
    X,
    Flag,
    FileText,
    Image as ImageIcon,
    ExternalLink,
    MessageSquare,
    CheckCircle2,
    ZoomIn,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useReportDetail } from "../providers/report.detail.provider";
import { ReportStatusBadge } from "./report.status.badge";
import { ReportFileResponse } from "@/types/responses/report.response";

export function ReportDetailsModal() {
    const t = useTranslations("reportManagement.detailsModal");
    const { selectedReportDetail, closeDetail, openResolve } = useReportDetail();
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
                        className: "rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
                    },
                }}
            >
                <DialogTitle className="flex items-center justify-between font-bold text-gray-900 dark:text-gray-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-pink-500" />
                        <span>{t("title")} #{selectedReportDetail.id}</span>
                    </div>
                    <IconButton onClick={closeDetail} size="small">
                        <X className="h-4 w-4" />
                    </IconButton>
                </DialogTitle>
                <Divider />

                <DialogContent className="space-y-6 px-6 py-5">
                    {/* Header Info */}
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300 font-bold">
                                #{selectedReportDetail.id}
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                                    {selectedReportDetail.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Người báo cáo: <strong className="text-gray-700 dark:text-gray-300">{selectedReportDetail.fullName || `User #${selectedReportDetail.userId}`}</strong>
                                </p>
                            </div>
                        </div>
                        <ReportStatusBadge isResolved={selectedReportDetail.isResolved} />
                    </div>

                    {/* Report Description */}
                    <div className="space-y-2">
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <FileText className="h-4 w-4 text-pink-500" />
                            <span>{t("descriptionLabel")}</span>
                        </h4>
                        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 bg-white dark:bg-gray-800/40 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                            {selectedReportDetail.description}
                        </div>
                    </div>

                    {/* DIRECT EMBEDDED IMAGES / ATTACHMENTS */}
                    {selectedReportDetail.files && selectedReportDetail.files.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                <ImageIcon className="h-4 w-4 text-blue-500" />
                                <span>{t("attachedFiles")} ({selectedReportDetail.files.length})</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {selectedReportDetail.files.map((file: ReportFileResponse) => {
                                    const isImage = file.contentType?.startsWith("image/") || Boolean(file.accessUrl);

                                    return (
                                        <div
                                            key={file.id}
                                            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 transition-all hover:shadow-md"
                                        >
                                            {/* Direct Image Preview Header */}
                                            {isImage ? (
                                                <div
                                                    className="relative h-48 w-full cursor-pointer overflow-hidden bg-gray-900/5 dark:bg-black/40 flex items-center justify-center"
                                                    onClick={() => setPreviewImage(file.accessUrl)}
                                                >
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={file.accessUrl}
                                                        alt={file.originalFileName}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                                                        <ZoomIn className="h-5 w-5" />
                                                        <span>Phóng to</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex h-24 items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                                                    <ImageIcon className="h-8 w-8" />
                                                </div>
                                            )}

                                            {/* File Info Bar */}
                                            <div className="flex items-center justify-between p-3 text-xs bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                                                <span className="truncate font-semibold text-gray-700 dark:text-gray-300 max-w-[200px]" title={file.originalFileName}>
                                                    {file.originalFileName}
                                                </span>
                                                <a
                                                    href={file.accessUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1 text-pink-600 hover:text-pink-700 font-medium hover:underline shrink-0"
                                                >
                                                    <span>Mở link</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Admin Reply Section */}
                    {selectedReportDetail.adminReply && (
                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                <MessageSquare className="h-4 w-4" />
                                <span>{t("adminReplyLabel")}</span>
                            </h4>
                            <div className="rounded-xl border border-emerald-200 p-4 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 text-sm text-emerald-900 dark:text-emerald-200 whitespace-pre-wrap">
                                {selectedReportDetail.adminReply}
                            </div>
                        </div>
                    )}
                </DialogContent>
                <Divider />
                <DialogActions className="px-6 py-4 flex justify-between">
                    <Button onClick={closeDetail} variant="outlined" color="inherit">
                        {t("close")}
                    </Button>
                    {!selectedReportDetail.isResolved && (
                        <Button
                            onClick={handleResolveClick}
                            variant="contained"
                            startIcon={<CheckCircle2 className="h-4 w-4" />}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
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
                    <div className="relative p-2 bg-black/95 flex flex-col items-center justify-center min-h-[50vh]">
                        <IconButton
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/90 z-10"
                        >
                            <X className="h-6 w-6" />
                        </IconButton>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={previewImage}
                            alt="Attachment zoomed"
                            className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </Dialog>
            )}
        </>
    );
}
