"use client";

import React from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";

interface ReportTableSkeletonProps {
    readonly rows?: number;
}

export function ReportTableSkeleton({ rows = 5 }: ReportTableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, idx) => (
                <TableRow key={idx}>
                    <TableCell align="center">
                        <Skeleton
                            variant="text"
                            width={20}
                            className="mx-auto"
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Skeleton
                            variant="text"
                            width={100}
                            className="mx-auto"
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Skeleton
                            variant="text"
                            width={160}
                            className="mx-auto"
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Skeleton
                            variant="text"
                            width={50}
                            className="mx-auto"
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Skeleton
                            variant="rounded"
                            width={90}
                            height={24}
                            className="mx-auto rounded-full"
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Skeleton
                            variant="circular"
                            width={28}
                            height={28}
                            className="mx-auto"
                        />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
