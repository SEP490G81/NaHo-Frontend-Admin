"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useTopicManagement } from "../providers/topic.management.provider";

const TopicDeleteDialog = () => {
    const t = useTranslations("topicManagement.deleteDialog");
    const { confirmTopic, isDeleting, closeDeleteDialog, confirmDelete } =
        useTopicManagement();

    return (
        <Dialog
            open={!!confirmTopic}
            onClose={closeDeleteDialog}
            maxWidth="xs"
            fullWidth
        >
            {confirmTopic && (
                <>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogContent>
                        <p className="text-text-muted text-sm">
                            {t("message", { name: confirmTopic.name })}
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={closeDeleteDialog}>
                            {t("cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            disableElevation
                            disabled={isDeleting}
                            onClick={confirmDelete}
                        >
                            {t("confirm")}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default TopicDeleteDialog;
