import {
    PaymentProvider,
    PaymentSortColumn,
    PaymentStatus,
    SortDirection,
} from "@/types/enums/payment.enum";

export interface PaymentOrderQueryRequest {
    page?: number;
    size?: number;
    sortColumn?: PaymentSortColumn;
    sortDirection?: SortDirection;
    searchKeyword?: string | null;
    userId?: number | null;
    status?: PaymentStatus | null;
    provider?: PaymentProvider | null;
    createdTimeFrom?: string | null;
    createdTimeTo?: string | null;
}
