import { FormTextField } from "@/types/ui/ui.type";
import { NotificationLogResponse } from "@/types/responses/notification.response";
import { SendNotificationRequest } from "@/types/requests/notification.request";

export type NotificationTab = "compose" | "streak";

export interface SendNotificationState {
    title: FormTextField;
    content: FormTextField;
}

export interface SystemNotificationsContextType {
    activeTab: NotificationTab;
    setActiveTab: (tab: NotificationTab) => void;
    logs: NotificationLogResponse[];
    isLoadingLogs: boolean;
    isSending: boolean;
    sendNotification: (request: SendNotificationRequest) => Promise<boolean>;
}
