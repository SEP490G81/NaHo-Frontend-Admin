"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@/i18n/navigation";
import {
    TopicDetailProvider,
    useTopicDetail,
} from "./providers/topic.detail.provider";
import TopicDetailForm from "./features/topic.detail.form";
import TopicContentPanel from "./components/topic.content.panel";

const TopicDetailContent = () => {
    const t = useTranslations("topicManagement.detail");
    const { topic, isLoading } = useTopicDetail();

    if (isLoading) {
        return (
            <div className="flex justify-center py-16">
                <CircularProgress sx={{ color: "var(--color-bgc-highlight)" }} />
            </div>
        );
    }

    if (!topic) {
        return <div className="text-text-muted py-16 text-center">{t("notFound")}</div>;
    }

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app space-y-3 rounded-xl p-6">
                <Link
                    href="/content-manager/topics"
                    className="text-text-muted hover:text-bgc-highlight inline-flex items-center gap-1 text-sm"
                >
                    <ArrowBackIcon fontSize="small" />
                    {t("back")}
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">{t("title")}</h1>
                    <p className="text-text-muted mt-1 text-sm">{t("description")}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
                <TopicDetailForm />
                <TopicContentPanel topic={topic} />
            </div>
        </div>
    );
};

const TopicDetail = ({ topicId }: { topicId: string }) => {
    return (
        <TopicDetailProvider topicId={topicId}>
            <TopicDetailContent />
        </TopicDetailProvider>
    );
};

export default TopicDetail;
