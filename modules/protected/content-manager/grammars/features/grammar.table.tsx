"use client";

import { GrammarResponse } from "@/types/responses/vocabulary.response";
import { PageMeta } from "@/types/responses/base.response";
import {
    Pagination,
    Box,
    IconButton,
    Typography,
    Tooltip,
    CircularProgress
} from "@mui/material";
import { Edit2, Trash2 } from "lucide-react";

interface GrammarTableProps {
    grammars: GrammarResponse[];
    pageMeta?: PageMeta;
    isLoading: boolean;
    onPageChange: (page: number) => void;
    onUpdateClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
}

export default function GrammarTable({
    grammars,
    pageMeta,
    isLoading,
    onPageChange,
    onUpdateClick,
    onDeleteClick,
}: Readonly<GrammarTableProps>) {
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value - 1);
    };

    const headClass = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted";
    const cellClass = "px-4 py-3 text-left text-sm text-text-contrast";

    return (
        <div className="w-full overflow-hidden flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-lg border border-bdc-primary custom-scrollbar">
                <table className="w-full table-auto">
                    <thead className="bg-bgc-app sticky top-0 z-10">
                        <tr className="border-bdc-primary border-b">
                            <th className={headClass + " text-center"}>#</th>
                            <th className={headClass}>Ngữ pháp</th>
                            <th className={headClass}>Cách đọc</th>
                            <th className={headClass}>Ý nghĩa (VN)</th>
                            <th className={headClass}>Ý nghĩa (EN)</th>
                            <th className={headClass + " text-center"}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} align="center" className="py-16">
                                    <CircularProgress size={32} className="mb-4 text-text-muted" />
                                    <Typography className="text-text-muted">Đang tải...</Typography>
                                </td>
                            </tr>
                        ) : grammars.length === 0 ? (
                            <tr>
                                <td colSpan={6} align="center" className="py-16">
                                    <div className="flex flex-col items-center justify-center text-text-muted">
                                        <Typography>Không có dữ liệu ngữ pháp.</Typography>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            grammars.map((grammar, index) => {
                                const pageIndex = pageMeta?.currentPage || 0;
                                const pageSize = pageMeta?.pageSize || 10;
                                const serialNumber = pageIndex * pageSize + index + 1;

                                return (
                                    <tr
                                        key={grammar.id}
                                        className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors group"
                                    >
                                        <td className={cellClass + " text-center"}>{serialNumber}</td>
                                        <td className={`font-semibold ${cellClass}`}>{grammar.japanese}</td>
                                        <td className={cellClass}>{grammar.reading || "-"}</td>
                                        <td className={cellClass}>{grammar.vietnameseMeaningText || "-"}</td>
                                        <td className={cellClass}>{grammar.englishMeaningText || "-"}</td>
                                        <td className={cellClass + " text-center"}>
                                            <div className="flex items-center justify-center gap-2">
                                                <Tooltip title="Sửa">
                                                    <IconButton 
                                                        size="small" 
                                                        onClick={() => onUpdateClick(grammar.id)}
                                                        className="text-text-contrast hover:bg-bgc-app"
                                                    >
                                                        <Edit2 size={18} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa">
                                                    <IconButton 
                                                        size="small" 
                                                        onClick={() => onDeleteClick(grammar.id)}
                                                        className="text-red-500 hover:bg-red-500/10"
                                                    >
                                                        <Trash2 size={18} />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
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
