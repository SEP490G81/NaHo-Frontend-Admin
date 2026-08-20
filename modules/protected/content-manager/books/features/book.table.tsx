"use client";

import { useTranslations } from "next-intl";
import { BookResponse } from "@/types/responses/book.response";
import { PageMeta } from "@/types/responses/base.response";
import {
    Pagination,
    Box,
    IconButton,
    Typography,
    Tooltip,
    CircularProgress
} from "@mui/material";
import { Edit2 } from "lucide-react";
import Image from "next/image";

interface BookTableProps {
    books: BookResponse[];
    pageMeta?: PageMeta;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onUpdateClick: (bookId: number) => void;
}

export default function BookTable({
    books,
    pageMeta,
    isLoading,
    onPageChange,
    onUpdateClick,
}: Readonly<BookTableProps>) {
    const t = useTranslations("books");

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // MUI Pagination is 1-indexed, but our API uses 0-indexed pages
        onPageChange(value - 1);
    };

    const headClass = "px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted";
    const cellClass = "px-4 py-3 text-center text-sm text-text-contrast";

    return (
        <div className="w-full overflow-hidden flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-lg border border-bdc-primary custom-scrollbar">
                <table className="w-full table-auto">
                    <thead className="bg-bgc-app sticky top-0 z-10">
                        <tr className="border-bdc-primary border-b">
                            <th className={headClass}>#</th>
                            <th className={headClass}>{t("coverImage") || "Cover"}</th>
                            <th className={headClass}>{t("title") || "Title"}</th>
                            <th className={headClass}>{t("description") || "Description"}</th>
                            <th className={headClass}>CEFR</th>
                            <th className={headClass}>{t("actions") || "Actions"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} align="center" className="py-16">
                                    <CircularProgress size={32} className="mb-4 text-text-muted" />
                                    <Typography className="text-text-muted">{t("loading") || "Loading..."}</Typography>
                                </td>
                            </tr>
                        ) : books.length === 0 ? (
                            <tr>
                                <td colSpan={6} align="center" className="py-16">
                                    <div className="flex flex-col items-center justify-center text-text-muted">
                                        <Typography>{t("noData") || "No books found."}</Typography>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            books.map((book, index) => {
                                const pageIndex = pageMeta?.currentPage || 0;
                                const pageSize = pageMeta?.pageSize || 10;
                                const serialNumber = pageIndex * pageSize + index + 1;

                                return (
                                    <tr
                                        key={book.id}
                                        className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors group"
                                    >
                                        <td className={cellClass}>{serialNumber}</td>
                                        <td className={cellClass}>
                                            <div className="flex justify-center">
                                                {book.coverImage?.accessUrl ? (
                                                    <div className="relative w-16 h-20 rounded-md overflow-hidden border border-bdc-primary bg-bgc-panel">
                                                        <Image
                                                            src={book.coverImage.accessUrl}
                                                            alt={book.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-20 bg-bgc-panel rounded-md border border-bdc-primary border-dashed flex items-center justify-center text-xs text-text-muted text-center p-1">
                                                        No Cover
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className={`font-semibold ${cellClass} text-left`}>{book.title}</td>
                                        <td className={`${cellClass} text-left`}>
                                            <Typography variant="body2" className="line-clamp-2 text-text-muted pr-4 leading-relaxed max-w-[300px]">
                                                {book.description}
                                            </Typography>
                                        </td>
                                        <td className={cellClass}>
                                            {book.cefrLevel}
                                        </td>
                                        <td className={cellClass}>
                                            <Tooltip title={t("update") || "Update"}>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => onUpdateClick(book.id)}
                                                    className="text-text-contrast hover:bg-bgc-app"
                                                >
                                                    <Edit2 size={18} />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {pageMeta && pageMeta.totalPages > 0 && (
                <Box className="mt-2 flex justify-end">
                    <Pagination
                        count={pageMeta.totalPages}
                        page={(pageMeta.currentPage || 0) + 1}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "var(--color-text-contrast)",
                            },
                        }}
                    />
                </Box>
            )}
        </div>
    );
}
