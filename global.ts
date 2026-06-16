import common from "@/i18n/messages/vi/common.json";
import userManagement from "@/i18n/messages/vi/user-management.json";
import topicManagement from "@/i18n/messages/vi/topic-management.json";

declare module "next-intl" {
    interface AppConfig {
        Messages: typeof common &
            typeof userManagement &
            typeof topicManagement;
    }
}
