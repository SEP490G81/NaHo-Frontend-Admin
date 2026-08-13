"use client";

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import { ReportFilterState } from "../types/report.table.type";
import { DEFAULT_REPORT_FILTER } from "../constants/report.table.constants";
import { ReportStatusFilter } from "@/types/enums/report.enum";

interface ReportFilterContextValue {
    filter: ReportFilterState;
    pendingKeyword: string;
    setPendingKeyword: (keyword: string) => void;
    setIsResolved: (val: ReportStatusFilter | string) => void;
    applySearch: () => void;
    resetFilter: () => void;
}

const ReportFilterContext = createContext<ReportFilterContextValue | null>(
    null,
);

export function useReportFilter(): ReportFilterContextValue {
    const ctx = useContext(ReportFilterContext);
    if (!ctx) {
        throw new Error(
            "useReportFilter must be used within <ReportFilterProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

export function ReportFilterProvider({ children }: Props) {
    const [filter, setFilter] = useState<ReportFilterState>(
        DEFAULT_REPORT_FILTER,
    );
    const [pendingKeyword, setPendingKeyword] = useState("");

    const pendingKeywordRef = useRef(pendingKeyword);
    React.useEffect(() => {
        pendingKeywordRef.current = pendingKeyword;
    }, [pendingKeyword]);

    const applySearch = useCallback(() => {
        setFilter((prev) => ({
            ...prev,
            searchKeyword: pendingKeywordRef.current,
        }));
    }, []);

    const setIsResolved = useCallback(
        (isResolved: ReportStatusFilter | string) => {
            setFilter((prev) => ({
                ...prev,
                isResolved,
                searchKeyword: pendingKeywordRef.current,
            }));
        },
        [],
    );

    const resetFilter = useCallback(() => {
        setFilter(DEFAULT_REPORT_FILTER);
        setPendingKeyword("");
    }, []);

    const value = useMemo<ReportFilterContextValue>(
        () => ({
            filter,
            pendingKeyword,
            setPendingKeyword,
            setIsResolved,
            applySearch,
            resetFilter,
        }),
        [filter, pendingKeyword, applySearch, setIsResolved, resetFilter],
    );

    return (
        <ReportFilterContext.Provider value={value}>
            {children}
        </ReportFilterContext.Provider>
    );
}
