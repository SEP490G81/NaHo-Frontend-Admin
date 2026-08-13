import {
    PaymentProvider,
    PaymentSortColumn,
    PaymentStatus,
    SortDirection,
} from "@/types/enums/payment.enum";

export interface PaymentFilterState {
    page: number;
    size: number;
    sortColumn: PaymentSortColumn;
    sortDirection: SortDirection;
    searchKeyword: string;
    userId: number | null;
    status: PaymentStatus | string | null;
    provider: PaymentProvider | string | null;
    createdTimeFrom: string;
    createdTimeTo: string;
}
