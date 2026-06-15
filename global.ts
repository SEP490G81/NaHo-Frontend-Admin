import common from "@/intl/messages/vi/common.json";
import aiPersonas from "@/intl/messages/vi/ai-personas.json";

type Messages = typeof common & typeof aiPersonas;

declare module "next-intl" {
    interface AppConfig {
        Messages: Messages;
    }
}
