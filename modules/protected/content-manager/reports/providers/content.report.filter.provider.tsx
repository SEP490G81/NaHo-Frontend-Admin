"use client";

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { ReportStatusFilter, ReportType } from "@/types/enums/report.enum";
import { DEFAULT_CONTENT_REPORT_FILTER } from "../constants/content.report.constants";
import {
    ContentReportFilterState,
    ContentReportStatCardKey,
    ContentReportTypeFilter,
} from "../types/content.report.type";

interface ContentReportFilterContextValue {
    filter: ContentReportFilterState;
    pendingKeyword: string;
    setPendingKeyword: (keyword: string) => void;
    setIsResolved: (value: ReportStatusFilter | string) => void;
    setReportType: (value: ContentReportTypeFilter) => void;
    applySearch: () => void;
    applyStatCard: (card: ContentReportStatCardKey) => void;
    resetFilter: () => void;
}

const ContentReportFilterContext =
    createContext<ContentReportFilterContextValue | null>(null);

export function useContentReportFilter(): ContentReportFilterContextValue {
    const ctx = useContext(ContentReportFilterContext);
    if (!ctx) {
        throw new Error(
            "useContentReportFilter must be used within <ContentReportFilterProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

export function ContentReportFilterProvider({ children }: Props) {
    const [filter, setFilter] = useState<ContentReportFilterState>(
        DEFAULT_CONTENT_REPORT_FILTER,
    );
    const [pendingKeyword, setPendingKeyword] = useState("");

    const applySearch = useCallback(() => {
        setFilter((prev) => ({ ...prev, searchKeyword: pendingKeyword }));
    }, [pendingKeyword]);

    const setIsResolved = useCallback(
        (isResolved: ReportStatusFilter | string) => {
            setFilter((prev) => ({ ...prev, isResolved }));
        },
        [],
    );

    const setReportType = useCallback((reportType: ContentReportTypeFilter) => {
        setFilter((prev) => ({ ...prev, reportType }));
    }, []);

    const resetFilter = useCallback(() => {
        setFilter(DEFAULT_CONTENT_REPORT_FILTER);
        setPendingKeyword("");
    }, []);

    /** Bấm vào thẻ thống kê là một lối tắt để áp bộ lọc tương ứng. */
    const applyStatCard = useCallback((card: ContentReportStatCardKey) => {
        setPendingKeyword("");
        if (card === "total") {
            setFilter(DEFAULT_CONTENT_REPORT_FILTER);
            return;
        }
        if (card === "unresolved") {
            setFilter({
                ...DEFAULT_CONTENT_REPORT_FILTER,
                isResolved: ReportStatusFilter.UNRESOLVED,
            });
            return;
        }
        setFilter({
            ...DEFAULT_CONTENT_REPORT_FILTER,
            reportType:
                card === "question" ? ReportType.QUESTION : ReportType.COMMENT,
        });
    }, []);

    const value = useMemo<ContentReportFilterContextValue>(
        () => ({
            filter,
            pendingKeyword,
            setPendingKeyword,
            setIsResolved,
            setReportType,
            applySearch,
            applyStatCard,
            resetFilter,
        }),
        [
            filter,
            pendingKeyword,
            setIsResolved,
            setReportType,
            applySearch,
            applyStatCard,
            resetFilter,
        ],
    );

    return (
        <ContentReportFilterContext.Provider value={value}>
            {children}
        </ContentReportFilterContext.Provider>
    );
}
