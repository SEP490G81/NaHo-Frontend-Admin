import { PaymentProvider, PaymentStatus } from "@/types/enums/payment.enum";

export interface PaymentOrderResponse {
    id: number;
    orderCode: string;
    userId: number;
    subscriptionPlanId: number;
    amount: number;
    currency: string;
    provider: PaymentProvider;
    status: PaymentStatus;
    providerTransactionId?: string | null;
    createdTime: string;
    expiresTime: string;
    paidTime?: string | null;
    modifiedTime?: string | null;
}
