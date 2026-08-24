import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findTopicDetail } from "@/services/client/topic.service";
import { updateLesson } from "@/services/client/lesson.service";
import { UpdateLessonRequest } from "@/types/requests/lesson.request";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useLessonManagement(topicId: number) {
    const t = useTranslations("lessonManagement");
    const queryClient = useQueryClient();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

    // Fetch lessons for the given topic (from Topic Detail)
    const { data: topicDetailResponse, isLoading: isFetchingLessons } = useQuery({
        queryKey: ["topicDetail", topicId],
        queryFn: () => findTopicDetail(topicId),
        enabled: !!topicId,
    });

    // Update lesson
    const updateMutation = useMutation({
        mutationFn: (data: { id: number; request: UpdateLessonRequest }) =>
            updateLesson(data.id, data.request),
        onSuccess: (res: any) => {
            toast.success(res?.message || t("updateSuccess") || "Cập nhật bài học thành công");
            queryClient.invalidateQueries({ queryKey: ["topicDetail", topicId] });
            setIsUpdateModalOpen(false);
            setSelectedLessonId(null);
        },
        onError: (error: unknown) => {
            const err = error as { detail?: string };
            toast.error(err?.detail || t("updateFailed") || "Cập nhật bài học thất bại");
        },
    });

    const openUpdateModal = (lessonId: number) => {
        setSelectedLessonId(lessonId);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedLessonId(null);
    };

    return {
        lessons: topicDetailResponse?.data?.lessons || [],
        isFetchingLessons,
        updateMutation,
        
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedLessonId,
    };
}
