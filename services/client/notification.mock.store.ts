import {
    DEFAULT_STREAK_EMAIL_CONFIG,
    MOCK_NOTIFICATION_LOGS,
} from "@/app/api/_mock/notification.data";
import {
    NotificationLogResponse,
    StreakEmailConfigResponse,
} from "@/types/responses/notification.response";
import {
    SendNotificationRequest,
    UpdateStreakEmailRequest,
} from "@/types/requests/notification.request";
import { NotificationAudience } from "@/types/enums/notification.enum";

/**
 * Client-side mock persistence backed by localStorage.
 * TODO: replace these helpers with real API calls when BE is ready.
 */
// Bump the version suffix whenever the mock shape changes so stale
// localStorage data (e.g. records missing newer fields) gets re-seeded.
const LOG_KEY = "naho_mock_notification_logs_v1";
const CONFIG_KEY = "naho_mock_streak_email_config_v1";
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

/** Rough audience sizes used only to estimate the recipient count in mock mode. */
const AUDIENCE_SIZE: Record<NotificationAudience, number> = {
    ALL: 1284,
    LEARNER: 1252,
    TEACHER: 32,
};

const readLogs = (): NotificationLogResponse[] => {
    if (typeof window === "undefined") return clone(MOCK_NOTIFICATION_LOGS);
    const raw = window.localStorage.getItem(LOG_KEY);
    if (!raw) {
        window.localStorage.setItem(
            LOG_KEY,
            JSON.stringify(MOCK_NOTIFICATION_LOGS),
        );
        return clone(MOCK_NOTIFICATION_LOGS);
    }
    try {
        return JSON.parse(raw) as NotificationLogResponse[];
    } catch {
        return clone(MOCK_NOTIFICATION_LOGS);
    }
};

const writeLogs = (list: NotificationLogResponse[]) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(LOG_KEY, JSON.stringify(list));
    }
};

export const storeListNotificationLogs = (): NotificationLogResponse[] =>
    readLogs().sort((a, b) => b.sentAt.localeCompare(a.sentAt));

export const storeSendNotification = (
    request: SendNotificationRequest,
): NotificationLogResponse => {
    const isScheduled = Boolean(request.scheduledAt);
    const log: NotificationLogResponse = {
        id: `n-${Date.now()}`,
        title: request.title,
        content: request.content,
        audience: request.audience,
        status: isScheduled ? "SCHEDULED" : "SENT",
        sentAt: request.scheduledAt ?? new Date().toISOString(),
        recipientCount: AUDIENCE_SIZE[request.audience] ?? 0,
    };
    writeLogs([log, ...readLogs()]);
    return log;
};

const readConfig = (): StreakEmailConfigResponse => {
    if (typeof window === "undefined") return clone(DEFAULT_STREAK_EMAIL_CONFIG);
    const raw = window.localStorage.getItem(CONFIG_KEY);
    if (!raw) return clone(DEFAULT_STREAK_EMAIL_CONFIG);
    try {
        return JSON.parse(raw) as StreakEmailConfigResponse;
    } catch {
        return clone(DEFAULT_STREAK_EMAIL_CONFIG);
    }
};

export const storeGetStreakConfig = (): StreakEmailConfigResponse =>
    readConfig();

export const storeUpdateStreakConfig = (
    request: UpdateStreakEmailRequest,
): StreakEmailConfigResponse => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(CONFIG_KEY, JSON.stringify(request));
    }
    return request;
};
