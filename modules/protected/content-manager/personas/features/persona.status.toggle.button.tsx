"use client";

import React from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { PersonaStatus } from "@/types/enums/persona.enum";
import { useTogglePersonaStatus } from "../hooks/use.toggle.persona.status";

interface PersonaStatusToggleButtonProps {
    readonly personaId: number;
    readonly status: PersonaStatus;
}

/**
 * Nút ẩn/hiện nhân vật với người học.
 * - Đang dùng (ACTIVE): icon con mắt, bấm vào để tạm ẩn.
 * - Tạm ẩn (UNACTIVE): icon mắt gạch, bấm vào để mở lại.
 */
export function PersonaStatusToggleButton({
    personaId,
    status,
}: PersonaStatusToggleButtonProps) {
    const t = useTranslations("personaManagement.actions");
    const { mutate, isPending } = useTogglePersonaStatus();

    const isActive = status === PersonaStatus.ACTIVE;

    return (
        <Tooltip title={isActive ? t("hide") : t("show")}>
            <span>
                <IconButton
                    size="small"
                    disabled={isPending}
                    onClick={() => mutate(personaId)}
                    sx={{
                        borderRadius: "12px",
                        color: isActive
                            ? "var(--color-text-success)"
                            : "var(--color-text-error)",
                        backgroundColor: isActive
                            ? "rgba(46,155,91,0.08)"
                            : "rgba(239,35,60,0.08)",
                        "&:hover": {
                            backgroundColor: isActive
                                ? "rgba(239,35,60,0.18)"
                                : "rgba(46,155,91,0.18)",
                        },
                        "&.Mui-disabled": { opacity: 0.6 },
                    }}
                >
                    {isPending ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : isActive ? (
                        <Eye className="h-4 w-4" />
                    ) : (
                        <EyeOff className="h-4 w-4" />
                    )}
                </IconButton>
            </span>
        </Tooltip>
    );
}
