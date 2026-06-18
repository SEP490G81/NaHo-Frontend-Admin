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

// MOCK: dữ liệu lưu ở localStorage (notification.mock.store).
// TODO: khi BE sẵn sàng, thay phần ruột bằng fetch(...) qua proxy route,
// trả về result.data và throw ProblemDetail.detail khi !ok — giống user.service.ts.

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchNotificationLogs(): Promise<
    NotificationLogResponse[]
> {
    return storeListNotificationLogs();
}

export async function sendNotification(
    request: SendNotificationRequest,
): Promise<NotificationLogResponse> {
    return storeSendNotification(request);
}

export async function fetchStreakConfig(): Promise<StreakEmailConfigResponse> {
    return storeGetStreakConfig();
}

export async function updateStreakConfig(
    request: UpdateStreakEmailRequest,
): Promise<StreakEmailConfigResponse> {
    return storeUpdateStreakConfig(request);
}

export async function sendTestStreakEmail(
    request: SendTestStreakEmailRequest,
): Promise<void> {
    // MOCK: giả lập độ trễ gọi SMTP. TODO: gọi endpoint gửi thử thật.
    await delay(600);
    if (!request.email) throw new Error("Email không hợp lệ");
}
