"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@mui/material";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import { useSystemNotifications } from "../providers/system.notifications.provider";
import NotificationAudienceBadge from "../components/notification.audience.badge";
import NotificationStatusBadge from "../components/notification.status.badge";
import {
    formatRecipientCount,
    formatSentAt,
} from "../utils/notification.format";

const NotificationLogTable = () => {
    const t = useTranslations("systemNotifications.log");
    const { logs, isLoadingLogs } = useSystemNotifications();

    return (
        <div className="bg-bgc-app rounded-xl p-6">
            <h2 className="text-xl font-bold">{t("title")}</h2>
            <p className="text-text-muted mt-1 text-sm">{t("description")}</p>

            {isLoadingLogs ? (
                <div className="flex justify-center py-12">
                    <CircularProgress
                        size={28}
                        sx={{ color: "var(--color-bgc-highlight)" }}
                    />
                </div>
            ) : logs.length === 0 ? (
                <div className="text-text-muted flex flex-col items-center gap-2 py-12">
                    <MarkChatReadOutlinedIcon fontSize="large" />
                    <p className="text-sm">{t("empty")}</p>
                </div>
            ) : (
                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[680px] border-collapse text-sm">
                        <thead>
                            <tr className="text-text-muted border-b text-left">
                                <th className="px-3 py-3 font-medium">
                                    {t("colSentAt")}
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    {t("colTitle")}
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    {t("colAudience")}
                                </th>
                                <th className="px-3 py-3 text-right font-medium">
                                    {t("colRecipients")}
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    {t("colStatus")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-hbgc-app border-b transition-colors"
                                >
                                    <td className="text-text-muted px-3 py-3 whitespace-nowrap">
                                        {formatSentAt(log.sentAt)}
                                    </td>
                                    <td className="px-3 py-3 font-medium">
                                        {log.title}
                                    </td>
                                    <td className="px-3 py-3">
                                        <NotificationAudienceBadge
                                            audience={log.audience}
                                        />
                                    </td>
                                    <td className="text-text-muted px-3 py-3 text-right whitespace-nowrap">
                                        {formatRecipientCount(log.recipientCount)}
                                    </td>
                                    <td className="px-3 py-3">
                                        <NotificationStatusBadge
                                            status={log.status}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NotificationLogTable;
