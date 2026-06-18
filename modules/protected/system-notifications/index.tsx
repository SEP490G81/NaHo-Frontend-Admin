"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Tab, Tabs } from "@mui/material";
import {
    SystemNotificationsProvider,
    useSystemNotifications,
} from "./providers/system.notifications.provider";
import { NotificationTab } from "./types/system.notifications.type";
import NotificationComposeForm from "./features/notification.compose.form";
import NotificationLogTable from "./features/notification.log.table";
import StreakEmailConfig from "./features/streak.email.config";

const SystemNotificationsContent = () => {
    const t = useTranslations("systemNotifications");
    const { activeTab, setActiveTab } = useSystemNotifications();

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app rounded-xl p-6">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-text-muted mt-1 text-sm">{t("description")}</p>
            </div>

            <Tabs
                value={activeTab}
                onChange={(_, value) => setActiveTab(value as NotificationTab)}
                sx={{
                    "& .MuiTabs-indicator": {
                        backgroundColor: "var(--color-bgc-highlight)",
                    },
                    "& .Mui-selected": {
                        color: "var(--color-bgc-highlight) !important",
                    },
                }}
            >
                <Tab value="compose" label={t("tabs.compose")} />
                <Tab value="streak" label={t("tabs.streak")} />
            </Tabs>

            {activeTab === "compose" ? (
                <div className="space-y-5">
                    <div className="bg-bgc-app rounded-xl p-6">
                        <h2 className="text-xl font-bold">
                            {t("compose.title")}
                        </h2>
                        <p className="text-text-muted mt-1 mb-5 text-sm">
                            {t("compose.description")}
                        </p>
                        <NotificationComposeForm />
                    </div>
                    <NotificationLogTable />
                </div>
            ) : (
                <StreakEmailConfig />
            )}
        </div>
    );
};

const SystemNotifications = () => {
    return (
        <SystemNotificationsProvider>
            <SystemNotificationsContent />
        </SystemNotificationsProvider>
    );
};

export default SystemNotifications;
