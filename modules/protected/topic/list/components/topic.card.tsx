"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { TopicResponse } from "@/types/responses/topic.response";
import { getTopicLevelStyle } from "@/constants/topic.constant";
import TopicLevelBadge from "./topic.level.badge";
import TopicStatusBadge from "./topic.status.badge";
import TopicCardMenu from "./topic.card.menu";

interface TopicCardProps {
    topic: TopicResponse;
    onDelete: (topic: TopicResponse) => void;
}

const TopicCard = ({ topic, onDelete }: TopicCardProps) => {
    const t = useTranslations("topicManagement.list");
    const { gradient, emoji } = getTopicLevelStyle(topic.jlptLevel);

    return (
        <div className="border-bdc-primary bg-bgc-app overflow-hidden rounded-xl border transition-shadow hover:shadow-md">
            <div
                className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient}`}
            >
                <span className="absolute top-3 left-3">
                    <TopicLevelBadge level={topic.jlptLevel} />
                </span>
                <span className="absolute top-3 right-3">
                    <TopicCardMenu topic={topic} onDelete={onDelete} />
                </span>
                {topic.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={topic.coverImageUrl}
                        alt={topic.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-5xl">{emoji}</span>
                )}
            </div>

            <div className="space-y-3 p-5">
                <Link
                    href={`/content-manager/topics/${topic.id}`}
                    className="hover:text-bgc-highlight block text-lg font-bold transition-colors"
                >
                    {topic.name}
                </Link>
                <p className="text-text-muted line-clamp-2 text-sm">
                    {topic.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    <TopicStatusBadge status={topic.status} />
                    <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-3 py-1 text-xs font-semibold">
                        {t("questionCount", { count: topic.questionCount })}
                    </span>
                    <Tooltip title={t("scoreHint")}>
                        <span className="text-text-muted ml-auto cursor-help text-xs">
                            {t("averageScore", {
                                score:
                                    topic.averageScore > 0
                                        ? topic.averageScore
                                        : t("noScore"),
                            })}
                        </span>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
