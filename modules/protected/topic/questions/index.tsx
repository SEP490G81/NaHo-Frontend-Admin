"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@/intl/i18n/navigation";
import {
    TopicQuestionsProvider,
    useTopicQuestions,
} from "./providers/topic.questions.provider";
import QuestionList from "./features/question.list";
import QuestionEditor from "./features/question.editor";

const TopicQuestionsContent = ({ topicId }: { topicId: string }) => {
    const t = useTranslations("topicManagement.questions");
    const { topic, isLoading } = useTopicQuestions();

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
                    href={`/content-manager/topics/${topicId}`}
                    className="text-text-muted hover:text-bgc-highlight inline-flex items-center gap-1 text-sm"
                >
                    <ArrowBackIcon fontSize="small" />
                    {t("back")}
                </Link>
                <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold">
                    {t("title")} — {topic.name}
                    <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-3 py-1 text-xs font-semibold">
                        {topic.jlptLevel}
                    </span>
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
                <QuestionList />
                <QuestionEditor />
            </div>
        </div>
    );
};

const TopicQuestions = ({ topicId }: { topicId: string }) => {
    return (
        <TopicQuestionsProvider topicId={topicId}>
            <TopicQuestionsContent topicId={topicId} />
        </TopicQuestionsProvider>
    );
};

export default TopicQuestions;
