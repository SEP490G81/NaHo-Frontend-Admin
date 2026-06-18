"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useAiPersonas } from "../providers/ai.personas.provider";

const PersonaDeleteDialog = () => {
    const t = useTranslations("aiPersonas.delete");
    const { deletingPersona, cancelDelete, deletePersona } = useAiPersonas();

    return (
        <Dialog
            open={Boolean(deletingPersona)}
            onClose={cancelDelete}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogContent>
                <DialogContentText className="text-text-muted text-sm">
                    {t("message", { name: deletingPersona?.name ?? "" })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={cancelDelete}
                    sx={{ color: "text.primary" }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => void deletePersona()}
                    sx={{
                        bgcolor: "var(--color-bgc-error)",
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonaDeleteDialog;
