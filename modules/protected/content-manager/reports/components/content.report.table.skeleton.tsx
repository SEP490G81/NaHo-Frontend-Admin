"use client";

import React from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";
import { CONTENT_REPORT_TABLE_COLUMN_COUNT } from "../constants/content.report.constants";

interface Props {
    readonly rows?: number;
}

export function ContentReportTableSkeleton({ rows = 5 }: Props) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                    {Array.from({
                        length: CONTENT_REPORT_TABLE_COLUMN_COUNT,
                    }).map((__, cellIdx) => (
                        <TableCell key={cellIdx} align="center">
                            <Skeleton
                                variant="text"
                                width={cellIdx === 0 ? 20 : 100}
                                className="mx-auto"
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}
