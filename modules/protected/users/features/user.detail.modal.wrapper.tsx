"use client";

import React from "react";
import { useUserDetailModal } from "@/modules/protected/users/providers/user.detail.provider";
import { useUserLearningProgress } from "@/modules/protected/users/hooks/use.user.learning.progress";
import UserDetailsModal from "@/modules/protected/users/components/user.details.modal";

/**
 * Feature Container: Kết nối giữa context user, hook lấy tiến trình học tập API,
 * và component hiển thị chi tiết UserDetailsModal.
 */
export default function UserDetailModalWrapper() {
    const { selectedUser, closeDetail } = useUserDetailModal();
    const { data: progress, isLoading: isProgressLoading } =
        useUserLearningProgress(selectedUser?.id ?? null);

    const isOpen = selectedUser !== null;

    return (
        <UserDetailsModal
            open={isOpen}
            onClose={closeDetail}
            user={selectedUser}
            progress={progress ?? null}
            isProgressLoading={isProgressLoading}
        />
    );
}
