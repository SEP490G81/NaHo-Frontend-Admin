import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findLessonDetail } from "@/services/client/lesson.service";
import { updateObjective } from "@/services/client/objective.service";
import { UpdateObjectiveRequest } from "@/types/requests/objective.request";
import { toast } from "react-toastify";

export const useObjectiveManagement = (lessonId: number) => {
    const queryClient = useQueryClient();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedObjectiveId, setSelectedObjectiveId] = useState<number | null>(null);

    // Fetch objectives by fetching lesson detail
    const {
        data: lessonDetailResponse,
        isLoading: isFetchingObjectives,
        refetch: refetchObjectives,
    } = useQuery({
        queryKey: ["objectives", lessonId],
        queryFn: () => findLessonDetail(lessonId),
        enabled: !!lessonId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const objectives = useMemo(() => lessonDetailResponse?.data?.objectives || [], [lessonDetailResponse]);

    // Derived state for the currently selected objective
    const selectedObjective = useMemo(
        () => objectives.find((obj) => obj.id === selectedObjectiveId) || null,
        [objectives, selectedObjectiveId]
    );

    // Mutations
    const updateObjectiveMutation = useMutation({
        mutationFn: ({ id, request }: { id: number; request: UpdateObjectiveRequest }) =>
            updateObjective(id, request),
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["objectives", lessonId] });
            toast.success(res?.message || "Cập nhật mục tiêu thành công!");
            closeUpdateModal();
        },
        onError: (error: any) => {
            console.error("Failed to update objective:", error);
            toast.error(error?.message || "Cập nhật mục tiêu thất bại. Vui lòng thử lại.");
        },
    });

    // Modal control handlers
    const openUpdateModal = useCallback((objectiveId: number) => {
        setSelectedObjectiveId(objectiveId);
        setIsUpdateModalOpen(true);
    }, []);

    const closeUpdateModal = useCallback(() => {
        setIsUpdateModalOpen(false);
        setTimeout(() => setSelectedObjectiveId(null), 300); // Wait for transition
    }, []);

    // Action handlers
    const handleUpdateObjective = useCallback(
        (request: UpdateObjectiveRequest) => {
            if (selectedObjectiveId === null) return;
            updateObjectiveMutation.mutate({
                id: selectedObjectiveId,
                request,
            });
        },
        [selectedObjectiveId, updateObjectiveMutation]
    );

    return {
        objectives,
        isFetchingObjectives,
        refetchObjectives,

        // Modal states
        isUpdateModalOpen,
        selectedObjective,

        // Modal controls
        openUpdateModal,
        closeUpdateModal,

        // Actions
        handleUpdateObjective,
        isUpdating: updateObjectiveMutation.isPending,
    };
};
