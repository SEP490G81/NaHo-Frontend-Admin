export const PaymentStatus = Object.freeze({
    PENDING: "PENDING",
    PAID: "PAID",
    FAILED: "FAILED",
    CANCELLED: "CANCELLED",
    EXPIRED: "EXPIRED",
});
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentProvider = Object.freeze({
    VNPAY: "VNPAY",
});
export type PaymentProvider =
    (typeof PaymentProvider)[keyof typeof PaymentProvider];

export const PaymentSortColumn = Object.freeze({
    ID: "ID",
    ORDER_CODE: "ORDER_CODE",
    USER_ID: "USER_ID",
    AMOUNT: "AMOUNT",
    PROVIDER: "PROVIDER",
    STATUS: "STATUS",
    CREATED_TIME: "CREATED_TIME",
    EXPIRES_TIME: "EXPIRES_TIME",
    PAID_TIME: "PAID_TIME",
});
export type PaymentSortColumn =
    (typeof PaymentSortColumn)[keyof typeof PaymentSortColumn];

export const SortDirection = Object.freeze({
    ASC: "ASC",
    DESC: "DESC",
});
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];
