"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PaymentFilterProvider } from "../providers/payment.filter.provider";
import { PaymentDetailProvider } from "../providers/payment.detail.provider";
import { PaymentSearchBox } from "../components/payment.search.box";
import { PaymentTableContent } from "./payment.table.content";
import { PaymentDetailsModal } from "../components/payment.details.modal";

export default function PaymentManagementView() {
    const t = useTranslations("paymentManagement");

    return (
        <PaymentFilterProvider>
            <PaymentDetailProvider>
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            {t("pageTitle")}
                        </h1>
                    </div>

                    <PaymentSearchBox />
                    <PaymentTableContent />
                    <PaymentDetailsModal />
                </div>
            </PaymentDetailProvider>
        </PaymentFilterProvider>
    );
}
