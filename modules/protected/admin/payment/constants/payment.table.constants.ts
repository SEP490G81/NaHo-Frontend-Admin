import { PaymentFilterState } from "../types/payment.table.type";
import { PaymentSortColumn, SortDirection } from "@/types/enums/payment.enum";

export const DEFAULT_PAYMENT_FILTER: PaymentFilterState = {
    page: 0,
    size: 20,
    sortColumn: PaymentSortColumn.CREATED_TIME,
    sortDirection: SortDirection.DESC,
    searchKeyword: "",
    userId: null,
    status: null,
    provider: null,
    createdTimeFrom: "",
    createdTimeTo: "",
};

export const PAYMENT_SORT_OPTIONS = [
    { value: PaymentSortColumn.CREATED_TIME, labelKey: "sortCreatedTime" },
    { value: PaymentSortColumn.PAID_TIME, labelKey: "sortPaidTime" },
    { value: PaymentSortColumn.AMOUNT, labelKey: "sortAmount" },
    { value: PaymentSortColumn.ORDER_CODE, labelKey: "sortOrderCode" },
    { value: PaymentSortColumn.STATUS, labelKey: "sortStatus" },
] as const;
