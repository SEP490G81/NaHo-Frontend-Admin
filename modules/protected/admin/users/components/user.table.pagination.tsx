"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    FormControl,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Tooltip,
} from "@mui/material";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useUserFilter } from "@/modules/protected/admin/users/providers/user.filter.provider";
import { PAGE_SIZE_OPTIONS } from "@/modules/protected/admin/users/constants/user.table.constants";
import { PageMeta } from "@/types/responses/base.response";

interface Props {
    pageMeta: PageMeta | undefined;
}

export default function UserTablePagination({ pageMeta }: Props) {
    const t = useTranslations("userManagement.pagination");
    const { filter, setPage, setSize } = useUserFilter();

    const totalPages = pageMeta?.totalPages ?? 0;
    const totalElements = pageMeta?.totalElements ?? 0;
    const currentPage = filter.page; // 0-indexed

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: total elements + rows per page */}
            <div className="flex items-center gap-3">
                <span className="text-text-muted text-xs">
                    {t("totalElements", { count: totalElements })}
                </span>

                <div className="flex items-center gap-1.5">
                    <span className="text-text-muted text-xs">
                        {t("rowsPerPage")}
                    </span>
                    <FormControl size="small">
                        <Select
                            value={filter.size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            sx={{
                                fontSize: "0.75rem",
                                height: 30,
                                borderRadius: "8px",
                                color: "var(--color-text-contrast)",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-bdc-primary)",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-bgc-highlight)",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor:
                                            "var(--color-bgc-highlight)",
                                    },
                                "& .MuiSelect-icon": {
                                    color: "var(--color-text-muted)",
                                },
                            }}
                        >
                            {PAGE_SIZE_OPTIONS.map((opt) => (
                                <MenuItem key={opt} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            {/* Right: pagination controls */}
            <div className="flex items-center gap-2">
                {/* First page */}
                <Tooltip title={t("firstPage")}>
                    <span>
                        <IconButton
                            size="small"
                            disabled={currentPage === 0}
                            onClick={() => setPage(0)}
                            sx={{
                                color: "var(--color-text-muted)",
                                "&:hover": {
                                    color: "var(--color-bgc-highlight)",
                                },
                                "&.Mui-disabled": {
                                    color: "var(--color-bdc-primary)",
                                },
                            }}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </IconButton>
                    </span>
                </Tooltip>

                {/* MUI Pagination */}
                <Pagination
                    count={totalPages}
                    page={currentPage + 1} // MUI is 1-indexed
                    onChange={(_, page) => setPage(page - 1)}
                    shape="rounded"
                    size="small"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "var(--color-text-muted)",
                            borderColor: "var(--color-bdc-primary)",
                            fontSize: "0.75rem",
                            "&:hover": {
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                            "&.Mui-selected": {
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor:
                                        "var(--color-bgc-highlight)",
                                    opacity: 0.9,
                                },
                            },
                        },
                    }}
                />

                {/* Last page */}
                <Tooltip title={t("lastPage")}>
                    <span>
                        <IconButton
                            size="small"
                            disabled={
                                currentPage >= totalPages - 1 ||
                                totalPages === 0
                            }
                            onClick={() => setPage(totalPages - 1)}
                            sx={{
                                color: "var(--color-text-muted)",
                                "&:hover": {
                                    color: "var(--color-bgc-highlight)",
                                },
                                "&.Mui-disabled": {
                                    color: "var(--color-bdc-primary)",
                                },
                            }}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        </div>
    );
}
