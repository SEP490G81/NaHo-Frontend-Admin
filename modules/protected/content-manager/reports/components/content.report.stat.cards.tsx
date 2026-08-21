"use client";

import React from "react";
import { Clock, Flag, HelpCircle, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { cn } from "@/libs/utils";
import {
    REPORT_TYPE_FILTER_ALL,
    ReportStatusFilter,
    ReportType,
} from "@/types/enums/report.enum";
import { CONTENT_REPORT_STAT_CARDS } from "../constants/content.report.constants";
import { useContentReportFilter } from "../providers/content.report.filter.provider";
import {
    ContentReportStatCardKey,
    ContentReportStats,
} from "../types/content.report.type";

interface Props {
    readonly stats: ContentReportStats;
}

const CARD_STYLE: Record<
    ContentReportStatCardKey,
    { icon: React.ComponentType<{ className?: string }>; accent: string }
> = {
    total: { icon: Flag, accent: "text-bgc-highlight bg-bgc-highlight/10" },
    unresolved: {
        icon: Clock,
        accent: "text-amber-600 bg-amber-100 dark:bg-amber-950/60",
    },
    question: {
        icon: HelpCircle,
        accent: "text-purple-600 bg-purple-100 dark:bg-purple-950/60",
    },
    comment: {
        icon: MessageSquare,
        accent: "text-pink-600 bg-pink-100 dark:bg-pink-950/60",
    },
};

export function ContentReportStatCards({ stats }: Props) {
    const t = useTranslations("contentReportManagement.stats");
    const { filter, applyStatCard } = useContentReportFilter();

    const isActive = (card: ContentReportStatCardKey) => {
        if (card === "unresolved") {
            return filter.isResolved === ReportStatusFilter.UNRESOLVED;
        }
        if (card === "question") {
            return filter.reportType === ReportType.QUESTION;
        }
        if (card === "comment") {
            return filter.reportType === ReportType.COMMENT;
        }
        return (
            filter.isResolved === ReportStatusFilter.ALL &&
            filter.reportType === REPORT_TYPE_FILTER_ALL
        );
    };

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CONTENT_REPORT_STAT_CARDS.map((card) => {
                const { icon: Icon, accent } = CARD_STYLE[card];
                const active = isActive(card);

                return (
                    <ContainerBox
                        as="button"
                        type="button"
                        key={card}
                        onClick={() => applyStatCard(card)}
                        aria-pressed={active}
                        className={cn(
                            "hover:border-bgc-highlight flex cursor-pointer items-center gap-3 text-left transition-all",
                            active && "border-bgc-highlight shadow-sm",
                        )}
                    >
                        <span
                            className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                accent,
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                            <span className="text-text-contrast text-xl font-bold">
                                {stats[card]}
                            </span>
                            <span className="text-text-muted truncate text-xs">
                                {t(card)}
                            </span>
                        </span>
                    </ContainerBox>
                );
            })}
        </div>
    );
}
