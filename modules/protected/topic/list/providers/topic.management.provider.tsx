"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    deleteTopic,
    fetchTopics,
    reorderTopics,
} from "@/services/client/topic.service";
import { TopicResponse } from "@/types/responses/topic.response";
import { DEFAULT_FILTERS } from "../constants/topic.constant";
import { TopicFilters, TopicManagementContextType } from "../types/topic.type";

const TopicManagementContext = createContext<TopicManagementContextType | null>(
    null,
);

const buildQueryParams = (
    filters: TopicFilters,
    debouncedSearch: string,
): URLSearchParams => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (filters.level !== "all") params.set("level", filters.level);
    if (filters.status !== "all") params.set("status", filters.status);
    return params;
};

const TopicManagementProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const t = useTranslations("topicManagement.deleteDialog");
    const tList = useTranslations("topicManagement.list");
    const [topics, setTopics] = useState<TopicResponse[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFiltersState] = useState<TopicFilters>(DEFAULT_FILTERS);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [confirmTopic, setConfirmTopic] = useState<TopicResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
        return () => clearTimeout(timer);
    }, [filters.search]);

    useEffect(() => {
        setIsLoading(true);
        const params = buildQueryParams(filters, debouncedSearch);
        fetchTopics(params)
            .then((result) => {
                setTopics(result.data);
                setTotalCount(
                    result.meta.pageMeta?.totalElements ?? result.data.length,
                );
            })
            .catch(() => toast.error(t("error")))
            .finally(() => setIsLoading(false));
    }, [debouncedSearch, filters.level, filters.status, t]);

    const setFilters = useCallback(
        (partial: Partial<TopicFilters>) =>
            setFiltersState((prev) => ({ ...prev, ...partial })),
        [],
    );
    const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

    const openDeleteDialog = useCallback(
        (topic: TopicResponse) => setConfirmTopic(topic),
        [],
    );
    const closeDeleteDialog = useCallback(() => setConfirmTopic(null), []);

    const openImport = useCallback(() => setIsImportOpen(true), []);
    const closeImport = useCallback(() => setIsImportOpen(false), []);

    const confirmDelete = useCallback(async () => {
        if (!confirmTopic) return;
        setIsDeleting(true);
        try {
            await deleteTopic(confirmTopic.id);
            setTopics((prev) => prev.filter((x) => x.id !== confirmTopic.id));
            setTotalCount((prev) => Math.max(0, prev - 1));
            toast.success(t("success"));
        } catch {
            toast.error(t("error"));
        } finally {
            setIsDeleting(false);
            setConfirmTopic(null);
        }
    }, [confirmTopic, t]);

    const reorder = useCallback(
        (fromId: string, toId: string) => {
            if (fromId === toId) return;
            setTopics((prev) => {
                const fromIndex = prev.findIndex((x) => x.id === fromId);
                const toIndex = prev.findIndex((x) => x.id === toId);
                if (fromIndex < 0 || toIndex < 0) return prev;
                const next = [...prev];
                const [moved] = next.splice(fromIndex, 1);
                next.splice(toIndex, 0, moved);
                const reindexed = next.map((x, i) => ({ ...x, orderIndex: i + 1 }));
                reorderTopics(reindexed.map((x) => x.id)).catch(() => {});
                return reindexed;
            });
            toast.success(tList("reorderSuccess"));
        },
        [tList],
    );

    const value = useMemo<TopicManagementContextType>(
        () => ({
            topics,
            totalCount,
            filters,
            isLoading,
            confirmTopic,
            isDeleting,
            isImportOpen,
            openImport,
            closeImport,
            setFilters,
            resetFilters,
            openDeleteDialog,
            closeDeleteDialog,
            confirmDelete,
            reorder,
        }),
        [
            topics,
            totalCount,
            filters,
            isLoading,
            confirmTopic,
            isDeleting,
            isImportOpen,
            openImport,
            closeImport,
            setFilters,
            resetFilters,
            openDeleteDialog,
            closeDeleteDialog,
            confirmDelete,
            reorder,
        ],
    );

    return (
        <TopicManagementContext.Provider value={value}>
            {children}
        </TopicManagementContext.Provider>
    );
};

export { TopicManagementProvider };

export const useTopicManagement = (): TopicManagementContextType => {
    const ctx = useContext(TopicManagementContext);
    if (!ctx)
        throw new Error(
            "useTopicManagement must be used within TopicManagementProvider",
        );
    return ctx;
};
