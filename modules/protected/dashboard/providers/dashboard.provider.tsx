"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardOverview } from "@/services/client/dashboard.service";
import { queryKeys } from "@/libs/query.keys";
import { DEFAULT_PERIOD } from "../constants/dashboard.constant";
import { DashboardContextType, DashboardPeriod } from "../types/dashboard.type";

const DashboardContext = createContext<DashboardContextType | null>(null);

const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const t = useTranslations("dashboard");
    const [period, setPeriod] = useState<DashboardPeriod>(DEFAULT_PERIOD);

    const overviewQuery = useQuery({
        queryKey: queryKeys.dashboard.overview,
        queryFn: fetchDashboardOverview,
    });

    useEffect(() => {
        if (overviewQuery.isError) toast.error(t("errors.load"));
    }, [overviewQuery.isError, t]);

    const value = useMemo<DashboardContextType>(
        () => ({
            overview: overviewQuery.data ?? null,
            isLoading: overviewQuery.isLoading,
            isError: overviewQuery.isError,
            period,
            setPeriod,
        }),
        [overviewQuery.data, overviewQuery.isLoading, overviewQuery.isError, period],
    );

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export { DashboardProvider };

export const useDashboard = (): DashboardContextType => {
    const ctx = useContext(DashboardContext);
    if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
    return ctx;
};
