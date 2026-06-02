import common from "@/intl/messages/vi/common.json";
import userManagement from "@/intl/messages/vi/user-management.json";

type Messages = typeof common & typeof userManagement;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
