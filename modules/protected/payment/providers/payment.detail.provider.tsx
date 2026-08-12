"use client";

import React, { createContext, useContext, useState } from "react";
import { PaymentOrderResponse } from "@/types/responses/payment.response";

interface PaymentDetailContextType {
    selectedPayment: PaymentOrderResponse | null;
    isDetailOpen: boolean;
    openDetail: (payment: PaymentOrderResponse) => void;
    closeDetail: () => void;
}

const PaymentDetailContext = createContext<
    PaymentDetailContextType | undefined
>(undefined);

export function PaymentDetailProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [selectedPayment, setSelectedPayment] =
        useState<PaymentOrderResponse | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const openDetail = (payment: PaymentOrderResponse) => {
        setSelectedPayment(payment);
        setIsDetailOpen(true);
    };

    const closeDetail = () => {
        setIsDetailOpen(false);
        setSelectedPayment(null);
    };

    return (
        <PaymentDetailContext.Provider
            value={{ selectedPayment, isDetailOpen, openDetail, closeDetail }}
        >
            {children}
        </PaymentDetailContext.Provider>
    );
}

export function usePaymentDetail() {
    const context = useContext(PaymentDetailContext);
    if (!context) {
        throw new Error(
            "usePaymentDetail must be used within a PaymentDetailProvider",
        );
    }
    return context;
}
