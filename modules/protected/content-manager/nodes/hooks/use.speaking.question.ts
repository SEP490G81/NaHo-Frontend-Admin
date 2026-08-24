import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findSpeakingQuestionForAdmin, updateSpeakingQuestion } from "@/services/client/question.service";
import { UpdateSpeakingQuestionRequest } from "@/types/requests/question.request";
import { toast } from "react-toastify";

export const useSpeakingQuestion = (questionId: number | null, nodeId: number | null) => {
    const queryClient = useQueryClient();

    const {
        data: questionResponse,
        isLoading: isFetchingQuestion,
    } = useQuery({
        queryKey: ["speaking-question", questionId],
        queryFn: () => findSpeakingQuestionForAdmin(questionId as number),
        enabled: !!questionId,
        staleTime: 5 * 60 * 1000,
    });

    const updateMutation = useMutation({
        mutationFn: (request: UpdateSpeakingQuestionRequest) => updateSpeakingQuestion(questionId as number, request),
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["speaking-question", questionId] });
            toast.success(res?.message || "Cập nhật câu hỏi thành công");
        },
        onError: (error: any) => {
            toast.error(error?.message || "Lỗi khi cập nhật câu hỏi");
        },
    });

    return {
        question: questionResponse?.data,
        isFetchingQuestion,
        isUpdating: updateMutation.isPending,
        updateQuestion: updateMutation.mutate,
    };
};
