"use client";

import { useTranslations } from "next-intl";
import { BookResponse } from "@/types/responses/book.response";
import { PageMeta } from "@/types/responses/base.response";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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

    return (
        <Box className="w-full overflow-hidden">
            <TableContainer component={Paper} elevation={0} className="border border-gray-200 rounded-xl overflow-x-auto custom-scrollbar">
                <Table sx={{ minWidth: 1000 }} aria-label="books table">
                    <TableHead className="bg-gray-50/80">
                        <TableRow>
                            <TableCell className="font-bold text-gray-600 w-16">#</TableCell>
                            <TableCell className="font-bold text-gray-600 w-28">{t("coverImage") || "Cover"}</TableCell>
                            <TableCell className="font-bold text-gray-600 w-1/4">{t("title") || "Title"}</TableCell>
                            <TableCell className="font-bold text-gray-600">{t("description") || "Description"}</TableCell>
                            <TableCell className="font-bold text-gray-600 w-24">CEFR</TableCell>
                            <TableCell className="font-bold text-gray-600 w-24" align="center">{t("actions") || "Actions"}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" className="py-16">
                                    <CircularProgress size={32} className="mb-4 text-gray-300" />
                                    <Typography className="text-gray-500">{t("loading") || "Loading..."}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : books.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" className="py-16">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <Typography>{t("noData") || "No books found."}</Typography>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            books.map((book, index) => {
                                const pageIndex = pageMeta?.currentPage || 0;
                                const pageSize = pageMeta?.pageSize || 10;
                                const serialNumber = pageIndex * pageSize + index + 1;

                                return (
                                    <TableRow
                                        key={book.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className="hover:bg-slate-50/80 transition-colors group"
                                    >
                                        <TableCell className="text-gray-500 font-medium">{serialNumber}</TableCell>
                                        <TableCell>
                                            {book.coverImage?.accessUrl ? (
                                                <div className="relative w-20 h-28 rounded-md overflow-hidden shadow-sm border border-gray-200 bg-white">
                                                    <Image
                                                        src={book.coverImage.accessUrl}
                                                        alt={book.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        sizes="80px"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-20 h-28 bg-gray-50 rounded-md border border-gray-200 border-dashed flex items-center justify-center text-xs text-gray-400 text-center p-2">
                                                    No Cover
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-semibold text-gray-800">{book.title}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" className="line-clamp-2 text-gray-500 pr-4 leading-relaxed">
                                                {book.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {book.cefrLevel}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={t("update") || "Update"}>
                                                <IconButton 
                                                    size="small" 
                                                    color="primary"
                                                    onClick={() => onUpdateClick(book.id)}
                                                >
                                                    <Edit2 size={18} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {pageMeta && pageMeta.totalPages > 0 && (
                <Box className="mt-4 flex justify-end">
                    <Pagination
                        count={pageMeta.totalPages}
                        page={(pageMeta.currentPage || 0) + 1}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
}
