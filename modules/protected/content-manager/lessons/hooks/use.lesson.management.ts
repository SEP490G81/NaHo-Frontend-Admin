import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findTopicsByBookId, findTopicDetail } from "@/services/client/topic.service";
import { findAllBooks } from "@/services/client/book.service";
import { updateLesson } from "@/services/client/lesson.service";
import { UpdateLessonRequest } from "@/types/requests/lesson.request";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useLessonManagement() {
    const t = useTranslations("lessonManagement");
    const queryClient = useQueryClient();

    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

    // Fetch books for selection
    const { data: booksResponse, isLoading: isFetchingBooks } = useQuery({
        queryKey: ["books"],
        queryFn: () => findAllBooks(),
    });

    // Fetch topics for selected book
    const { data: topicsResponse, isLoading: isFetchingTopics } = useQuery({
        queryKey: ["topics", selectedBookId],
        queryFn: () => findTopicsByBookId(selectedBookId!),
        enabled: !!selectedBookId,
    });

    // Fetch lessons for selected topic (from Topic Detail)
    const { data: topicDetailResponse, isLoading: isFetchingLessons } = useQuery({
        queryKey: ["topicDetail", selectedTopicId],
        queryFn: () => findTopicDetail(selectedTopicId!),
        enabled: !!selectedTopicId,
    });

    // Update lesson
    const updateMutation = useMutation({
        mutationFn: (data: { id: number; request: UpdateLessonRequest }) =>
            updateLesson(data.id, data.request),
        onSuccess: () => {
            toast.success(t("updateSuccess") || "Cập nhật bài học thành công");
            queryClient.invalidateQueries({ queryKey: ["topicDetail", selectedTopicId] });
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

    const handleSelectBook = (bookId: number | null) => {
        setSelectedBookId(bookId);
        setSelectedTopicId(null); // Reset topic when changing book
    };

    const handleSelectTopic = (topicId: number | null) => {
        setSelectedTopicId(topicId);
    };

    return {
        books: booksResponse?.data || [],
        isFetchingBooks,
        selectedBookId,
        handleSelectBook,
        
        topics: topicsResponse?.data || [],
        isFetchingTopics,
        selectedTopicId,
        handleSelectTopic,
        
        lessons: topicDetailResponse?.data?.lessons || [],
        isFetchingLessons,
        updateMutation,
        
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedLessonId,
    };
}
