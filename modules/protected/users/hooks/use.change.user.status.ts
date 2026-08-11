"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { queryKeys } from "@/libs/query.keys";
import { changeUserStatusClient } from "@/services/client/user.status.service";
import { UserStatus } from "@/types/enums/user.enum";

/**
 * Hook mutation để thay đổi trạng thái user.
 * Tự động refetch danh sách user và hiển thị thông báo toast ở góc dưới bên phải.
 */
export function useChangeUserStatus() {
    const queryClient = useQueryClient();
    const t = useTranslations("userManagement.notifications");

    return useMutation({
        mutationFn: (userId: string | number) => changeUserStatusClient(userId),
        onSuccess: (newStatus: UserStatus) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.all,
            });

            const statusStr = String(newStatus).toUpperCase();

            if (statusStr === UserStatus.UNACTIVE) {
                toast.success(t("lockSuccess"));
            } else if (statusStr === UserStatus.ACTIVE) {
                toast.success(t("unlockSuccess"));
            } else {
                toast.success(t("changeStatusSuccess"));
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || t("changeStatusError"));
        },
    });
}
