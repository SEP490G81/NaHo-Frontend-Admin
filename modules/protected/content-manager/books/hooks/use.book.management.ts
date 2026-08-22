import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findAllBooks, updateBook, importBooks } from "@/services/client/book.service";
import { BookQueryRequest, UpdateBookRequest } from "@/types/requests/book.request";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useBookManagement() {
    const t = useTranslations("books");
    const queryClient = useQueryClient();

    const [queryParams, setQueryParams] = useState<BookQueryRequest>({
        page: 0,
        size: 10,
    });

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    // Fetch books (Backend returns all books)
    const { data: booksResponse, isLoading: isFetchingBooks } = useQuery({
        queryKey: ["books"], // Don't include queryParams in key so it caches all books
        queryFn: () => findAllBooks(), // Don't pass queryParams to backend since it ignores them anyway
    });

    // Update book
    const updateMutation = useMutation({
        mutationFn: (data: { id: number; request: UpdateBookRequest }) =>
            updateBook(data.id, data.request),
        onSuccess: (res: any) => {
            toast.success(res?.message || t("updateSuccess") || "Update successful");
            queryClient.invalidateQueries({ queryKey: ["books"] });
            setIsUpdateModalOpen(false);
            setSelectedBookId(null);
        },
        onError: (error: unknown) => {
            const err = error as { detail?: string };
            toast.error(err?.detail || t("updateFailed") || "Update failed");
        },
    });

    // Import books
    const importMutation = useMutation({
        mutationFn: (file: File) => importBooks(file),
        onSuccess: (res: any) => {
            toast.success(res?.message || t("importSuccess") || "Import successful");
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
        onError: (error: unknown) => {
            const err = error as { detail?: string };
            toast.error(err?.detail || t("importFailed") || "Import failed");
        },
    });

    const handleSearch = (newParams: Partial<BookQueryRequest>) => {
        setQueryParams((prev) => ({ ...prev, ...newParams, page: 0 }));
    };

    const handlePageChange = (newPage: number) => {
        setQueryParams((prev) => ({ ...prev, page: newPage }));
    };

    const openUpdateModal = (bookId: number) => {
        setSelectedBookId(bookId);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedBookId(null);
    };

    // --- Client-side processing ---

    const processedBooks = useMemo(() => {
        const allBooks = booksResponse?.data || [];
        let result = [...allBooks];

        // 1. Filter
        if (queryParams.keyword) {
            const keyword = queryParams.keyword.toLowerCase();
            result = result.filter(book => book.title.toLowerCase().includes(keyword));
        }
        if (queryParams.cefrLevel && queryParams.cefrLevel !== "ALL" as unknown as typeof queryParams.cefrLevel) {
            result = result.filter(book => book.cefrLevel === queryParams.cefrLevel);
        }

        // 2. Sort
        if (queryParams.sortDirection) {
            result.sort((a, b) => {
                const cmp = a.title.localeCompare(b.title);
                return queryParams.sortDirection === 'ASC' ? cmp : -cmp;
            });
        }

        return result;
    }, [booksResponse?.data, queryParams]);

    const page = queryParams.page || 0;
    const size = queryParams.size || 10;
    
    const paginatedBooks = useMemo(() => {
        const start = page * size;
        return processedBooks.slice(start, start + size);
    }, [processedBooks, page, size]);

    const clientPageMeta = useMemo(() => {
        const totalElements = processedBooks.length;
        const totalPages = Math.ceil(totalElements / size);
        return {
            currentPage: page,
            pageSize: size,
            totalPages,
            totalElements,
            hasNextPage: page < totalPages - 1,
            hasPreviousPage: page > 0,
        };
    }, [processedBooks.length, page, size]);

    return {
        queryParams,
        handleSearch,
        handlePageChange,
        books: paginatedBooks,
        pageMeta: clientPageMeta,
        isFetchingBooks,
        updateMutation,
        importMutation,
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedBookId,
    };
}
