import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findTopicsByBookId, updateTopic } from "@/services/client/topic.service";
import { TopicQueryRequest, UpdateTopicRequest } from "@/types/requests/topic.request";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useTopicManagement(bookId: number) {
    const t = useTranslations("topicManagement");
    const queryClient = useQueryClient();

    const [queryParams, setQueryParams] = useState<TopicQueryRequest>({
        page: 0,
        size: 10,
    });

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

    // Fetch topics for the given book
    const { data: topicsResponse, isLoading: isFetchingTopics } = useQuery({
        queryKey: ["topics", bookId],
        queryFn: () => findTopicsByBookId(bookId),
        enabled: !!bookId,
    });

    // Update topic
    const updateMutation = useMutation({
        mutationFn: (data: { id: number; request: UpdateTopicRequest }) =>
            updateTopic(data.id, data.request),
        onSuccess: () => {
            toast.success(t("updateSuccess") || "Update successful");
            queryClient.invalidateQueries({ queryKey: ["topics", bookId] });
            setIsUpdateModalOpen(false);
            setSelectedTopicId(null);
        },
        onError: (error: unknown) => {
            const err = error as { detail?: string };
            toast.error(err?.detail || t("updateFailed") || "Update failed");
        },
    });

    const handleSearch = (newParams: Partial<TopicQueryRequest>) => {
        setQueryParams((prev) => ({ ...prev, ...newParams, page: 0 }));
    };

    const handlePageChange = (newPage: number) => {
        setQueryParams((prev) => ({ ...prev, page: newPage }));
    };

    const openUpdateModal = (topicId: number) => {
        setSelectedTopicId(topicId);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedTopicId(null);
    };

    // --- Client-side processing ---
    const processedTopics = useMemo(() => {
        if (!topicsResponse?.data) return [];
        
        let result = [...topicsResponse.data];

        // 1. Filter
        if (queryParams.keyword) {
            const keyword = queryParams.keyword.toLowerCase();
            result = result.filter(topic => topic.japaneseName.toLowerCase().includes(keyword));
        }
        if (queryParams.status && queryParams.status !== "ALL" as unknown as typeof queryParams.status) {
            result = result.filter(topic => topic.status === queryParams.status);
        }

        // 2. Sort
        if (queryParams.sortDirection) {
            result.sort((a, b) => {
                const cmp = a.japaneseName.localeCompare(b.japaneseName);
                return queryParams.sortDirection === 'ASC' ? cmp : -cmp;
            });
        }

        return result;
    }, [topicsResponse?.data, queryParams]);

    const page = queryParams.page || 0;
    const size = queryParams.size || 10;
    
    const paginatedTopics = useMemo(() => {
        const start = page * size;
        return processedTopics.slice(start, start + size);
    }, [processedTopics, page, size]);

    const clientPageMeta = useMemo(() => {
        const totalElements = processedTopics.length;
        const totalPages = Math.ceil(totalElements / size);
        return {
            currentPage: page,
            pageSize: size,
            totalPages,
            totalElements,
            hasNextPage: page < totalPages - 1,
            hasPreviousPage: page > 0,
        };
    }, [processedTopics.length, page, size]);

    return {
        queryParams,
        handleSearch,
        handlePageChange,
        topics: paginatedTopics,
        pageMeta: clientPageMeta,
        isFetchingTopics,
        updateMutation,
        
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedTopicId,
    };
}
