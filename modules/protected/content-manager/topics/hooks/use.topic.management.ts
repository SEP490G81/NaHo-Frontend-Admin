import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findTopicsByBookId, updateTopic } from "@/services/client/topic.service";
import { findAllBooks } from "@/services/client/book.service";
import { TopicQueryRequest, UpdateTopicRequest } from "@/types/requests/topic.request";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useTopicManagement() {
    const t = useTranslations("topicManagement");
    const queryClient = useQueryClient();

    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    const [queryParams, setQueryParams] = useState<TopicQueryRequest>({
        page: 0,
        size: 10,
    });

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

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

    // Update topic
    const updateMutation = useMutation({
        mutationFn: (data: { id: number; request: UpdateTopicRequest }) =>
            updateTopic(data.id, data.request),
        onSuccess: () => {
            toast.success(t("updateSuccess") || "Update successful");
            queryClient.invalidateQueries({ queryKey: ["topics", selectedBookId] });
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

    const handleSelectBook = (bookId: number | null) => {
        setSelectedBookId(bookId);
        setQueryParams({ page: 0, size: 10 }); // Reset params when changing book
    };

    // --- Client-side processing ---

    const processedTopics = useMemo(() => {
        if (!selectedBookId) return [];
        
        const allTopics = topicsResponse?.data || [];
        let result = [...allTopics];

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
    }, [topicsResponse?.data, queryParams, selectedBookId]);

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
        books: booksResponse?.data || [],
        isFetchingBooks,
        selectedBookId,
        handleSelectBook,
        
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
