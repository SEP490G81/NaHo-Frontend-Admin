"use client";

import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

interface ContentReportDetailContextValue {
    detailReportId: number | null;
    resolveReportId: number | null;
    openDetail: (reportId: number) => void;
    closeDetail: () => void;
    openResolve: (reportId: number) => void;
    closeResolve: () => void;
}

const ContentReportDetailContext =
    createContext<ContentReportDetailContextValue | null>(null);

export function useContentReportDetail(): ContentReportDetailContextValue {
    const ctx = useContext(ContentReportDetailContext);
    if (!ctx) {
        throw new Error(
            "useContentReportDetail must be used within <ContentReportDetailProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

/**
 * Chỉ giữ id của báo cáo đang mở, không giữ cả object. Nhờ vậy sau khi xử lý
 * xong và danh sách được refetch, modal luôn đọc được dữ liệu mới nhất từ cache
 * React Query thay vì hiển thị bản chụp đã cũ.
 */
export function ContentReportDetailProvider({ children }: Props) {
    const [detailReportId, setDetailReportId] = useState<number | null>(null);
    const [resolveReportId, setResolveReportId] = useState<number | null>(null);

    const openDetail = useCallback((reportId: number) => {
        setDetailReportId(reportId);
    }, []);

    const closeDetail = useCallback(() => setDetailReportId(null), []);

    const openResolve = useCallback((reportId: number) => {
        setResolveReportId(reportId);
    }, []);

    const closeResolve = useCallback(() => setResolveReportId(null), []);

    const value = useMemo<ContentReportDetailContextValue>(
        () => ({
            detailReportId,
            resolveReportId,
            openDetail,
            closeDetail,
            openResolve,
            closeResolve,
        }),
        [
            detailReportId,
            resolveReportId,
            openDetail,
            closeDetail,
            openResolve,
            closeResolve,
        ],
    );

    return (
        <ContentReportDetailContext.Provider value={value}>
            {children}
        </ContentReportDetailContext.Provider>
    );
}
