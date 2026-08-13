"use client";

import React from "react";
import { ShieldCheck, ShieldX } from "lucide-react";

interface EmailVerifiedBadgeProps {
    isVerified: boolean;
    verifiedLabel: string;
    notVerifiedLabel: string;
}

export default function EmailVerifiedBadge({
    isVerified,
    verifiedLabel,
    notVerifiedLabel,
}: EmailVerifiedBadgeProps) {
    return isVerified ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            {verifiedLabel}
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <ShieldX className="h-3.5 w-3.5 shrink-0" />
            {notVerifiedLabel}
        </span>
    );
}
