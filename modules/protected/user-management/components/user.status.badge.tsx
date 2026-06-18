import { useTranslations } from "next-intl";
import { UserStatus } from "@/types/enums/user.enum";

interface UserStatusBadgeProps {
    status: UserStatus;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
    const t = useTranslations("userManagement.filter.status");
    const isActive = status === "ACTIVE";

    return (
        <span className={`text-sm font-medium ${isActive ? "text-text-success" : "text-bgc-error"}`}>
            {isActive ? t("active") : t("unactive")}
        </span>
    );
};

export default UserStatusBadge;
