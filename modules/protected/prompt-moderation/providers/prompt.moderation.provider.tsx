"use client";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomQuestions } from "@/services/client/custom.question.service";
import { queryKeys } from "@/libs/query.keys";
import { ModerationStatus } from "@/types/enums/moderation.enum";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import { DEFAULT_FILTERS } from "../constants/prompt.moderation.constant";
import {
    ModerationFilters,
    PromptModerationContextType,
} from "../types/prompt.moderation.type";

const PromptModerationContext =
    createContext<PromptModerationContextType | null>(null);

const PromptModerationProvider = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("promptModeration");
    const [filters, setFiltersState] =
        useState<ModerationFilters>(DEFAULT_FILTERS);

    const listQuery = useQuery({
        queryKey: queryKeys.customQuestions.list("all"),
        queryFn: () => fetchCustomQuestions({}),
    });

    useEffect(() => {
        if (listQuery.isError) toast.error(t("errors.loadList"));
    }, [listQuery.isError, t]);

    const data = useMemo<CustomQuestionResponse[]>(
        () => listQuery.data ?? [],
        [listQuery.data],
    );

    const statusCounts = useMemo<Record<ModerationStatus, number>>(() => {
        const counts: Record<ModerationStatus, number> = {
            PENDING: 0,
            APPROVED: 0,
            REJECTED: 0,
        };
        for (const q of data) counts[q.status] += 1;
        return counts;
    }, [data]);

    const questions = useMemo(() => {
        const query = filters.search.trim().toLowerCase();
        return data.filter((q) => {
            if (filters.status !== "all" && q.status !== filters.status)
                return false;
            if (query) {
                const haystack =
                    `${q.submitterName} ${q.submitterEmail} ${q.japaneseQuestion} ${q.japaneseQuestionMarkup}`.toLowerCase();
                if (!haystack.includes(query)) return false;
            }
            return true;
        });
    }, [data, filters]);

    const setFilters = useCallback(
        (partial: Partial<ModerationFilters>) =>
            setFiltersState((prev) => ({ ...prev, ...partial })),
        [],
    );
    const resetFilters = useCallback(
        () => setFiltersState(DEFAULT_FILTERS),
        [],
    );
    const toggleStatusFilter = useCallback((status: ModerationStatus) => {
        setFiltersState((prev) => ({
            ...prev,
            status: prev.status === status ? "all" : status,
        }));
    }, []);

    const isFiltered =
        filters.search.trim() !== "" || filters.status !== "all";

    const value = useMemo<PromptModerationContextType>(
        () => ({
            questions,
            totalCount: data.length,
            pendingCount: statusCounts.PENDING,
            statusCounts,
            filters,
            isLoading: listQuery.isLoading,
            isFiltered,
            setFilters,
            resetFilters,
            toggleStatusFilter,
        }),
        [
            questions,
            data.length,
            statusCounts,
            filters,
            listQuery.isLoading,
            isFiltered,
            setFilters,
            resetFilters,
            toggleStatusFilter,
        ],
    );

    return (
        <PromptModerationContext.Provider value={value}>
            {children}
        </PromptModerationContext.Provider>
    );
};

export { PromptModerationProvider };

export const usePromptModeration = (): PromptModerationContextType => {
    const ctx = useContext(PromptModerationContext);
    if (!ctx)
        throw new Error(
            "usePromptModeration must be used within PromptModerationProvider",
        );
    return ctx;
};
