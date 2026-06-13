import { SendNotificationState } from "../types/system.notifications.type";

export function validateSendNotificationForm(
    formData: FormData,
): SendNotificationState {
    const titleEntry = formData.get("title");
    const contentEntry = formData.get("content");

    const title = typeof titleEntry === "string" ? titleEntry : "";
    const content = typeof contentEntry === "string" ? contentEntry : "";

    const result: SendNotificationState = {
        title: { value: title, error: false },
        content: { value: content, error: false },
    };

    if (title.trim().length === 0) {
        result.title.error = true;
    }
    if (content.trim().length === 0) {
        result.content.error = true;
    }

    return result;
}
