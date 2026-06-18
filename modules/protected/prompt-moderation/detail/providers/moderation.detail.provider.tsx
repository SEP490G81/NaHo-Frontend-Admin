"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import {
    fetchCustomQuestionDetail,
    fetchTopicOptions,
    moderateCustomQuestion,
    saveCustomQuestion,
} from "@/services/client/custom.question.service";
import { queryKeys } from "@/libs/query.keys";
import { RejectionCategory } from "@/types/enums/moderation.enum";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import { TopicOption } from "@/types/responses/topic.option.response";
import {
    ModerateCustomQuestionRequest,
    SaveCustomQuestionRequest,
} from "@/types/requests/custom.question.request";

interface ModerationDetailContextType {
    detail: CustomQuestionResponse | null;
    topicOptions: TopicOption[];
    isLoading: boolean;
    isError: boolean;
    isSaving: boolean;
    isModerating: boolean;
    save: (draft: SaveCustomQuestionRequest) => void;
    approve: (draft: SaveCustomQuestionRequest) => void;
    reject: (
        draft: SaveCustomQuestionRequest,
        category: RejectionCategory,
        reason: string,
    ) => void;
}

const ModerationDetailContext =
    createContext<ModerationDetailContextType | null>(null);

const ModerationDetailProvider = ({
    id,
    children,
}: {
    id: string;
    children: ReactNode;
}) => {
    const t = useTranslations("promptModeration");
    const router = useRouter();
    const queryClient = useQueryClient();

    const detailQuery = useQuery({
        queryKey: queryKeys.customQuestions.detail(id),
        queryFn: () => fetchCustomQuestionDetail(id),
    });

    const topicOptionsQuery = useQuery({
        queryKey: queryKeys.customQuestions.topicOptions,
        queryFn: fetchTopicOptions,
    });

    useEffect(() => {
        if (detailQuery.isError) toast.error(t("errors.loadDetail"));
    }, [detailQuery.isError, t]);

    const invalidateLists = () => {
        queryClient.invalidateQueries({ queryKey: ["custom-questions"] });
    };

    const saveMutation = useMutation({
        mutationFn: (draft: SaveCustomQuestionRequest) =>
            saveCustomQuestion(draft),
        onSuccess: (updated) => {
            queryClient.setQueryData(
                queryKeys.customQuestions.detail(id),
                updated,
            );
            invalidateLists();
            toast.success(t("detail.toast.saveSuccess"));
        },
        onError: () => toast.error(t("detail.toast.saveError")),
    });

    const moderateMutation = useMutation({
        mutationFn: (request: ModerateCustomQuestionRequest) =>
            moderateCustomQuestion(request),
        onSuccess: (updated) => {
            queryClient.setQueryData(
                queryKeys.customQuestions.detail(id),
                updated,
            );
            invalidateLists();
            toast.success(
                updated.status === "APPROVED"
                    ? t("detail.toast.approveSuccess")
                    : t("detail.toast.rejectSuccess"),
            );
            router.push("/content-manager/prompt-moderation");
        },
        onError: (_err, request) =>
            toast.error(
                request.status === "APPROVED"
                    ? t("detail.toast.approveError")
                    : t("detail.toast.rejectError"),
            ),
    });

    const value = useMemo<ModerationDetailContextType>(
        () => ({
            detail: detailQuery.data ?? null,
            topicOptions: topicOptionsQuery.data ?? [],
            isLoading: detailQuery.isLoading,
            isError: detailQuery.isError,
            isSaving: saveMutation.isPending,
            isModerating: moderateMutation.isPending,
            save: (draft) => saveMutation.mutate(draft),
            approve: (draft) =>
                moderateMutation.mutate({ ...draft, status: "APPROVED" }),
            reject: (draft, category, reason) =>
                moderateMutation.mutate({
                    ...draft,
                    status: "REJECTED",
                    rejectionCategory: category,
                    rejectionReason: reason,
                }),
        }),
        [
            detailQuery.data,
            topicOptionsQuery.data,
            detailQuery.isLoading,
            detailQuery.isError,
            saveMutation,
            moderateMutation,
        ],
    );

    return (
        <ModerationDetailContext.Provider value={value}>
            {children}
        </ModerationDetailContext.Provider>
    );
};

export { ModerationDetailProvider };

export const useModerationDetail = (): ModerationDetailContextType => {
    const ctx = useContext(ModerationDetailContext);
    if (!ctx)
        throw new Error(
            "useModerationDetail must be used within ModerationDetailProvider",
        );
    return ctx;
};
