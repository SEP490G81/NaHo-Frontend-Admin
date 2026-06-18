"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    fetchNotificationLogs,
    sendNotification as sendNotificationService,
} from "@/services/client/notification.service";
import { NotificationLogResponse } from "@/types/responses/notification.response";
import { SendNotificationRequest } from "@/types/requests/notification.request";
import {
    NotificationTab,
    SystemNotificationsContextType,
} from "../types/system.notifications.type";

const SystemNotificationsContext =
    createContext<SystemNotificationsContextType | null>(null);

const SystemNotificationsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const t = useTranslations("systemNotifications.compose");
    const [activeTab, setActiveTab] = useState<NotificationTab>("compose");
    const [logs, setLogs] = useState<NotificationLogResponse[]>([]);
    const [isLoadingLogs, setIsLoadingLogs] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        setIsLoadingLogs(true);
        fetchNotificationLogs()
            .then((result) => setLogs(result.data))
            .catch(() => toast.error(t("loadError")))
            .finally(() => setIsLoadingLogs(false));
    }, [t]);

    const sendNotification = useCallback(
        async (request: SendNotificationRequest): Promise<boolean> => {
            setIsSending(true);
            try {
                const result = await sendNotificationService(request);
                setLogs((prev) => [result.data, ...prev]);
                toast.success(t("sendSuccess"));
                return true;
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : t("sendError"),
                );
                return false;
            } finally {
                setIsSending(false);
            }
        },
        [t],
    );

    const value = useMemo<SystemNotificationsContextType>(
        () => ({
            activeTab,
            setActiveTab,
            logs,
            isLoadingLogs,
            isSending,
            sendNotification,
        }),
        [activeTab, logs, isLoadingLogs, isSending, sendNotification],
    );

    return (
        <SystemNotificationsContext.Provider value={value}>
            {children}
        </SystemNotificationsContext.Provider>
    );
};

export { SystemNotificationsProvider };

export const useSystemNotifications = (): SystemNotificationsContextType => {
    const ctx = useContext(SystemNotificationsContext);
    if (!ctx)
        throw new Error(
            "useSystemNotifications must be used within SystemNotificationsProvider",
        );
    return ctx;
};
