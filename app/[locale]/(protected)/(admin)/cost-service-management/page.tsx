import React from "react";
import { getTranslations } from "next-intl/server";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import {
    fetchAzureCostChartServer,
    fetchAzureCostSummaryServer,
} from "@/services/server/azure.cost.service";
import CostServiceManagementView from "@/modules/protected/admin/cost-service-management/features/cost.service.management.view";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("costServiceManagement"),
    };
}

const CostServiceManagementPage = async () => {
    const queryClient = new QueryClient();

    // Prefetch summary and monthly chart on server
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: queryKeys.azureCost.summary,
            queryFn: fetchAzureCostSummaryServer,
        }),
        queryClient.prefetchQuery({
            queryKey: queryKeys.azureCost.chart({
                timeframe: "Last6Months",
                granularity: "Monthly",
            }),
            queryFn: () =>
                fetchAzureCostChartServer({
                    timeframe: "Last6Months",
                    granularity: "Monthly",
                }),
        }),
    ]);

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <CostServiceManagementView />
        </HydrationBoundary>
    );
};

export default CostServiceManagementPage;
