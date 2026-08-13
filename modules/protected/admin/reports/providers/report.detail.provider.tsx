"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ReportResponse } from "@/types/responses/report.response";

interface ReportDetailContextValue {
    selectedReportDetail: ReportResponse | null;
    selectedReportResolve: ReportResponse | null;
    openDetail: (report: ReportResponse) => void;
    closeDetail: () => void;
    openResolve: (report: ReportResponse) => void;
    closeResolve: () => void;
}

const ReportDetailContext = createContext<ReportDetailContextValue | null>(null);

export function useReportDetail(): ReportDetailContextValue {
    const ctx = useContext(ReportDetailContext);
    if (!ctx) {
        throw new Error(
            "useReportDetail must be used within <ReportDetailProvider>",
        );
    }
    return ctx;
}

interface Props {
    readonly children: ReactNode;
}

export function ReportDetailProvider({ children }: Props) {
    const [selectedReportDetail, setSelectedReportDetail] = useState<ReportResponse | null>(null);
    const [selectedReportResolve, setSelectedReportResolve] = useState<ReportResponse | null>(null);

    const openDetail = (report: ReportResponse) => setSelectedReportDetail(report);
    const closeDetail = () => setSelectedReportDetail(null);

    const openResolve = (report: ReportResponse) => setSelectedReportResolve(report);
    const closeResolve = () => setSelectedReportResolve(null);

    return (
        <ReportDetailContext.Provider
            value={{
                selectedReportDetail,
                selectedReportResolve,
                openDetail,
                closeDetail,
                openResolve,
                closeResolve,
            }}
        >
            {children}
        </ReportDetailContext.Provider>
    );
}
