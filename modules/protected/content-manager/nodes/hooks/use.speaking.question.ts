import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findSpeakingQuestionDetail, updateSpeakingQuestion } from "@/services/client/question.service";
import { UpdateSpeakingQuestionRequest } from "@/types/requests/question.request";
import { toast } from "react-toastify";

export const useSpeakingQuestion = (questionId: number | null, nodeId: number | null) => {
    const queryClient = useQueryClient();

    const {
        data: questionResponse,
        isLoading: isFetchingQuestion,
    } = useQuery({
        queryKey: ["speaking-question", nodeId],
        queryFn: () => findSpeakingQuestionDetail(nodeId as number),
        enabled: !!nodeId,
        staleTime: 5 * 60 * 1000,
    });

    const updateMutation = useMutation({
        mutationFn: (request: UpdateSpeakingQuestionRequest) => updateSpeakingQuestion(questionId as number, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["speaking-question", nodeId] });
            toast.success("Cập nhật câu hỏi thành công");
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
