import React from "react";
import { getTranslations } from "next-intl/server";
import PromptModeration from "@/modules/protected/prompt-moderation";

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

const PromptModerationPage = () => {
    return <PromptModeration />;
};

export default PromptModerationPage;
