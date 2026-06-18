import { ApiResponse } from "@/types/responses/base.response";
import {
    NotificationLogResponse,
    StreakEmailConfigResponse,
} from "@/types/responses/notification.response";
import {
    SendNotificationRequest,
    SendTestStreakEmailRequest,
    UpdateStreakEmailRequest,
} from "@/types/requests/notification.request";
import {
    storeGetStreakConfig,
    storeListNotificationLogs,
    storeSendNotification,
    storeUpdateStreakConfig,
} from "@/services/client/notification.mock.store";

// MOCK: dữ liệu lưu ở localStorage. TODO: thay phần ruột bằng fetch API khi BE sẵn sàng.
const buildMeta = (totalElements: number) => ({
    traceId: "mock-local",
    timestamp: new Date().toISOString(),
    pageMeta: { currentPage: 1, pageSize: 20, totalPages: 1, totalElements },
});

const ok = <T>(data: T, total = 0): ApiResponse<T> => ({
    meta: buildMeta(total),
    message: "OK (mock-local)",
    data,
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchNotificationLogs(): Promise<
    ApiResponse<NotificationLogResponse[]>
> {
    const data = storeListNotificationLogs();
    return ok(data, data.length);
}

export async function sendNotification(
    request: SendNotificationRequest,
): Promise<ApiResponse<NotificationLogResponse>> {
    return ok(storeSendNotification(request));
}

export async function fetchStreakConfig(): Promise<
    ApiResponse<StreakEmailConfigResponse>
> {
    return ok(storeGetStreakConfig());
}

export async function updateStreakConfig(
    request: UpdateStreakEmailRequest,
): Promise<ApiResponse<StreakEmailConfigResponse>> {
    return ok(storeUpdateStreakConfig(request));
}

export async function sendTestStreakEmail(
    request: SendTestStreakEmailRequest,
): Promise<ApiResponse<null>> {
    // MOCK: giả lập độ trễ gọi SMTP. TODO: gọi endpoint gửi thử thật.
    await delay(600);
    if (!request.email) throw new Error("Email không hợp lệ");
    return ok(null);
}
