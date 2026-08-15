import { ApiError } from "@/libs/api.error";
import { UpdateBookRequest, BookQueryRequest } from "@/types/requests/book.request";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { BookResponse } from "@/types/responses/book.response";

export async function findAllBooks(query?: BookQueryRequest): Promise<ApiResponse<BookResponse[]>> {
    const searchParams = new URLSearchParams();
    if (query?.keyword) searchParams.append("keyword", query.keyword);
    if (query?.jlptLevel) searchParams.append("jlptLevel", query.jlptLevel);
    if (query?.cefrLevel) searchParams.append("cefrLevel", query.cefrLevel);
    if (query?.sortDirection) searchParams.append("sortDirection", query.sortDirection);
    if (query?.page !== undefined) searchParams.append("page", query.page.toString());
    if (query?.size !== undefined) searchParams.append("size", query.size.toString());

    const url = `/api/books${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const result = await response.json();
        throw new ApiError(result as ProblemDetail);
    }

    return response.json();
}

export async function findBookById(bookId: number): Promise<ApiResponse<BookResponse>> {
    const response = await fetch(`/api/books/${bookId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const result = await response.json();
        throw new ApiError(result as ProblemDetail);
    }

    return response.json();
}

export async function updateBook(bookId: number, request: UpdateBookRequest): Promise<ApiResponse<BookResponse>> {
    const response = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const result = await response.json();
        throw new ApiError(result as ProblemDetail);
    }

    return response.json();
}

export async function importBooks(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/books/import", {
        method: "POST",
        body: formData,
        // Let the browser set the Content-Type automatically for multipart/form-data with boundary
    });

    if (!response.ok) {
        const result = await response.json();
        throw new ApiError(result as ProblemDetail);
    }
}

export async function uploadCoverImage(file: File): Promise<ApiResponse<import("@/types/responses/book.response").FileResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/books/cover-image", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const result = await response.json();
        throw new ApiError(result as ProblemDetail);
    }

    return response.json();
}
