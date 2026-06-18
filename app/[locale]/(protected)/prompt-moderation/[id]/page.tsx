import React from "react";
import { getTranslations } from "next-intl/server";
import PromptModerationDetail from "@/modules/protected/prompt-moderation/detail";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common.metadata.title" });

    return {
        title: t("promptModeration"),
    };
}

const PromptModerationDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    return <PromptModerationDetail id={id} />;
};

export default PromptModerationDetailPage;
