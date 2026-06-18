import {
    NotificationAudience,
    NotificationStatus,
} from "@/types/enums/notification.enum";

export const NOTIFICATION_AUDIENCES: NotificationAudience[] = [
    "ALL",
    "LEARNER",
    "TEACHER",
];

/** Tailwind classes for the audience chip, keyed by audience */
export const NOTIFICATION_AUDIENCE_STYLE: Record<NotificationAudience, string> =
    {
        ALL: "bg-sky-100 text-sky-700",
        LEARNER: "bg-indigo-100 text-indigo-700",
        TEACHER: "bg-amber-100 text-amber-700",
    };

/** Tailwind classes for the status chip, keyed by status */
export const NOTIFICATION_STATUS_STYLE: Record<NotificationStatus, string> = {
    SENT: "bg-emerald-100 text-emerald-700",
    SCHEDULED: "bg-sky-100 text-sky-700",
    FAILED: "bg-rose-100 text-rose-700",
};

/** i18n key suffix per audience (under systemNotifications.audience) */
export const AUDIENCE_KEY: Record<
    NotificationAudience,
    "all" | "learner" | "teacher"
> = {
    ALL: "all",
    LEARNER: "learner",
    TEACHER: "teacher",
};

/** i18n key suffix per status (under systemNotifications.status) */
export const STATUS_KEY: Record<
    NotificationStatus,
    "sent" | "scheduled" | "failed"
> = {
    SENT: "sent",
    SCHEDULED: "scheduled",
    FAILED: "failed",
};

/** Inactivity-threshold slider bounds (days) */
export const STREAK_THRESHOLD_MIN = 1;
export const STREAK_THRESHOLD_MAX = 14;

/** Variables supported inside the streak email HTML body */
export const STREAK_EMAIL_VARIABLES = ["{{name}}", "{{days}}"] as const;

/** Sample values used to render the live preview */
export const PREVIEW_SAMPLE_NAME = "Minh Tuấn";
