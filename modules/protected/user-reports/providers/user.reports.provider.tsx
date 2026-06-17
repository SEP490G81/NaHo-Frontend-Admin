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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    fetchReports,
    updateReportStatus,
} from "@/services/client/report.service";
import { queryKeys } from "@/libs/query.keys";
import { ReportStatus } from "@/types/enums/report.enum";
import { ReportResponse } from "@/types/responses/report.response";
import {
    DEFAULT_FILTERS,
    STATUS_ORDER,
} from "../constants/user.reports.constant";
import {
    ReportFilters,
    UserReportsContextType,
} from "../types/user.reports.type";

const UserReportsContext = createContext<UserReportsContextType | null>(null);

const UserReportsProvider = ({ children }: { children: React.ReactNode }) => {
    const t = useTranslations("userReports");
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<ReportFilters>(DEFAULT_FILTERS);
    const [selectedReportId, setSelectedReportId] = useState<string | null>(
        null,
    );

    const reportsQuery = useQuery({
        queryKey: queryKeys.userReports.list,
        queryFn: fetchReports,
    });

    useEffect(() => {
        if (reportsQuery.isError) toast.error(t("table.loadError"));
    }, [reportsQuery.isError, t]);

    const data = useMemo<ReportResponse[]>(
        () => reportsQuery.data ?? [],
        [reportsQuery.data],
    );

    const statusCounts = useMemo<Record<ReportStatus, number>>(() => {
        const counts: Record<ReportStatus, number> = {
            PENDING: 0,
            IN_PROGRESS: 0,
            RESOLVED: 0,
        };
        for (const report of data) counts[report.status] += 1;
        return counts;
    }, [data]);

    const reports = useMemo(() => {
        const query = filters.search.trim().toLowerCase();
        return data
            .filter((report) => {
                if (filters.type !== "ALL" && report.type !== filters.type)
                    return false;
                if (
                    filters.status !== "ALL" &&
                    report.status !== filters.status
                )
                    return false;
                if (query) {
                    const haystack =
                        `${report.senderName} ${report.senderEmail} ${report.description}`.toLowerCase();
                    if (!haystack.includes(query)) return false;
                }
                return true;
            })
            // Unresolved surfaces first, then most-recent first within a status.
            .sort((a, b) => {
                const order = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
                if (order !== 0) return order;
                return b.reportedAt.localeCompare(a.reportedAt);
            });
    }, [data, filters]);

    const selectedReport = useMemo(
        () => data.find((report) => report.id === selectedReportId) ?? null,
        [data, selectedReportId],
    );

    const toggleStatusFilter = useCallback((status: ReportStatus) => {
        setFilters((prev) => ({
            ...prev,
            status: prev.status === status ? "ALL" : status,
        }));
    }, []);

    const openDetail = useCallback(
        (report: ReportResponse) => setSelectedReportId(report.id),
        [],
    );
    const closeDetail = useCallback(() => setSelectedReportId(null), []);

    const statusMutation = useMutation({
        mutationFn: (vars: {
            id: string;
            status: ReportStatus;
            successMessage: string;
        }) => updateReportStatus(vars.id, vars.status),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.userReports.list,
            });
            toast.success(vars.successMessage);
        },
        onError: () => toast.error(t("detail.updateError")),
    });

    const startProcessing = useCallback(
        (id: string) =>
            statusMutation.mutate({
                id,
                status: "IN_PROGRESS",
                successMessage: t("detail.startSuccess"),
            }),
        [statusMutation, t],
    );
    const resolveReport = useCallback(
        (id: string) =>
            statusMutation.mutate({
                id,
                status: "RESOLVED",
                successMessage: t("detail.resolveSuccess"),
            }),
        [statusMutation, t],
    );
    const reopenReport = useCallback(
        (id: string) =>
            statusMutation.mutate({
                id,
                status: "IN_PROGRESS",
                successMessage: t("detail.reopenSuccess"),
            }),
        [statusMutation, t],
    );

    const value = useMemo<UserReportsContextType>(
        () => ({
            reports,
            totalCount: data.length,
            statusCounts,
            isLoading: reportsQuery.isLoading,
            filters,
            setFilters,
            toggleStatusFilter,
            selectedReport,
            openDetail,
            closeDetail,
            isUpdating: statusMutation.isPending,
            startProcessing,
            resolveReport,
            reopenReport,
        }),
        [
            reports,
            data.length,
            statusCounts,
            reportsQuery.isLoading,
            filters,
            toggleStatusFilter,
            selectedReport,
            openDetail,
            closeDetail,
            statusMutation.isPending,
            startProcessing,
            resolveReport,
            reopenReport,
        ],
    );

    return (
        <UserReportsContext.Provider value={value}>
            {children}
        </UserReportsContext.Provider>
    );
};

export { UserReportsProvider };

export const useUserReports = (): UserReportsContextType => {
    const ctx = useContext(UserReportsContext);
    if (!ctx)
        throw new Error(
            "useUserReports must be used within UserReportsProvider",
        );
    return ctx;
};
