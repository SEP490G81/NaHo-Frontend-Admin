import common from "@/intl/messages/vi/common.json";
import userReports from "@/intl/messages/vi/user-reports.json";

type Messages = typeof common & typeof userReports;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
