"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { queryKeys } from "@/libs/query.keys";
import { togglePersonaStatusClient } from "@/services/client/persona.service";
import { PersonaStatus } from "@/types/enums/persona.enum";

/**
 * Đảo trạng thái ẩn/hiện của nhân vật rồi refetch danh sách. BE tự tính trạng
 * thái mới nên chỉ cần gửi id.
 */
export function useTogglePersonaStatus() {
    const queryClient = useQueryClient();
    const t = useTranslations("personaManagement.notifications");

    return useMutation({
        mutationFn: (personaId: number) => togglePersonaStatusClient(personaId),
        onSuccess: (newStatus: PersonaStatus) => {
            queryClient.invalidateQueries({
                queryKey: [...queryKeys.personas.all],
            });

            toast.success(
                String(newStatus).toUpperCase() === PersonaStatus.UNACTIVE
                    ? t("hideSuccess")
                    : t("showSuccess"),
            );
        },
        onError: (error: Error) => {
            toast.error(error.message || t("changeStatusError"));
        },
    });
}
