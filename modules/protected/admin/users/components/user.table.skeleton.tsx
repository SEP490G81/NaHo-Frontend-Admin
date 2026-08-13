"use client";

import React from "react";
import { Skeleton } from "@mui/material";

interface UserTableSkeletonProps {
    tableHeaders: string[];
    headClass: string;
    cellClass: string;
    rowCount?: number;
}

export default function UserTableSkeleton({
    tableHeaders,
    headClass,
    cellClass,
    rowCount = 5,
}: UserTableSkeletonProps) {
    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <table className="w-full table-auto">
                <thead className="bg-bgc-app sticky top-0 z-10">
                    <tr className="border-bdc-primary border-b">
                        {tableHeaders.map((label) => (
                            <th key={label} className={headClass}>
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowCount }).map((_, i) => (
                        <tr key={i} className="border-bdc-primary border-b">
                            {tableHeaders.map((_, j) => (
                                <td key={j} className={cellClass}>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            bgcolor: "var(--color-hbgc-app)",
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
