"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link } from "@/i18n/navigation";
import NotificationAudienceBadge from "@/modules/protected/system-notifications/components/notification.audience.badge";
import {
    formatRecipientCount,
    formatSentAt,
} from "@/modules/protected/system-notifications/utils/notification.format";
import { DASHBOARD_LINKS } from "../constants/dashboard.constant";
import { useDashboard } from "../providers/dashboard.provider";
import { formatNumber } from "../utils/dashboard.format";

const DashboardNotificationsPanel = () => {
    const t = useTranslations("dashboard.notifications");
    const { overview } = useDashboard();
    if (!overview) return null;

    const { sentThisMonth, totalRecipients, recent } = overview.notifications;
    const stats = [
        { label: t("sentThisMonth"), value: formatNumber(sentThisMonth) },
        { label: t("totalRecipients"), value: formatNumber(totalRecipients) },
    ];

    return (
        <div className="bg-bgc-app flex flex-col rounded-xl p-6">
            <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">{t("title")}</h2>
                <Link
                    href={DASHBOARD_LINKS.notifications}
                    className="text-text-muted hover:text-current flex items-center text-sm font-medium"
                >
                    {t("viewAll")}
                    <ChevronRightRoundedIcon sx={{ fontSize: 18 }} />
                </Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                {stats.map((item) => (
                    <div key={item.label} className="bg-bgc-page rounded-lg p-3">
                        <p className="text-text-muted text-xs">{item.label}</p>
                        <p className="mt-1 text-2xl font-bold">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex-1 space-y-2">
                {recent.length === 0 ? (
                    <p className="text-text-muted py-6 text-center text-sm">
                        {t("empty")}
                    </p>
                ) : (
                    recent.map((log) => (
                        <div
                            key={log.id}
                            className="hover:bg-hbgc-app flex items-center gap-3 rounded-lg px-2 py-2"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {log.title}
                                </p>
                                <p className="text-text-muted mt-0.5 text-xs">
                                    {formatSentAt(log.sentAt)} ·{" "}
                                    {formatRecipientCount(log.recipientCount)}
                                </p>
                            </div>
                            <NotificationAudienceBadge audience={log.audience} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DashboardNotificationsPanel;
