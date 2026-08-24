"use client";

import React, { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import { ExternalLink, Image as ImageIcon, X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReportFileResponse } from "@/types/responses/report.response";

interface Props {
    readonly files: ReportFileResponse[];
}

/** Ảnh minh chứng người học đính kèm khi báo cáo, bấm vào để phóng to. */
export function ContentReportFileGallery({ files }: Props) {
    const t = useTranslations("contentReportManagement.detailsModal");
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    if (!files || files.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <h4 className="text-text-muted flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <ImageIcon className="h-4 w-4 text-blue-500" />
                <span>
                    {t("attachedFiles")} ({files.length})
                </span>
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className="bg-bgc-app border-bdc-primary group relative flex flex-col overflow-hidden rounded-xl border transition-all hover:shadow-md"
                    >
                        <button
                            type="button"
                            onClick={() => setPreviewImage(file.accessUrl)}
                            className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden bg-black/10"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={file.accessUrl}
                                alt={file.originalFileName}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <ZoomIn className="h-5 w-5" />
                                <span>{t("zoomIn")}</span>
                            </span>
                        </button>

                        <div className="border-bdc-primary bg-bgc-app flex items-center justify-between border-t p-3 text-xs">
                            <span
                                className="text-text-contrast max-w-[200px] truncate font-semibold"
                                title={file.originalFileName}
                            >
                                {file.originalFileName}
                            </span>
                            <a
                                href={file.accessUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-bgc-highlight flex shrink-0 items-center gap-1 font-medium hover:underline"
                            >
                                <span>{t("openLink")}</span>
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

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
                            alt={t("attachedFiles")}
                            className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                        />
                    </div>
                </Dialog>
            )}
        </div>
    );
}
