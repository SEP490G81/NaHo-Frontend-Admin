import { ReactNode } from "react";
import { getCurrentUser } from "@/services/server/user.service";
import { redirect } from "next/navigation";
import { RoleName } from "@/types/enums/user.enum";

const AdminLayout = async ({
    children,
}: Readonly<{ children: ReactNode }>) => {
    const user = await getCurrentUser();

    if (user?.role?.roleName !== RoleName.ADMIN) {
        if (user?.role?.roleName === RoleName.CONTENT_MANAGER) {
            redirect("/books");
        }
        redirect("/login");
    }

    return <>{children}</>;
};

export default AdminLayout;
