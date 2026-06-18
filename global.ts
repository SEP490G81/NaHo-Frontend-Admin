import common from "@/i18n/messages/vi/common.json";
import userManagement from "@/i18n/messages/vi/user-management.json";
import userReports from "@/i18n/messages/vi/user-reports.json";
import systemNotifications from "@/i18n/messages/vi/system-notifications.json";
import topicManagement from "@/i18n/messages/vi/topic-management.json";
import aiPersonas from "@/i18n/messages/vi/ai-personas.json";
import promptModeration from "@/i18n/messages/vi/prompt-moderation.json";

type Messages = typeof common &
    typeof userManagement &
    typeof userReports &
    typeof systemNotifications &
    typeof topicManagement &
    typeof aiPersonas &
    typeof promptModeration;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
