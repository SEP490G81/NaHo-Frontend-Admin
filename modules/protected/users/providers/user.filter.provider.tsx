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
import { SortDirection, UserSortColumn } from "@/types/enums/user.enum";
import { UserFilterState } from "@/modules/protected/users/types/user.table.type";
import { DEFAULT_FILTER } from "@/modules/protected/users/constants/user.table.constants";

interface UserFilterContextValue {
    filter: UserFilterState;
    /** Keyword hiện tại trên input (chưa submit). */
    pendingKeyword: string;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
    setSortColumn: (col: UserSortColumn) => void;
    toggleSortDirection: () => void;
    setPendingKeyword: (keyword: string) => void;
    applySearch: () => void;
    setGender: (gender: string | null) => void;
    setStatus: (status: string | null) => void;
    setIsEmailVerified: (val: boolean | null) => void;
    setRoleId: (roleId: number | null) => void;
    setDobFrom: (date: string) => void;
    setDobTo: (date: string) => void;
    /** Reset tất cả fields về mặc định. */
    resetFilter: () => void;
    /** Tăng version để reset FE sort trong table. */
    resetVersion: number;
}

const UserFilterContext = createContext<UserFilterContextValue | null>(null);

export function useUserFilter(): UserFilterContextValue {
    const ctx = useContext(UserFilterContext);
    if (!ctx) {
        throw new Error(
            "useUserFilter must be used within <UserFilterProvider>",
        );
    }
    return ctx;
}

interface Props {
    children: ReactNode;
}

export function UserFilterProvider({ children }: Props) {
    const [filter, setFilter] = useState<UserFilterState>(DEFAULT_FILTER);
    const [pendingKeyword, setPendingKeyword] = useState("");
    const [resetVersion, setResetVersion] = useState(0);

    // Ref để các setter select có thể đọc keyword mới nhất
    const pendingKeywordRef = useRef(pendingKeyword);
    pendingKeywordRef.current = pendingKeyword;

    /** Helper: submit toàn bộ form (bao gồm cả keyword). */
    const submitWithKeyword = useCallback(
        (patch: Partial<UserFilterState>) => {
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
        (sortColumn: UserSortColumn) => submitWithKeyword({ sortColumn }),
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

    const setGender = useCallback(
        (gender: string | null) => submitWithKeyword({ gender }),
        [submitWithKeyword],
    );

    const setStatus = useCallback(
        (status: string | null) => submitWithKeyword({ status }),
        [submitWithKeyword],
    );

    const setIsEmailVerified = useCallback(
        (isEmailVerified: boolean | null) =>
            submitWithKeyword({ isEmailVerified }),
        [submitWithKeyword],
    );

    const setRoleId = useCallback(
        (roleId: number | null) => submitWithKeyword({ roleId }),
        [submitWithKeyword],
    );

    const setDobFrom = useCallback(
        (dobFrom: string) => submitWithKeyword({ dobFrom }),
        [submitWithKeyword],
    );

    const setDobTo = useCallback(
        (dobTo: string) => submitWithKeyword({ dobTo }),
        [submitWithKeyword],
    );

    const resetFilter = useCallback(() => {
        setFilter(DEFAULT_FILTER);
        setPendingKeyword("");
        setResetVersion((v) => v + 1);
    }, []);

    const value = useMemo<UserFilterContextValue>(
        () => ({
            filter,
            pendingKeyword,
            setPage,
            setSize,
            setSortColumn,
            toggleSortDirection,
            setPendingKeyword,
            applySearch,
            setGender,
            setStatus,
            setIsEmailVerified,
            setRoleId,
            setDobFrom,
            setDobTo,
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
            setGender,
            setStatus,
            setIsEmailVerified,
            setRoleId,
            setDobFrom,
            setDobTo,
            resetFilter,
            resetVersion,
        ],
    );

    return (
        <UserFilterContext.Provider value={value}>
            {children}
        </UserFilterContext.Provider>
    );
}
