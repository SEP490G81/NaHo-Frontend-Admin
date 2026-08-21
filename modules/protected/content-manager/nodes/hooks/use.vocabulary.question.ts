import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findVocabularyQuestionDetail, updateVocabularyQuestion } from "@/services/client/question.service";
import { UpdateVocabularyQuestionRequest } from "@/types/requests/question.request";
import { toast } from "react-toastify";

export const useVocabularyQuestion = (questionId: number | null, nodeId: number | null) => {
    const queryClient = useQueryClient();

    const {
        data: questionResponse,
        isLoading: isFetchingQuestion,
    } = useQuery({
        queryKey: ["vocabulary-question", nodeId],
        queryFn: () => findVocabularyQuestionDetail(nodeId as number),
        enabled: !!nodeId,
        staleTime: 5 * 60 * 1000,
    });

    const updateMutation = useMutation({
        mutationFn: (request: UpdateVocabularyQuestionRequest) => updateVocabularyQuestion(questionId as number, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vocabulary-question", nodeId] });
            toast.success("Cập nhật câu hỏi từ vựng thành công");
        },
        onError: (error: any) => {
            toast.error(error?.message || "Lỗi khi cập nhật câu hỏi từ vựng");
        },
    });

    return {
        question: questionResponse?.data,
        isFetchingQuestion,
        isUpdating: updateMutation.isPending,
        updateQuestion: updateMutation.mutate,
    };
};
