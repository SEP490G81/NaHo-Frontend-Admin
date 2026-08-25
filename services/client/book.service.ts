import { apiClient } from "@/libs/apiClient";
import {
    UpdateBookRequest,
    BookQueryRequest,
} from "@/types/requests/book.request";
import { ApiResponse } from "@/types/responses/base.response";
import {
    BookResponse,
    FileResponse,
} from "@/types/responses/book.response";

export async function findAllBooks(
    query?: BookQueryRequest,
): Promise<ApiResponse<BookResponse[]>> {
    const searchParams = new URLSearchParams();
    if (query?.keyword) searchParams.append("keyword", query.keyword);
    if (query?.jlptLevel) searchParams.append("jlptLevel", query.jlptLevel);
    if (query?.cefrLevel) searchParams.append("cefrLevel", query.cefrLevel);
    if (query?.sortDirection)
        searchParams.append("sortDirection", query.sortDirection);
    if (query?.page !== undefined)
        searchParams.append("page", query.page.toString());
    if (query?.size !== undefined)
        searchParams.append("size", query.size.toString());

    const queryString = searchParams.toString();
    const url = `/api/books${queryString ? `?${queryString}` : ""}`;
    return apiClient.get<ApiResponse<BookResponse[]>>(url);
}

export async function findBookById(
    bookId: number,
): Promise<ApiResponse<BookResponse>> {
    return apiClient.get<ApiResponse<BookResponse>>(`/api/books/${bookId}`);
}

export async function updateBook(
    bookId: number,
    request: UpdateBookRequest,
): Promise<ApiResponse<BookResponse>> {
    return apiClient.put<ApiResponse<BookResponse>>(
        `/api/books/${bookId}`,
        request,
    );
}

export async function importBooks(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    await apiClient.upload<void>("/api/books/import", formData);
}

export async function uploadCoverImage(
    file: File,
): Promise<ApiResponse<FileResponse>> {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.upload<ApiResponse<FileResponse>>(
        "/api/books/cover-image",
        formData,
    );
}
