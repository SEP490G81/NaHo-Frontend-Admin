"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { UserReportsProvider, useUserReports } from "./providers/user.reports.provider";
import ReportStatCards from "./features/report.stat.cards";
import ReportFilterBar from "./features/report.filter.bar";
import ReportTable from "./features/report.table";
import ReportDetailDrawer from "./features/report.detail.drawer";

const UserReportsContent = () => {
    const t = useTranslations("userReports");
    const { reports, isLoading } = useUserReports();

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app rounded-xl p-6">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("description")}
                </p>
            </div>

            <ReportStatCards />

            <div className="bg-bgc-app space-y-5 rounded-xl p-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex-1">
                        <ReportFilterBar />
                    </div>
                    {!isLoading && (
                        <span className="text-text-muted shrink-0 text-sm">
                            {t("resultCount", { count: reports.length })}
                        </span>
                    )}
                </div>
                <ReportTable />
            </div>

            <ReportDetailDrawer />
        </div>
    );
};

const UserReports = () => {
    return (
        <UserReportsProvider>
            <UserReportsContent />
        </UserReportsProvider>
    );
};

export default UserReports;
