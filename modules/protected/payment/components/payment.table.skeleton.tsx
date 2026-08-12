"use client";

import React from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";

interface PaymentTableSkeletonProps {
    readonly rows?: number;
}

export function PaymentTableSkeleton({ rows = 5 }: PaymentTableSkeletonProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, idx) => (
                <TableRow key={idx}>
                    <TableCell className="text-center">
                        <Skeleton variant="text" width={20} className="mx-auto" />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={120} />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton variant="text" width={40} className="mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton variant="text" width={60} className="mx-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                        <Skeleton variant="text" width={80} className="ml-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton variant="text" width={60} className="mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton variant="rounded" width={80} height={24} className="mx-auto" />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell className="text-center">
                        <Skeleton variant="circular" width={28} height={28} className="mx-auto" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
