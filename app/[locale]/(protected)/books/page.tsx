"use client";

import { useTranslations } from "next-intl";
import { useBookManagement } from "@/modules/protected/books/hooks/useBookManagement";
import BookTable from "@/modules/protected/books/features/BookTable";
import BookSearchFilter from "@/modules/protected/books/features/BookSearchFilter";
import UpdateBookModal from "@/modules/protected/books/features/UpdateBookModal";
import { Box, Typography } from "@mui/material";

export default function BookManagementPage() {
    const t = useTranslations("books");
    const {
        handleSearch,
        handlePageChange,
        books,
        pageMeta,
        isFetchingBooks,
        updateMutation,
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedBookId,
    } = useBookManagement();

    const selectedBook = books.find((b) => b.id === selectedBookId) || null;

    return (
        <Box className="p-6">
            <Box className="flex justify-between items-center mb-6">
                <Typography variant="h4" className="font-bold text-gray-800">
                    {t("bookManagement") || "Book Management"}
                </Typography>
            </Box>

            <Box className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <BookSearchFilter onSearch={handleSearch} />
                
                <BookTable
                    books={books}
                    pageMeta={pageMeta}
                    isLoading={isFetchingBooks}
                    onPageChange={handlePageChange}
                    onUpdateClick={openUpdateModal}
                />
            </Box>

            <UpdateBookModal
                open={isUpdateModalOpen}
                onClose={closeUpdateModal}
                book={selectedBook}
                onSave={updateMutation.mutate}
                isUpdating={updateMutation.isPending}
            />
        </Box>
    );
}
