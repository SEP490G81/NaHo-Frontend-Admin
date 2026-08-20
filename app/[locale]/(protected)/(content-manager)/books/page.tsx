"use client";

import { useTranslations } from "next-intl";
import { useBookManagement } from "@/modules/protected/content-manager/books/hooks/use.book.management";
import BookTable from "@/modules/protected/content-manager/books/features/book.table";
import BookSearchFilter from "@/modules/protected/content-manager/books/features/book.search.filter";
import UpdateBookModal from "@/modules/protected/content-manager/books/features/book.update.modal";
import ContainerBox from "@/components/ui/container.box";

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
        <div className="flex w-full flex-col gap-y-4">
            <ContainerBox>
                <div className="flex flex-col gap-3">
                    <h1 className="text-text-contrast text-2xl font-bold">
                        {t("bookManagement") || "Book Management"}
                    </h1>
                    <BookSearchFilter onSearch={handleSearch} />
                </div>
            </ContainerBox>

            <ContainerBox>
                <BookTable
                    books={books}
                    pageMeta={pageMeta}
                    isLoading={isFetchingBooks}
                    onPageChange={handlePageChange}
                    onUpdateClick={openUpdateModal}
                />
            </ContainerBox>

            <UpdateBookModal
                open={isUpdateModalOpen}
                onClose={closeUpdateModal}
                book={selectedBook}
                onSave={updateMutation.mutate}
                isUpdating={updateMutation.isPending}
            />
        </div>
    );
}
