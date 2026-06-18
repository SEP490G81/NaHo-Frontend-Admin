import React from "react";
import { useTranslations } from "next-intl";
import { TopicStatus } from "@/types/enums/topic.enum";
import { TOPIC_STATUS_STYLE } from "@/constants/topic.constant";

interface TopicStatusBadgeProps {
    status: TopicStatus;
}

const STATUS_KEY: Record<TopicStatus, "draft" | "active" | "hidden"> = {
    DRAFT: "draft",
    ACTIVE: "active",
    HIDDEN: "hidden",
};

const TopicStatusBadge = ({ status }: TopicStatusBadgeProps) => {
    const t = useTranslations("topicManagement.status");
    const key = STATUS_KEY[status] ?? "draft";
    const style = TOPIC_STATUS_STYLE[status] ?? TOPIC_STATUS_STYLE.DRAFT;

    return (
        <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
        >
            {t(key)}
        </span>
    );
};

export default TopicStatusBadge;
