"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useUserReports } from "../providers/user.reports.provider";
import ReportTypeBadge from "../components/report.type.badge";
import ReportStatusBadge from "../components/report.status.badge";
import { formatReportedAt } from "../utils/report.format";

const highlightButtonSx = {
    textTransform: "none",
    bgcolor: "var(--color-bgc-highlight)",
    color: "var(--color-text-contrast)",
} as const;

const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-bgc-page rounded-lg p-3">
        <p className="text-text-muted text-xs tracking-wide uppercase">
            {label}
        </p>
        <p className="mt-1 text-sm font-medium break-words">{value}</p>
    </div>
);

const ReportDetailDrawer = () => {
    const t = useTranslations("userReports.detail");
    const {
        selectedReport,
        closeDetail,
        isUpdating,
        startProcessing,
        resolveReport,
        reopenReport,
    } = useUserReports();

    const report = selectedReport;

    return (
        <Drawer
            anchor="right"
            open={Boolean(report)}
            onClose={closeDetail}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "100%", sm: 460 },
                        backgroundColor: "var(--color-bgc-app)",
                        backgroundImage: "none",
                    },
                },
            }}
        >
            {report && (
                <div className="flex h-full flex-col">
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-text-muted text-xs">
                                    {t("reportCode")}{" "}
                                    <span className="font-semibold">
                                        {report.id}
                                    </span>
                                </p>
                                <h2 className="mt-1 text-xl font-bold break-words">
                                    {report.senderName}
                                </h2>
                                <p className="text-text-muted text-sm break-words">
                                    {report.senderEmail}
                                </p>
                            </div>
                            <IconButton size="small" onClick={closeDetail}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <ReportTypeBadge type={report.type} />
                            <ReportStatusBadge status={report.status} />
                            <span className="text-text-muted text-xs">
                                {formatReportedAt(report.reportedAt)}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mt-6 space-y-2">
                            <p className="text-text-muted text-sm font-semibold">
                                {t("userDescription")}
                            </p>
                            <p className="bg-bgc-page rounded-lg p-3 text-sm leading-relaxed">
                                {report.description}
                            </p>
                        </div>

                        {/* Device info — auto-captured from the browser */}
                        <div className="mt-6 space-y-2">
                            <div className="text-text-muted flex items-center gap-2 text-sm font-semibold">
                                <LanguageOutlinedIcon fontSize="small" />
                                <span>{t("deviceInfo")}</span>
                            </div>
                            <p className="text-text-muted text-xs">
                                {t("deviceCaptured")}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <InfoField
                                    label={t("deviceBrowser")}
                                    value={report.device.browser}
                                />
                                <InfoField
                                    label={t("deviceVersion")}
                                    value={report.device.browserVersion}
                                />
                                <InfoField
                                    label={t("deviceOs")}
                                    value={report.device.os}
                                />
                                <InfoField
                                    label={t("deviceScreen")}
                                    value={report.device.screenSize}
                                />
                                <InfoField
                                    label={t("deviceLanguage")}
                                    value={report.device.language}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sticky workflow actions */}
                    <div className="border-t p-4">
                        {report.status === "PENDING" && (
                            <div className="flex gap-3">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    disabled={isUpdating}
                                    startIcon={<CheckCircleOutlineIcon />}
                                    onClick={() => void resolveReport(report.id)}
                                    sx={{
                                        textTransform: "none",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("markResolved")}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    disableElevation
                                    loading={isUpdating}
                                    startIcon={<PlayArrowOutlinedIcon />}
                                    onClick={() =>
                                        void startProcessing(report.id)
                                    }
                                    sx={highlightButtonSx}
                                >
                                    {t("startProcessing")}
                                </Button>
                            </div>
                        )}
                        {report.status === "IN_PROGRESS" && (
                            <Button
                                fullWidth
                                variant="contained"
                                disableElevation
                                loading={isUpdating}
                                startIcon={<CheckCircleOutlineIcon />}
                                onClick={() => void resolveReport(report.id)}
                                sx={highlightButtonSx}
                            >
                                {t("markResolved")}
                            </Button>
                        )}
                        {report.status === "RESOLVED" && (
                            <Button
                                fullWidth
                                variant="outlined"
                                disabled={isUpdating}
                                startIcon={<ReplayOutlinedIcon />}
                                onClick={() => void reopenReport(report.id)}
                                sx={{
                                    textTransform: "none",
                                    color: "text.primary",
                                }}
                            >
                                {t("reopen")}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Drawer>
    );
};

export default ReportDetailDrawer;
