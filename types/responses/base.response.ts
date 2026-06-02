interface PageMeta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}

interface ApiMeta {
    traceId: string;
    timestamp: string;
    pageMeta?: PageMeta;
}

export interface ApiResponse<T> {
    meta: ApiMeta;
    message: string;
    data: T;
}
