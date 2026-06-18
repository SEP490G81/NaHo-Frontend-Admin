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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    fetchNotificationLogs,
    sendNotification as sendNotificationService,
} from "@/services/client/notification.service";
import { queryKeys } from "@/libs/query.keys";
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
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<NotificationTab>("compose");

    const logsQuery = useQuery({
        queryKey: queryKeys.systemNotifications.logs,
        queryFn: fetchNotificationLogs,
    });

    useEffect(() => {
        if (logsQuery.isError) toast.error(t("loadError"));
    }, [logsQuery.isError, t]);

    const logs = useMemo<NotificationLogResponse[]>(
        () => logsQuery.data ?? [],
        [logsQuery.data],
    );

    const sendMutation = useMutation({
        mutationFn: (request: SendNotificationRequest) =>
            sendNotificationService(request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.systemNotifications.logs,
            });
            toast.success(t("sendSuccess"));
        },
        onError: (error) =>
            toast.error(error instanceof Error ? error.message : t("sendError")),
    });

    const sendNotification = useCallback(
        async (request: SendNotificationRequest): Promise<boolean> => {
            try {
                await sendMutation.mutateAsync(request);
                return true;
            } catch {
                return false;
            }
        },
        [sendMutation],
    );

    const value = useMemo<SystemNotificationsContextType>(
        () => ({
            activeTab,
            setActiveTab,
            logs,
            isLoadingLogs: logsQuery.isLoading,
            isSending: sendMutation.isPending,
            sendNotification,
        }),
        [
            activeTab,
            logs,
            logsQuery.isLoading,
            sendMutation.isPending,
            sendNotification,
        ],
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
