import React from "react";
import { getTranslations } from "next-intl/server";
import UserReports from "@/modules/protected/user-reports";

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

    return { title: t("userReports") };
}

const UserReportsPage = () => {
    return <UserReports />;
};

export default UserReportsPage;
