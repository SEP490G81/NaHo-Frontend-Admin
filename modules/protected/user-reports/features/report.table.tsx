"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { ReportResponse } from "@/types/responses/report.response";
import { useUserReports } from "../providers/user.reports.provider";
import ReportSenderCell from "../components/report.sender.cell";
import ReportTypeBadge from "../components/report.type.badge";
import ReportStatusBadge from "../components/report.status.badge";
import { formatReportedAt } from "../utils/report.format";

const highlightButtonSx = {
    textTransform: "none",
    bgcolor: "var(--color-bgc-highlight)",
    color: "var(--color-text-contrast)",
} as const;

const ReportTable = () => {
    const t = useTranslations("userReports.table");
    const {
        reports,
        isLoading,
        isUpdating,
        openDetail,
        startProcessing,
        resolveReport,
    } = useUserReports();

    if (isLoading) {
        return (
            <div className="flex justify-center py-16">
                <CircularProgress
                    size={28}
                    sx={{ color: "var(--color-bgc-highlight)" }}
                />
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <div className="text-text-muted flex flex-col items-center gap-2 py-16">
                <InboxOutlinedIcon fontSize="large" />
                <p className="text-sm">{t("empty")}</p>
            </div>
        );
    }

    const renderAction = (report: ReportResponse) => {
        if (report.status === "RESOLVED") {
            return (
                <span className="text-text-muted text-xs">
                    {t("completed")}
                </span>
            );
        }

        const isStart = report.status === "PENDING";
        const onClick = (event: React.MouseEvent) => {
            event.stopPropagation();
            void (isStart
                ? startProcessing(report.id)
                : resolveReport(report.id));
        };

        return (
            <Button
                size="small"
                variant="contained"
                disableElevation
                disabled={isUpdating}
                startIcon={
                    isStart ? (
                        <PlayArrowOutlinedIcon />
                    ) : (
                        <CheckCircleOutlineIcon />
                    )
                }
                onClick={onClick}
                sx={highlightButtonSx}
            >
                {isStart ? t("startProcessing") : t("markResolved")}
            </Button>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-sm">
                <thead>
                    <tr className="text-text-muted border-b text-left">
                        <th className="w-12" />
                        <th className="px-3 py-3 font-medium">
                            {t("colSender")}
                        </th>
                        <th className="px-3 py-3 font-medium">{t("colType")}</th>
                        <th className="px-3 py-3 font-medium">
                            {t("colDetail")}
                        </th>
                        <th className="px-3 py-3 font-medium whitespace-nowrap">
                            {t("colReportedAt")}
                        </th>
                        <th className="px-3 py-3 font-medium">
                            {t("colStatus")}
                        </th>
                        <th className="px-3 py-3 text-right font-medium">
                            {t("colAction")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr
                            key={report.id}
                            onClick={() => openDetail(report)}
                            className="hover:bg-hbgc-app cursor-pointer border-b transition-colors"
                        >
                            <ReportSenderCell
                                name={report.senderName}
                                email={report.senderEmail}
                            />
                            <td className="px-3 py-3">
                                <ReportTypeBadge type={report.type} />
                            </td>
                            <td className="px-3 py-3">
                                <p className="line-clamp-2 max-w-sm">
                                    {report.description}
                                </p>
                                <p className="text-text-muted mt-1 text-xs">
                                    {t("reportCode", { code: report.id })}
                                </p>
                            </td>
                            <td className="text-text-muted px-3 py-3 whitespace-nowrap">
                                {formatReportedAt(report.reportedAt)}
                            </td>
                            <td className="px-3 py-3">
                                <ReportStatusBadge status={report.status} />
                            </td>
                            <td className="px-3 py-3 text-right whitespace-nowrap">
                                {renderAction(report)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
