import { SidebarItemGroup } from "@/layouts/sidebar/types/sidebar.type";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
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
                id: "s-reports",
                nameLinkKey: "userReports",
                activeLinks: ["/user-reports"],
                redirectLink: "/user-reports",
                icon: <BugReportOutlinedIcon />,
            },
            {
                id: "s-notifications",
                nameLinkKey: "systemNotifications",
                activeLinks: ["/system-notifications"],
                redirectLink: "/system-notifications",
                icon: <NotificationsOutlinedIcon />,
            },
        ],
    },
    {
        id: "g-teacher",
        title: "contentManager",
        items: [
            {
                id: "s-topic",
                nameLinkKey: "topicManagement",
                activeLinks: ["/content-manager/topics"],
                redirectLink: "/content-manager/topics",
                icon: <MenuBookOutlinedIcon />,
            },
            {
                id: "s-moderation",
                nameLinkKey: "promptModeration",
                activeLinks: ["/content-manager/prompt-moderation"],
                redirectLink: "/content-manager/prompt-moderation",
                icon: <GppGoodOutlinedIcon />,
            },
            {
                id: "s-personas",
                nameLinkKey: "aiPersonas",
                activeLinks: ["/content-manager/personas"],
                redirectLink: "/content-manager/personas",
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
