"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { IconButton, Skeleton, Tooltip } from "@mui/material";
import {
    ArrowDown,
    ArrowUp,
    Eye,
    Lock,
    Pencil,
    ShieldCheck,
    ShieldX,
    Unlock,
} from "lucide-react";
import { AdminUserResponse } from "@/types/responses/user.response";
import {
    FeSort,
    FeSortColumn,
} from "@/modules/protected/users/types/user.table.type";
import { toast } from "react-toastify";
import { useUserFilter } from "@/modules/protected/users/providers/user.filter.provider";

interface Props {
    users: AdminUserResponse[];
    pageOffset: number;
    isLoading?: boolean;
}

function getCellValue(user: AdminUserResponse, col: FeSortColumn): string {
    switch (col) {
        case "email":
            return user.email ?? "";
        case "username":
            return user.username ?? "";
        case "fullName":
            return user.fullName ?? "";
        case "role":
            return user.role?.roleName ?? "";
        default:
            return "";
    }
}

export default function UserTable({ users, pageOffset, isLoading }: Props) {
    const t = useTranslations("userManagement.table");
    const tActions = useTranslations("userManagement.actions");
    const { resetVersion } = useUserFilter();

    const [feSort, setFeSort] = useState<FeSort>({
        column: null,
        direction: "asc",
    });

    // Reset FE sort khi provider reset
    useEffect(() => {
        setFeSort({ column: null, direction: "asc" });
    }, [resetVersion]);

    const handleColumnSort = (col: FeSortColumn) => {
        setFeSort((prev) => {
            if (prev.column === col) {
                return {
                    column: col,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { column: col, direction: "asc" };
        });
    };

    const sortedUsers = useMemo(() => {
        if (!feSort.column || !users.length) return users;
        const col = feSort.column;
        const dir = feSort.direction === "asc" ? 1 : -1;
        return [...users].sort((a, b) => {
            const va = getCellValue(a, col).toLowerCase();
            const vb = getCellValue(b, col).toLowerCase();
            return va < vb ? -dir : va > vb ? dir : 0;
        });
    }, [users, feSort]);

    const headClass =
        "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted";
    const cellClass =
        "px-4 py-3 text-sm text-text-contrast whitespace-nowrap";

    const renderSortIcon = (col: FeSortColumn) => {
        if (feSort.column !== col) return null;
        return feSort.direction === "asc" ? (
            <ArrowUp className="ml-1 inline h-3 w-3" />
        ) : (
            <ArrowDown className="ml-1 inline h-3 w-3" />
        );
    };

    const TABLE_HEADERS = [
        t("stt"),
        t("email"),
        t("username"),
        t("fullName"),
        t("role"),
        t("emailVerified"),
        t("actions"),
    ];

    /* ---- Skeleton loading ---- */
    if (isLoading) {
        return (
            <div className="max-h-[65vh] overflow-auto rounded-lg">
                <table className="w-full table-auto">
                    <thead className="bg-bgc-app sticky top-0 z-10">
                        <tr className="border-bdc-primary border-b">
                            {TABLE_HEADERS.map((label) => (
                                <th key={label} className={headClass}>
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr
                                key={i}
                                className="border-bdc-primary border-b"
                            >
                                {Array.from({ length: 7 }).map((_, j) => (
                                    <td key={j} className={cellClass}>
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                bgcolor:
                                                    "var(--color-hbgc-app)",
                                            }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    /* ---- Empty state ---- */
    if (!users.length) {
        return (
            <div className="text-text-muted flex items-center justify-center py-16 text-sm">
                {t("noData")}
            </div>
        );
    }

    /* ---- Data table ---- */
    return (
        <div className="max-h-[65vh] overflow-auto rounded-lg">
            <table className="w-full table-auto">
                <thead className="bg-bgc-app sticky top-0 z-10">
                    <tr className="border-bdc-primary border-b">
                        <th className={headClass}>{t("stt")}</th>
                        {(
                            [
                                "email",
                                "username",
                                "fullName",
                                "role",
                            ] as FeSortColumn[]
                        ).map((col) => (
                            <th
                                key={col}
                                className={`${headClass} cursor-pointer select-none transition-colors hover:text-bgc-highlight`}
                                onClick={() => handleColumnSort(col)}
                            >
                                {t(col)}
                                {renderSortIcon(col)}
                            </th>
                        ))}
                        <th className={headClass}>{t("emailVerified")}</th>
                        <th className={headClass}>{t("actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr
                            key={user.id}
                            className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors"
                        >
                            {/* STT */}
                            <td className={cellClass}>
                                {pageOffset + index + 1}
                            </td>

                            {/* Email */}
                            <td className={cellClass}>
                                <span className="max-w-[220px] truncate">
                                    {user.email}
                                </span>
                            </td>

                            {/* Username */}
                            <td className={cellClass}>
                                {user.username ?? "—"}
                            </td>

                            {/* Full Name */}
                            <td className={cellClass}>
                                {user.fullName ?? "—"}
                            </td>

                            {/* Role */}
                            <td className={cellClass}>
                                <span className="bg-bgc-highlight/10 text-bgc-highlight inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium">
                                    {user.role?.roleName ?? "—"}
                                </span>
                            </td>

                            {/* Email Verified — badge style */}
                            <td className={cellClass}>
                                <EmailVerifiedBadge
                                    verifiedLabel={t("verified")}
                                    notVerifiedLabel={t("notVerified")}
                                />
                            </td>

                            {/* Actions — colorful buttons */}
                            <td className={cellClass}>
                                <div className="flex items-center gap-1">
                                    {/* View detail — teal */}
                                    <Tooltip title={tActions("viewDetail")}>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                toast.info(
                                                    `View detail: ${user.id}`,
                                                )
                                            }
                                            sx={{
                                                color: "#14b8a6",
                                                backgroundColor:
                                                    "rgba(20,184,166,0.08)",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(20,184,166,0.18)",
                                                },
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>

                                    {/* Update — blue */}
                                    <Tooltip title={tActions("update")}>
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                toast.info(
                                                    `Update: ${user.id}`,
                                                )
                                            }
                                            sx={{
                                                color: "#3b82f6",
                                                backgroundColor:
                                                    "rgba(59,130,246,0.08)",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "rgba(59,130,246,0.18)",
                                                },
                                            }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>

                                    {/* Lock / Unlock — red / green */}
                                    <Tooltip
                                        title={
                                            user.status === "ACTIVE"
                                                ? tActions("lock")
                                                : tActions("unlock")
                                        }
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                toast.info(
                                                    `Toggle lock: ${user.id}`,
                                                )
                                            }
                                            sx={{
                                                color:
                                                    user.status === "ACTIVE"
                                                        ? "var(--color-text-error)"
                                                        : "var(--color-text-success)",
                                                backgroundColor:
                                                    user.status === "ACTIVE"
                                                        ? "rgba(239,35,60,0.08)"
                                                        : "rgba(46,155,91,0.08)",
                                                "&:hover": {
                                                    backgroundColor:
                                                        user.status ===
                                                        "ACTIVE"
                                                            ? "rgba(239,35,60,0.18)"
                                                            : "rgba(46,155,91,0.18)",
                                                },
                                            }}
                                        >
                                            {user.status === "ACTIVE" ? (
                                                <Lock className="h-4 w-4" />
                                            ) : (
                                                <Unlock className="h-4 w-4" />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ---- Sub-component: Email verified badge ---- */

function EmailVerifiedBadge({
    verifiedLabel,
    notVerifiedLabel,
}: {
    verifiedLabel: string;
    notVerifiedLabel: string;
}) {
    // TODO: khi BE trả isEmailVerified, thay hardcode bằng prop thật.
    // Tạm thời hiển thị "Đã xác thực" mặc định.
    const verified = true;

    return verified ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            {verifiedLabel}
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <ShieldX className="h-3 w-3" />
            {notVerifiedLabel}
        </span>
    );
}
