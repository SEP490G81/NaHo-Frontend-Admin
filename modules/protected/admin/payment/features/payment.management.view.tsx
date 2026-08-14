"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
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
                <div className="flex w-full flex-col gap-y-4">
                    <ContainerBox>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-text-contrast text-2xl font-bold">
                                {t("pageTitle")}
                            </h1>
                            <PaymentSearchBox />
                        </div>
                    </ContainerBox>

                    <PaymentTableContent />
                    <PaymentDetailsModal />
                </div>
            </PaymentDetailProvider>
        </PaymentFilterProvider>
    );
}

