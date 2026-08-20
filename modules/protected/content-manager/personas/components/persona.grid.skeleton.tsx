"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import ContainerBox from "@/components/ui/container.box";

const SKELETON_ITEMS = [1, 2, 3, 4, 5, 6];

export function PersonaGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SKELETON_ITEMS.map((item) => (
                <ContainerBox key={item} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <Skeleton
                            variant="rounded"
                            width={48}
                            height={48}
                            sx={{ bgcolor: "var(--color-hbgc-app)" }}
                        />
                        <div className="flex-1">
                            <Skeleton
                                variant="text"
                                width="70%"
                                sx={{ bgcolor: "var(--color-hbgc-app)" }}
                            />
                            <Skeleton
                                variant="text"
                                width="40%"
                                sx={{ bgcolor: "var(--color-hbgc-app)" }}
                            />
                        </div>
                    </div>
                    <Skeleton
                        variant="rounded"
                        height={72}
                        sx={{ bgcolor: "var(--color-hbgc-app)" }}
                    />
                    <Skeleton
                        variant="rounded"
                        height={36}
                        sx={{ bgcolor: "var(--color-hbgc-app)" }}
                    />
                </ContainerBox>
            ))}
        </div>
    );
}
