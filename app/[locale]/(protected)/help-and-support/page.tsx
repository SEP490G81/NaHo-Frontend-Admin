import React from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return {
        title: t("helpAndSupport"),
    };
}

const HelpAndSupport = () => {
    return <div>help and support</div>;
};

export default HelpAndSupport;
