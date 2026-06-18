import common from "@/i18n/messages/vi/common.json";
import userManagement from "@/i18n/messages/vi/user-management.json";
import userReports from "@/i18n/messages/vi/user-reports.json";
import systemNotifications from "@/i18n/messages/vi/system-notifications.json";

type Messages = typeof common &
    typeof userManagement &
    typeof userReports &
    typeof systemNotifications;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
