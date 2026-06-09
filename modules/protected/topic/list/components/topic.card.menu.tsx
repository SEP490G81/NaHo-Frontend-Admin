"use client";
import React, { useState } from "react";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTranslations } from "next-intl";
import { useRouter } from "@/intl/i18n/navigation";
import { TopicResponse } from "@/types/responses/topic.response";

interface TopicCardMenuProps {
    topic: TopicResponse;
    onDelete: (topic: TopicResponse) => void;
}

const TopicCardMenu = ({ topic, onDelete }: TopicCardMenuProps) => {
    const t = useTranslations("topicManagement.card");
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const close = () => setAnchorEl(null);

    const goEdit = () => {
        close();
        router.push({ pathname: "/content-manager/topics/[id]", params: { id: topic.id } });
    };
    const goQuestions = () => {
        close();
        router.push({
            pathname: "/content-manager/topics/[id]/questions",
            params: { id: topic.id },
        });
    };
    const handleDelete = () => {
        close();
        onDelete(topic);
    };

    return (
        <>
            <IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    setAnchorEl(e.currentTarget);
                }}
                sx={{ bgcolor: "var(--color-bgc-app)", "&:hover": { bgcolor: "var(--color-bgc-app)" } }}
            >
                <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={close}>
                <MenuItem onClick={goEdit}>
                    <ListItemIcon>
                        <EditOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    {t("edit")}
                </MenuItem>
                <MenuItem onClick={goQuestions}>
                    <ListItemIcon>
                        <PlaylistAddCheckOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    {t("manageQuestions")}
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: "var(--color-bgc-error)" }}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: "var(--color-bgc-error)" }} />
                    </ListItemIcon>
                    {t("delete")}
                </MenuItem>
            </Menu>
        </>
    );
};

export default TopicCardMenu;
