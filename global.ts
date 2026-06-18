import common from "@/i18n/messages/vi/common.json";
import userManagement from "@/i18n/messages/vi/user-management.json";
import aiPersonas from "@/i18n/messages/vi/ai-personas.json";

declare module "next-intl" {
    interface AppConfig {
        Messages: typeof common & typeof userManagement & typeof aiPersonas;
    }
}
