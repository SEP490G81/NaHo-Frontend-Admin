"use client";

import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from "@mui/material";
import { Bot, CircleAlert, Save, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { PersonaFormBasicFields } from "../components/persona.form.basic.fields";
import { PersonaFormStyleFields } from "../components/persona.form.style.fields";
import {
    useCreatePersonaMutation,
    useUpdatePersonaMutation,
} from "../hooks/use.persona.mutation";
import { usePersonaFormContext } from "../providers/persona.form.provider";
import { usePersonaModal } from "../providers/persona.modal.provider";
import { buildPersonaRequest } from "../utils/persona.form.util";
import { matchPersonaApiError } from "../utils/persona.error.util";

export function PersonaFormBody() {
    const t = useTranslations("personaManagement.form");
    const tError = useTranslations("personaManagement.form.errors");
    const { editingPersona, closeForm } = usePersonaModal();
    const { values, validate, takenNames } = usePersonaFormContext();
    const createMutation = useCreatePersonaMutation();
    const updateMutation = useUpdatePersonaMutation();
    const [errorMessage, setErrorMessage] = useState("");

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!validate(takenNames)) return;

        const body = buildPersonaRequest(values);

        try {
            if (editingPersona) {
                await updateMutation.mutateAsync({
                    personaId: editingPersona.id,
                    body,
                });
                toast.success(t("updateSuccess"));
            } else {
                await createMutation.mutateAsync(body);
                toast.success(t("createSuccess"));
            }
            closeForm();
        } catch (err: unknown) {
            const errorObj = err as { detail?: string; message?: string };
            const raw = errorObj?.detail || errorObj?.message || "";
            // BE có thể trả nguyên văn lỗi SQL -> đổi sang câu tiếng Việt dễ hiểu
            const knownKey = raw ? matchPersonaApiError(raw) : null;
            const message = knownKey
                ? tError(knownKey as Parameters<typeof tError>[0])
                : raw || t("errorFallback");
            setErrorMessage(message);
            toast.error(message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle className="text-text-contrast flex items-center justify-between px-6 py-4 font-bold">
                <div className="flex items-center gap-3">
                    <div className="bg-bgc-highlight/10 text-bgc-highlight flex h-9 w-9 items-center justify-center rounded-xl font-bold">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">
                            {editingPersona
                                ? t("editTitle", { name: editingPersona.name })
                                : t("createTitle")}
                        </h2>
                        <p className="text-text-muted text-xs font-normal">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
                <IconButton
                    onClick={closeForm}
                    size="small"
                    className="text-text-muted"
                >
                    <X className="h-4 w-4" />
                </IconButton>
            </DialogTitle>
            <Divider className="border-bdc-primary" />

            <DialogContent className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-6">
                {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                        <CircleAlert className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <PersonaFormBasicFields />
                <Divider className="border-bdc-primary" />
                <PersonaFormStyleFields />
            </DialogContent>

            <Divider className="border-bdc-primary" />
            <DialogActions className="px-6 py-4">
                <Button
                    onClick={closeForm}
                    variant="outlined"
                    sx={{
                        borderRadius: "10px",
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-contrast)",
                        textTransform: "none",
                    }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={
                        isSubmitting ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )
                    }
                    sx={{
                        borderRadius: "10px",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 3,
                        "&:hover": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            opacity: 0.9,
                        },
                    }}
                >
                    {isSubmitting ? t("submitting") : t("submit")}
                </Button>
            </DialogActions>
        </form>
    );
}
