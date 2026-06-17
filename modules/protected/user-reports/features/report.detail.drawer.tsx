"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Checkbox,
    Drawer,
    FormControlLabel,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useUserReports } from "../providers/user.reports.provider";
import ReportTypeBadge from "../components/report.type.badge";
import ReportStatusBadge from "../components/report.status.badge";
import {
    formatRelativeTime,
    formatReportedAt,
    getAgeDays,
} from "../utils/report.format";
import { STALE_THRESHOLD_DAYS } from "../constants/user.reports.constant";

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
        selectedRelated,
        closeDetail,
        isUpdating,
        startProcessing,
        resolveReport,
        reopenReport,
    } = useUserReports();
    const [notifySender, setNotifySender] = useState(true);

    const report = selectedReport;
    const isStale =
        report != null &&
        report.status !== "RESOLVED" &&
        getAgeDays(report.reportedAt) >= STALE_THRESHOLD_DAYS;

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
                            {isStale && (
                                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                                    {t("stale")}
                                </span>
                            )}
                            <span className="text-text-muted text-xs">
                                {formatReportedAt(report.reportedAt)} ·{" "}
                                {formatRelativeTime(report.reportedAt)}
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

                        {/* Screenshot the learner attached, if any */}
                        {report.screenshotUrl && (
                            <div className="mt-6 space-y-2">
                                <div className="text-text-muted flex items-center gap-2 text-sm font-semibold">
                                    <ImageOutlinedIcon fontSize="small" />
                                    <span>{t("screenshot")}</span>
                                </div>
                                <a
                                    href={report.screenshotUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={report.screenshotUrl}
                                        alt={t("screenshot")}
                                        className="border-bdc-muted max-h-56 w-full rounded-lg border object-cover"
                                    />
                                </a>
                            </div>
                        )}

                        {/* Priority signal — how widespread / repeated this is */}
                        {selectedRelated && (
                            <div className="mt-6 space-y-2">
                                <div className="text-text-muted flex items-center gap-2 text-sm font-semibold">
                                    <InsightsOutlinedIcon fontSize="small" />
                                    <span>{t("priorityInfo")}</span>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <p className="bg-bgc-page flex-1 rounded-lg px-3 py-2 text-sm">
                                        {t("sameTypeCount", {
                                            count: selectedRelated.sameType,
                                        })}
                                    </p>
                                    <p className="bg-bgc-page flex-1 rounded-lg px-3 py-2 text-sm">
                                        {t("sameSenderCount", {
                                            count: selectedRelated.sameSender,
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Reproduction context — auto-captured app + device state */}
                        <div className="mt-6 space-y-2">
                            <div className="text-text-muted flex items-center gap-2 text-sm font-semibold">
                                <LanguageOutlinedIcon fontSize="small" />
                                <span>{t("contextInfo")}</span>
                            </div>
                            <p className="text-text-muted text-xs">
                                {t("deviceCaptured")}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <InfoField
                                    label={t("ctxFeature")}
                                    value={report.context.feature}
                                />
                                <InfoField
                                    label={t("ctxAppVersion")}
                                    value={report.context.appVersion}
                                />
                                <div className="col-span-2">
                                    <InfoField
                                        label={t("ctxRoute")}
                                        value={report.context.route}
                                    />
                                </div>
                                <InfoField
                                    label={t("deviceBrowser")}
                                    value={`${report.device.browser} ${report.device.browserVersion}`}
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

                    <div className="border-t p-4">
                        {report.status !== "RESOLVED" && (
                            <FormControlLabel
                                className="mb-1"
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={notifySender}
                                        onChange={(e) =>
                                            setNotifySender(e.target.checked)
                                        }
                                        sx={{
                                            "&.Mui-checked": {
                                                color: "var(--color-bgc-highlight)",
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <span className="text-text-muted text-sm">
                                        {t("notifySender")}
                                    </span>
                                }
                            />
                        )}
                        {report.status === "PENDING" && (
                            <div className="flex gap-3">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    disabled={isUpdating}
                                    startIcon={<CheckCircleOutlineIcon />}
                                    onClick={() =>
                                    void resolveReport(report.id, notifySender)
                                }
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
                                onClick={() =>
                                    void resolveReport(report.id, notifySender)
                                }
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
