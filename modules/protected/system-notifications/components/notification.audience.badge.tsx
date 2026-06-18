import React from "react";
import { useTranslations } from "next-intl";
import { NotificationAudience } from "@/types/enums/notification.enum";
import {
    AUDIENCE_KEY,
    NOTIFICATION_AUDIENCE_STYLE,
} from "../constants/system.notifications.constant";

const NotificationAudienceBadge = ({
    audience,
}: {
    audience: NotificationAudience;
}) => {
    const t = useTranslations("systemNotifications.audience");

    return (
        <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${NOTIFICATION_AUDIENCE_STYLE[audience]}`}
        >
            {t(AUDIENCE_KEY[audience])}
        </span>
    );
};

export default NotificationAudienceBadge;
