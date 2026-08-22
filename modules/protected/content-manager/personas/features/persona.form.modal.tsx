"use client";

import React, { useMemo } from "react";
import { Dialog } from "@mui/material";
import { usePersonaQuery } from "../hooks/use.persona.query";
import { usePersonaModal } from "../providers/persona.modal.provider";
import { PersonaFormProvider } from "../providers/persona.form.provider";
import { PersonaFormBody } from "./persona.form.body";

export function PersonaFormModal() {
    const { isFormOpen, editingPersona, closeForm } = usePersonaModal();
    const { data } = usePersonaQuery();

    const personas = useMemo(() => data?.data ?? [], [data]);

    if (!isFormOpen) return null;

    return (
        <Dialog
            open={isFormOpen}
            onClose={closeForm}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "rounded-3xl bg-bgc-modal border border-bdc-primary shadow-2xl",
                },
            }}
        >
            {/* key: đổi nhân vật thì remount để state form khởi tạo lại từ prop */}
            <PersonaFormProvider
                key={editingPersona?.id ?? "new"}
                persona={editingPersona}
                personas={personas}
            >
                <PersonaFormBody />
            </PersonaFormProvider>
        </Dialog>
    );
}
