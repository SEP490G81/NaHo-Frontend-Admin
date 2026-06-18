"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { DashboardProvider, useDashboard } from "./providers/dashboard.provider";
import DashboardSkeleton from "./components/dashboard.skeleton";
import DashboardKpiCards from "./features/dashboard.kpi.cards";
import DashboardUserGrowthChart from "./features/dashboard.user.growth.chart";
import DashboardPracticeChart from "./features/dashboard.practice.chart";
import DashboardJlptDistribution from "./features/dashboard.jlpt.distribution";
import DashboardAccountStatus from "./features/dashboard.account.status";
import DashboardReportsPanel from "./features/dashboard.reports.panel";
import DashboardNotificationsPanel from "./features/dashboard.notifications.panel";

const DashboardContent = () => {
    const t = useTranslations("dashboard");
    const { overview, isLoading } = useDashboard();

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app rounded-xl p-6">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-text-muted mt-1 text-sm">{t("description")}</p>
            </div>

            {isLoading || !overview ? (
                <DashboardSkeleton />
            ) : (
                <>
                    <DashboardKpiCards kpis={overview.kpis} />

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <DashboardUserGrowthChart />
                        </div>
                        <DashboardPracticeChart />
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <DashboardJlptDistribution />
                        </div>
                        <DashboardAccountStatus />
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <DashboardReportsPanel />
                        <DashboardNotificationsPanel />
                    </div>
                </>
            )}
        </div>
    );
};

const Dashboard = () => {
    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
};

export default Dashboard;
