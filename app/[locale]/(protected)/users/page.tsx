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
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("userManagement"),
    };
}

const UsersPage = () => {
    return (
        <div className="flex w-full flex-col gap-y-4 p-6">
            <h1 className="text-text-contrast text-2xl font-bold">
                Quản lý người dùng
            </h1>
        </div>
    );
};

export default UsersPage;
