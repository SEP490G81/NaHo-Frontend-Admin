import {
    NotificationAudience,
    NotificationStatus,
} from "@/types/enums/notification.enum";

export interface NotificationLogResponse {
    id: string;
    title: string;
    content: string;
    audience: NotificationAudience;
    status: NotificationStatus;
    /** ISO timestamp the notification was sent (or scheduled) at */
    sentAt: string;
    /** Estimated number of recipients reached */
    recipientCount: number;
}

export interface StreakEmailConfigResponse {
    subject: string;
    /** Days of inactivity before the reminder email is sent */
    inactivityThreshold: number;
    /** Raw HTML body, supports {{name}} and {{days}} variables */
    htmlBody: string;
}
