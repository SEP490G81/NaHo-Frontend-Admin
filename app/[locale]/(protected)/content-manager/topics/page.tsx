import React from "react";
import { getTranslations } from "next-intl/server";
import TopicManagement from "@/modules/protected/topic/list";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return { title: t("topicManagement") };
}

const TopicManagementPage = () => {
    return <TopicManagement />;
};

export default TopicManagementPage;
