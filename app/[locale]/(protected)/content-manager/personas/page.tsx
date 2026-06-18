import React from "react";
import { getTranslations } from "next-intl/server";
import AiPersonas from "@/modules/protected/ai-personas";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return { title: t("aiPersonas") };
}

const PersonaAiPage = () => {
    return <AiPersonas />;
};

export default PersonaAiPage;
