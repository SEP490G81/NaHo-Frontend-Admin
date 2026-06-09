import React from "react";
import { getTranslations } from "next-intl/server";
import TopicQuestions from "@/modules/protected/topic/questions";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return { title: t("topicQuestions") };
}

const TopicQuestionsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    return <TopicQuestions topicId={id} />;
};

export default TopicQuestionsPage;
