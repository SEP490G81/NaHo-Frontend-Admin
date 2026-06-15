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
    fetchReports,
    updateReportStatus,
} from "@/services/client/report.service";
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
    const [allReports, setAllReports] = useState<ReportResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<ReportFilters>(DEFAULT_FILTERS);
    const [selectedReport, setSelectedReport] = useState<ReportResponse | null>(
        null,
    );
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchReports()
            .then((result) => setAllReports(result.data))
            .catch(() => toast.error(t("table.loadError")))
            .finally(() => setIsLoading(false));
    }, [t]);

    const statusCounts = useMemo<Record<ReportStatus, number>>(() => {
        const counts: Record<ReportStatus, number> = {
            PENDING: 0,
            IN_PROGRESS: 0,
            RESOLVED: 0,
        };
        for (const report of allReports) counts[report.status] += 1;
        return counts;
    }, [allReports]);

    const reports = useMemo(() => {
        const query = filters.search.trim().toLowerCase();
        return allReports
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
    }, [allReports, filters]);

    const toggleStatusFilter = useCallback((status: ReportStatus) => {
        setFilters((prev) => ({
            ...prev,
            status: prev.status === status ? "ALL" : status,
        }));
    }, []);

    const openDetail = useCallback(
        (report: ReportResponse) => setSelectedReport(report),
        [],
    );
    const closeDetail = useCallback(() => setSelectedReport(null), []);

    const applyStatus = useCallback(
        async (
            id: string,
            status: ReportStatus,
            successMessage: string,
        ): Promise<boolean> => {
            setIsUpdating(true);
            try {
                const result = await updateReportStatus({ id, status });
                setAllReports((prev) =>
                    prev.map((report) =>
                        report.id === id ? result.data : report,
                    ),
                );
                setSelectedReport((prev) =>
                    prev && prev.id === id ? result.data : prev,
                );
                toast.success(successMessage);
                return true;
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : t("detail.updateError"),
                );
                return false;
            } finally {
                setIsUpdating(false);
            }
        },
        [t],
    );

    const startProcessing = useCallback(
        (id: string) =>
            applyStatus(id, "IN_PROGRESS", t("detail.startSuccess")),
        [applyStatus, t],
    );
    const resolveReport = useCallback(
        (id: string) => applyStatus(id, "RESOLVED", t("detail.resolveSuccess")),
        [applyStatus, t],
    );
    const reopenReport = useCallback(
        (id: string) =>
            applyStatus(id, "IN_PROGRESS", t("detail.reopenSuccess")),
        [applyStatus, t],
    );

    const value = useMemo<UserReportsContextType>(
        () => ({
            reports,
            totalCount: allReports.length,
            statusCounts,
            isLoading,
            filters,
            setFilters,
            toggleStatusFilter,
            selectedReport,
            openDetail,
            closeDetail,
            isUpdating,
            startProcessing,
            resolveReport,
            reopenReport,
        }),
        [
            reports,
            allReports.length,
            statusCounts,
            isLoading,
            filters,
            toggleStatusFilter,
            selectedReport,
            openDetail,
            closeDetail,
            isUpdating,
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
