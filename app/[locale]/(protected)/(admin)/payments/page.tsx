import React from "react";
import { getTranslations } from "next-intl/server";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/libs/query.keys";
import { fetchAllPaymentOrders } from "@/services/server/admin.payment.service";
import { DEFAULT_PAYMENT_FILTER } from "@/modules/protected/admin/payment/constants/payment.table.constants";
import PaymentManagementView from "@/modules/protected/admin/payment/features/payment.management.view";

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
        title: t("paymentManagement"),
    };
}

const PaymentsPage = async () => {
    const queryClient = new QueryClient();
    const defaultRequest = {
        page: DEFAULT_PAYMENT_FILTER.page,
        size: DEFAULT_PAYMENT_FILTER.size,
        sortColumn: DEFAULT_PAYMENT_FILTER.sortColumn,
        sortDirection: DEFAULT_PAYMENT_FILTER.sortDirection,
    };

    await queryClient.prefetchQuery({
        queryKey: [...queryKeys.payments.all, DEFAULT_PAYMENT_FILTER],
        queryFn: () => fetchAllPaymentOrders(defaultRequest),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <PaymentManagementView />
        </HydrationBoundary>
    );
};

export default PaymentsPage;
