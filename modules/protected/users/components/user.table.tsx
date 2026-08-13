"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUp } from "lucide-react";
import { UserResponse } from "@/types/responses/user.response";
import {
    FeSort,
    FeSortColumn,
} from "@/modules/protected/users/types/user.table.type";
import { useUserFilter } from "@/modules/protected/users/providers/user.filter.provider";
import UserTableSkeleton from "@/modules/protected/users/components/user.table.skeleton";
import UserTableEmpty from "@/modules/protected/users/components/user.table.empty";
import UserTableRow from "@/modules/protected/users/components/user.table.row";

interface Props {
    users: UserResponse[];
    pageOffset: number;
    isLoading?: boolean;
}

function getCellValue(user: UserResponse, col: FeSortColumn): string {
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

export default function UserTable({ users, pageOffset, isLoading }: Readonly<Props>) {
    const t = useTranslations("userManagement.table");
    const { resetVersion } = useUserFilter();

    const [feSort, setFeSort] = useState<FeSort>({
        column: null,
        direction: "asc",
    });

    const [prevResetVersion, setPrevResetVersion] = useState(resetVersion);
    if (prevResetVersion !== resetVersion) {
        setPrevResetVersion(resetVersion);
        setFeSort({ column: null, direction: "asc" });
    }

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
        "px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted";
    const cellClass = "px-4 py-3 text-center text-sm text-text-contrast whitespace-nowrap";

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
        t("subscriptionPlan"),
        t("actions"),
    ];

    if (isLoading) {
        return (
            <UserTableSkeleton
                tableHeaders={TABLE_HEADERS}
                headClass={headClass}
                cellClass={cellClass}
            />
        );
    }

    if (!users.length) {
        return <UserTableEmpty />;
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg">
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
                                className={`${headClass} hover:text-bgc-highlight cursor-pointer transition-colors select-none`}
                                onClick={() => handleColumnSort(col)}
                            >
                                {t(col)}
                                {renderSortIcon(col)}
                            </th>
                        ))}
                        <th className={headClass}>{t("emailVerified")}</th>
                        <th className={headClass}>{t("subscriptionPlan")}</th>
                        <th className={headClass}>{t("actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <UserTableRow
                            key={user.id}
                            user={user}
                            index={index}
                            pageOffset={pageOffset}
                            cellClass={cellClass}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
