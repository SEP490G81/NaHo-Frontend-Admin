import React from "react";
import { getTranslations } from "next-intl/server";
import TopicDetail from "@/modules/protected/topic/detail";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return { title: t("topicDetail") };
}

const TopicDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    return <TopicDetail topicId={id} />;
};

export default TopicDetailPage;
