import common from "@/intl/messages/vi/common.json";
import systemNotifications from "@/intl/messages/vi/system-notifications.json";

type Messages = typeof common & typeof systemNotifications;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
