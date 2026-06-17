import React from "react";
import { getTranslations } from "next-intl/server";
import UserManagement from "@/modules/protected/user-management";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common.metadata.title" });

    return {
        title: t("userManagement"),
    };
}

const UserManagementPage = () => {
    return <UserManagement />;
};

export default UserManagementPage;
