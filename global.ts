import common from "@/intl/messages/vi/common.json";
import topicManagement from "@/intl/messages/vi/topic-management.json";

type Messages = typeof common & typeof topicManagement;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
