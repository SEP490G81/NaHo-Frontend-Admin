import React from "react";
import { getTranslations } from "next-intl/server";
import SystemNotifications from "@/modules/protected/system-notifications";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common.metadata.title" });

    return { title: t("systemNotifications") };
}

const SystemNotificationsPage = () => {
    return <SystemNotifications />;
};

export default SystemNotificationsPage;
