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
import { PaymentSortColumn, SortDirection } from "@/types/enums/payment.enum";
import { PaymentFilterState } from "../types/payment.table.type";
import { DEFAULT_PAYMENT_FILTER } from "../constants/payment.table.constants";

interface PaymentFilterContextValue {
    filter: PaymentFilterState;
    pendingKeyword: string;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
    setSortColumn: (col: PaymentSortColumn) => void;
    toggleSortDirection: () => void;
    setPendingKeyword: (keyword: string) => void;
    applySearch: () => void;
    setUserIdFilter: (userId: number | null) => void;
    setStatusFilter: (status: string | null) => void;
    setProviderFilter: (provider: string | null) => void;
    setCreatedTimeFrom: (date: string) => void;
    setCreatedTimeTo: (date: string) => void;
    resetFilter: () => void;
    resetVersion: number;
}

const PaymentFilterContext = createContext<PaymentFilterContextValue | null>(
    null,
);

export function usePaymentFilter(): PaymentFilterContextValue {
    const ctx = useContext(PaymentFilterContext);
    if (!ctx) {
        throw new Error(
            "usePaymentFilter must be used within <PaymentFilterProvider>",
        );
    }
    return ctx;
}

interface Props {
    children: ReactNode;
}

export function PaymentFilterProvider({ children }: Props) {
    const [filter, setFilter] = useState<PaymentFilterState>(
        DEFAULT_PAYMENT_FILTER,
    );
    const [pendingKeyword, setPendingKeyword] = useState("");
    const [resetVersion, setResetVersion] = useState(0);

    const pendingKeywordRef = useRef(pendingKeyword);
    React.useEffect(() => {
        pendingKeywordRef.current = pendingKeyword;
    }, [pendingKeyword]);

    const submitWithKeyword = useCallback(
        (patch: Partial<PaymentFilterState>) => {
            setFilter((prev) => ({
                ...prev,
                ...patch,
                searchKeyword: pendingKeywordRef.current,
                page: 0,
            }));
        },
        [],
    );

    const setPage = useCallback(
        (page: number) => setFilter((prev) => ({ ...prev, page })),
        [],
    );

    const setSize = useCallback(
        (size: number) => submitWithKeyword({ size }),
        [submitWithKeyword],
    );

    const setSortColumn = useCallback(
        (sortColumn: PaymentSortColumn) => submitWithKeyword({ sortColumn }),
        [submitWithKeyword],
    );

    const toggleSortDirection = useCallback(
        () =>
            setFilter((prev) => ({
                ...prev,
                sortDirection:
                    prev.sortDirection === SortDirection.ASC
                        ? SortDirection.DESC
                        : SortDirection.ASC,
                searchKeyword: pendingKeywordRef.current,
                page: 0,
            })),
        [],
    );

    const applySearch = useCallback(() => {
        setFilter((prev) => ({
            ...prev,
            searchKeyword: pendingKeywordRef.current,
            page: 0,
        }));
    }, []);

    const setUserIdFilter = useCallback(
        (userId: number | null) => submitWithKeyword({ userId }),
        [submitWithKeyword],
    );

    const setStatusFilter = useCallback(
        (status: string | null) => submitWithKeyword({ status }),
        [submitWithKeyword],
    );

    const setProviderFilter = useCallback(
        (provider: string | null) => submitWithKeyword({ provider }),
        [submitWithKeyword],
    );

    const setCreatedTimeFrom = useCallback(
        (createdTimeFrom: string) => submitWithKeyword({ createdTimeFrom }),
        [submitWithKeyword],
    );

    const setCreatedTimeTo = useCallback(
        (createdTimeTo: string) => submitWithKeyword({ createdTimeTo }),
        [submitWithKeyword],
    );

    const resetFilter = useCallback(() => {
        setFilter(DEFAULT_PAYMENT_FILTER);
        setPendingKeyword("");
        setResetVersion((v) => v + 1);
    }, []);

    const value = useMemo<PaymentFilterContextValue>(
        () => ({
            filter,
            pendingKeyword,
            setPage,
            setSize,
            setSortColumn,
            toggleSortDirection,
            setPendingKeyword,
            applySearch,
            setUserIdFilter,
            setStatusFilter,
            setProviderFilter,
            setCreatedTimeFrom,
            setCreatedTimeTo,
            resetFilter,
            resetVersion,
        }),
        [
            filter,
            pendingKeyword,
            setPage,
            setSize,
            setSortColumn,
            toggleSortDirection,
            applySearch,
            setUserIdFilter,
            setStatusFilter,
            setProviderFilter,
            setCreatedTimeFrom,
            setCreatedTimeTo,
            resetFilter,
            resetVersion,
        ],
    );

    return (
        <PaymentFilterContext.Provider value={value}>
            {children}
        </PaymentFilterContext.Provider>
    );
}
