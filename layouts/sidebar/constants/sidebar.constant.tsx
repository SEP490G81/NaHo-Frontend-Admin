import { SidebarItemGroup } from "@/layouts/sidebar/types/sidebar.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

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
                id: "s-3",
                nameLinkKey: "promptModeration",
                activeLinks: ["/prompt-moderation"],
                redirectLink: "/prompt-moderation",
                icon: <GppGoodOutlinedIcon />,
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
