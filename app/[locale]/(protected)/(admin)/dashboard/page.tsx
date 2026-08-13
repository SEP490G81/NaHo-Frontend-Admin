import React from "react";
import { getTranslations } from "next-intl/server";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchAllPaymentOrders } from "@/services/server/admin.payment.service";
import DashboardView from "@/modules/protected/admin/dashboard/features/dashboard.view";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("dashboard"),
    };
}

const DashboardPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [...queryKeys.payments.all, "dashboard-metrics"],
        queryFn: () =>
            fetchAllPaymentOrders({
                page: 0,
                size: 100,
                sortColumn: "CREATED_TIME",
                sortDirection: "DESC",
            }),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <DashboardView />
        </HydrationBoundary>
    );
};

export default DashboardPage;
