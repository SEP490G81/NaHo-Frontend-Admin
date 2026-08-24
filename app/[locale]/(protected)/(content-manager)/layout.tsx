import { ReactNode } from "react";
import { getCurrentUser } from "@/services/server/user.service";
import { redirect } from "next/navigation";
import { RoleName } from "@/types/enums/user.enum";

const ContentManagerLayout = async ({
    children,
}: Readonly<{ children: ReactNode }>) => {
    const user = await getCurrentUser();

    if (user?.role?.roleName !== RoleName.CONTENT_MANAGER) {
        if (user?.role?.roleName === RoleName.ADMIN) {
            redirect("/dashboard");
        }
        redirect("/login");
    }

    return <>{children}</>;
};

export default ContentManagerLayout;
