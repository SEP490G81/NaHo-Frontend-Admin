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
    fetchLevels,
    fetchRoles,
    fetchUserDetail,
    fetchUsers,
    updateUserStatus,
} from "@/services/user.service";
import { LevelResponse } from "@/types/responses/level.response";
import { RoleResponse } from "@/types/responses/role.response";
import {
    UserDetailResponse,
    UserResponse,
} from "@/types/responses/user.response";
import { DEFAULT_FILTERS } from "../constants/user.constant";
import {
    UserFilters,
    UserManagementContextType,
} from "../types/user.type";

const UserManagementContext = createContext<UserManagementContextType | null>(null);

const buildQueryParams = (
    filters: UserFilters,
    debouncedSearch: string,
): URLSearchParams => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (filters.role !== "all") params.set("role", filters.role);
    if (filters.level !== "all") params.set("level", filters.level);
    if (filters.status !== "all") params.set("status", filters.status);
    return params;
};

const UserManagementProvider = ({ children }: { children: React.ReactNode }) => {
    const t = useTranslations("userManagement.lockDialog");
    const tError = useTranslations("userManagement.errors");
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFiltersState] = useState<UserFilters>(DEFAULT_FILTERS);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [roleOptions, setRoleOptions] = useState<RoleResponse[]>([]);
    const [levelOptions, setLevelOptions] = useState<LevelResponse[]>([]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDetailResponse | null>(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [confirmUser, setConfirmUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        fetchRoles().then((res) => setRoleOptions(res.data)).catch(() => {});
        fetchLevels().then((res) => setLevelOptions(res.data)).catch(() => {});
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
        return () => clearTimeout(timer);
    }, [filters.search]);

    useEffect(() => {
        setIsLoading(true);
        const params = buildQueryParams(filters, debouncedSearch);
        fetchUsers(params)
            .then((result) => {
                setUsers(result.data);
                setTotalCount(result.meta.pageMeta?.totalElements ?? result.data.length);
            })
            .catch(() => toast.error(tError("loadList")))
            .finally(() => setIsLoading(false));
    }, [debouncedSearch, filters.role, filters.level, filters.status, tError]);

    const setFilters = useCallback(
        (partial: Partial<UserFilters>) =>
            setFiltersState((prev) => ({ ...prev, ...partial })),
        [],
    );
    const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

    const openDetail = useCallback(
        async (user: UserResponse) => {
            setIsDetailModalOpen(true);
            setIsDetailLoading(true);
            setSelectedUser(null);
            try {
                const result = await fetchUserDetail(user.id);
                setSelectedUser(result.data);
            } catch {
                toast.error(tError("loadDetail"));
                setIsDetailModalOpen(false);
            } finally {
                setIsDetailLoading(false);
            }
        },
        [tError],
    );

    const closeDetail = useCallback(() => {
        setIsDetailModalOpen(false);
        setSelectedUser(null);
    }, []);

    const openLockDialog = useCallback(
        (user: UserResponse) => setConfirmUser(user),
        [],
    );
    const closeLockDialog = useCallback(() => setConfirmUser(null), []);

    const toggleLock = useCallback(async () => {
        if (!confirmUser) return;
        const wasBanned = confirmUser.status === "BANNED";
        const newStatus = wasBanned ? "ACTIVE" : "BANNED";
        try {
            await updateUserStatus(confirmUser.id, { status: newStatus });
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === confirmUser.id ? { ...u, status: newStatus } : u,
                ),
            );
            toast.success(wasBanned ? t("unlockSuccess") : t("lockSuccess"));
        } catch {
            toast.error(t("error"));
        } finally {
            setConfirmUser(null);
        }
    }, [confirmUser, t]);

    const value = useMemo<UserManagementContextType>(
        () => ({
            users,
            totalCount,
            filters,
            isLoading,
            roleOptions,
            levelOptions,
            isDetailModalOpen,
            selectedUser,
            isDetailLoading,
            confirmUser,
            setFilters,
            resetFilters,
            openDetail,
            closeDetail,
            openLockDialog,
            closeLockDialog,
            toggleLock,
        }),
        [
            users,
            totalCount,
            filters,
            isLoading,
            roleOptions,
            levelOptions,
            isDetailModalOpen,
            selectedUser,
            isDetailLoading,
            confirmUser,
            setFilters,
            resetFilters,
            openDetail,
            closeDetail,
            openLockDialog,
            closeLockDialog,
            toggleLock,
        ],
    );

    return (
        <UserManagementContext.Provider value={value}>
            {children}
        </UserManagementContext.Provider>
    );
};

export { UserManagementProvider };

export const useUserManagement = (): UserManagementContextType => {
    const ctx = useContext(UserManagementContext);
    if (!ctx)
        throw new Error("useUserManagement must be used within UserManagementProvider");
    return ctx;
};
