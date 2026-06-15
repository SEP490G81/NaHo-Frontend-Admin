import { SidebarItemGroup } from "@/layouts/sidebar/types/sidebar.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

export const SIDEBAR_GROUPS: SidebarItemGroup[] = [
    {
        id: "g-1",
        title: "main",
        items: [
            {
                id: "s-1",
                nameLinkKey: "dashboard",
                activeLinks: ["/dashboard"],
                redirectLink: "/dashboard",
                icon: <SpaceDashboardOutlinedIcon />,
            },
            {
                id: "s-2",
                nameLinkKey: "userManagement",
                activeLinks: ["/user-management"],
                redirectLink: "/user-management",
                icon: <PersonOutlinedIcon />,
            },
            {
                id: "s-personas",
                nameLinkKey: "aiPersonas",
                activeLinks: ["/persona-ai"],
                redirectLink: "/persona-ai",
                icon: <SmartToyOutlinedIcon />,
            },
        ],
    },
    {
        id: "g-2",
        title: "other",
        items: [
            {
                id: "s-4",
                nameLinkKey: "settings",
                activeLinks: ["/settings"],
                redirectLink: "/settings",
                icon: <SettingsOutlinedIcon />,
            },
            {
                id: "s-5",
                nameLinkKey: "helpAndSupport",
                activeLinks: ["/help-and-support"],
                redirectLink: "/help-and-support",
                icon: <HeadphonesOutlinedIcon />,
            },
        ],
    },
];
