import React from "react";
import { useTranslations } from "next-intl";
import { NotificationStatus } from "@/types/enums/notification.enum";
import {
    NOTIFICATION_STATUS_STYLE,
    STATUS_KEY,
} from "../constants/system.notifications.constant";

const NotificationStatusBadge = ({
    status,
}: {
    status: NotificationStatus;
}) => {
    const t = useTranslations("systemNotifications.status");
    const key = STATUS_KEY[status] ?? "sent";
    const style = NOTIFICATION_STATUS_STYLE[status] ?? NOTIFICATION_STATUS_STYLE.SENT;

    return (
        <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
        >
            {t(key)}
        </span>
    );
};

export default NotificationStatusBadge;
