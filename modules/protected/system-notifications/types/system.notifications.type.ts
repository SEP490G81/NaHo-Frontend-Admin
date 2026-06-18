import { NotificationLogResponse } from "@/types/responses/notification.response";
import { SendNotificationRequest } from "@/types/requests/notification.request";

export type NotificationTab = "compose" | "streak";

export interface SystemNotificationsContextType {
    activeTab: NotificationTab;
    setActiveTab: (tab: NotificationTab) => void;
    logs: NotificationLogResponse[];
    isLoadingLogs: boolean;
    isSending: boolean;
    sendNotification: (request: SendNotificationRequest) => Promise<boolean>;
}
