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
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    fetchRoles,
    fetchUserDetail,
    fetchUsers,
    updateUserStatus,
} from "@/services/client/user.service";
import { queryKeys } from "@/libs/query.keys";
import { UserResponse } from "@/types/responses/user.response";
import { DEFAULT_FILTERS } from "../constants/user.constant";
import { UserFilters, UserManagementContextType } from "../types/user.type";

const UserManagementContext = createContext<UserManagementContextType | null>(null);

const buildQueryParams = (
    filters: UserFilters,
    debouncedSearch: string,
): URLSearchParams => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set("userNameOrEmail", debouncedSearch.trim());
    if (filters.role !== "all") params.set("role", filters.role);
    if (filters.jlptLevel !== "all") params.set("jlptLevel", filters.jlptLevel);
    if (filters.status !== "all") params.set("status", filters.status);
    return params;
};

const UserManagementProvider = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("userManagement");
    const queryClient = useQueryClient();
    const [filters, setFiltersState] = useState<UserFilters>(DEFAULT_FILTERS);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailUserId, setDetailUserId] = useState<number | null>(null);
    const [confirmUser, setConfirmUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(filters.userNameOrEmail), 400);
        return () => clearTimeout(timer);
    }, [filters.userNameOrEmail]);

    const queryParams = buildQueryParams(filters, debouncedSearch);

    const usersQuery = useQuery({
        queryKey: queryKeys.userManagement.list(queryParams.toString()),
        queryFn: () => fetchUsers(queryParams),
    });

    const rolesQuery = useQuery({
        queryKey: queryKeys.userManagement.roles,
        queryFn: fetchRoles,
    });

    const detailQuery = useQuery({
        queryKey: queryKeys.userManagement.detail(detailUserId ?? 0),
        queryFn: () => fetchUserDetail(detailUserId!),
        enabled: detailUserId !== null,
    });

    const statusMutation = useMutation({
        mutationFn: (vars: { userId: number; newStatus: "ACTIVE" | "UNACTIVE" }) =>
            updateUserStatus(vars.userId, { newStatus: vars.newStatus }),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({ queryKey: ["user-management", "list"] });
            toast.success(
                vars.newStatus === "ACTIVE"
                    ? t("lockDialog.unlockSuccess")
                    : t("lockDialog.lockSuccess"),
            );
        },
        onError: () => toast.error(t("lockDialog.error")),
    });

    useEffect(() => {
        if (usersQuery.isError) toast.error(t("errors.loadList"));
    }, [usersQuery.isError, t]);

    useEffect(() => {
        if (detailQuery.isError) {
            toast.error(t("errors.loadDetail"));
            setIsDetailModalOpen(false);
            setDetailUserId(null);
        }
    }, [detailQuery.isError, t]);

    const setFilters = useCallback(
        (partial: Partial<UserFilters>) =>
            setFiltersState((prev) => ({ ...prev, ...partial })),
        [],
    );
    const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

    const openDetail = useCallback((user: UserResponse) => {
        setIsDetailModalOpen(true);
        setDetailUserId(user.id);
    }, []);
    const closeDetail = useCallback(() => {
        setIsDetailModalOpen(false);
        setDetailUserId(null);
    }, []);

    const openLockDialog = useCallback(
        (user: UserResponse) => setConfirmUser(user),
        [],
    );
    const closeLockDialog = useCallback(() => setConfirmUser(null), []);

    const toggleLock = useCallback(() => {
        if (!confirmUser) return;
        const newStatus = confirmUser.status === "UNACTIVE" ? "ACTIVE" : "UNACTIVE";
        statusMutation.mutate(
            { userId: confirmUser.id, newStatus },
            { onSettled: () => setConfirmUser(null) },
        );
    }, [confirmUser, statusMutation]);

    const users = usersQuery.data ?? [];
    const value = useMemo<UserManagementContextType>(
        () => ({
            users,
            totalCount: users.length,
            filters,
            isLoading: usersQuery.isLoading,
            roleOptions: rolesQuery.data ?? [],
            isDetailModalOpen,
            selectedUser: detailQuery.data ?? null,
            isDetailLoading: detailQuery.isLoading && detailUserId !== null,
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
            filters,
            usersQuery.isLoading,
            rolesQuery.data,
            isDetailModalOpen,
            detailQuery.data,
            detailQuery.isLoading,
            detailUserId,
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
