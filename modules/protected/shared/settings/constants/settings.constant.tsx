import { SettingsMenuItem } from "@/modules/protected/shared/settings/types/settings.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

export const SETTING_MENU_ITEMS: SettingsMenuItem[] = [
    {
        id: "st-1",
        titleKey: "general",
        redirectLink: "/settings",
        icon: <SettingsOutlinedIcon fontSize="small" />,
    },
    {
        id: "st-2",
        titleKey: "account",
        redirectLink: "/settings/account",
        icon: <AccountCircleOutlinedIcon fontSize="small" />,
    },
    {
        id: "st-3",
        titleKey: "security",
        redirectLink: "/settings/security",
        icon: <SecurityOutlinedIcon fontSize="small" />,
    },
];
