import { NotificationAudience } from "@/types/enums/notification.enum";

export interface SendNotificationRequest {
    title: string;
    content: string;
    audience: NotificationAudience;
    /** ISO timestamp to schedule the send; omit to send immediately */
    scheduledAt?: string;
}

export interface UpdateStreakEmailRequest {
    subject: string;
    inactivityThreshold: number;
    htmlBody: string;
}

export interface SendTestStreakEmailRequest {
    /** Address that should receive the preview email */
    email: string;
}
