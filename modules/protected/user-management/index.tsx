import { useTranslations } from "next-intl";
import { UserManagementProvider } from "./providers/user.management.provider";
import UserDetailModal from "./features/user.detail.modal";
import UserFilterBar from "./features/user.filter.bar";
import UserLockDialog from "./features/user.lock.dialog";
import UserTable from "./features/user.table";

const UserManagementContent = () => {
    const t = useTranslations("userManagement");

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app rounded-xl p-6">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="mt-1 text-sm text-text-muted">{t("description")}</p>
            </div>
            <div className="bg-bgc-app space-y-6 rounded-xl p-6">
                <UserFilterBar />
                <UserTable />
            </div>
            <UserDetailModal />
            <UserLockDialog />
        </div>
    );
};

const UserManagement = () => {
    return (
        <UserManagementProvider>
            <UserManagementContent />
        </UserManagementProvider>
    );
};

export default UserManagement;
