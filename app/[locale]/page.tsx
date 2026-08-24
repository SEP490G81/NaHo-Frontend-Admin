import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/server/user.service";

import { RoleName } from "@/types/enums/user.enum";

const IndexPage = async () => {
    const user = await getCurrentUser();
    if (user) {
        if (user.role?.roleName === RoleName.CONTENT_MANAGER) {
            redirect("/books");
        } else if (user.role?.roleName === RoleName.ADMIN) {
            redirect("/dashboard");
        } else {
            redirect("/login");
        }
    } else {
        redirect("/home");
    }
};

export default IndexPage;
