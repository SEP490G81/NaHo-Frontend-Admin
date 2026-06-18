const NotificationAudience = Object.freeze({
    ALL: "ALL",
    LEARNER: "LEARNER",
    TEACHER: "TEACHER",
});
export type NotificationAudience =
    (typeof NotificationAudience)[keyof typeof NotificationAudience];

const NotificationStatus = Object.freeze({
    SENT: "SENT",
    SCHEDULED: "SCHEDULED",
    FAILED: "FAILED",
});
export type NotificationStatus =
    (typeof NotificationStatus)[keyof typeof NotificationStatus];
