import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/services/server/user.service";
import { redirect } from "next/navigation";
import Login from "@/modules/public/login/components/login";

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
        title: t("login"),
    };
}

import { RoleName } from "@/types/enums/user.enum";

const LoginPage = async () => {
    let user = null;
    try {
        user = await getCurrentUser();
    } catch (error) {
        console.log(error);
    }

    if (user) {
        if (user.role?.roleName === RoleName.CONTENT_MANAGER) {
            redirect("/books");
        } else if (user.role?.roleName === RoleName.ADMIN) {
            redirect("/dashboard");
        }
    }

    return <Login />;
};

export default LoginPage;
