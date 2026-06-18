"use client";
import { useTranslations } from "next-intl";
import { ModerationStatus } from "@/types/enums/moderation.enum";
import {
    MODERATION_STATUSES,
    STAT_CARD_ACCENT,
    STATUS_KEY,
} from "../constants/prompt.moderation.constant";
import { usePromptModeration } from "../providers/prompt.moderation.provider";

const ModerationStatCards = () => {
    const t = useTranslations("promptModeration.status");
    const { statusCounts, filters, toggleStatusFilter } = usePromptModeration();

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MODERATION_STATUSES.map((status: ModerationStatus) => {
                const isActive = filters.status === status;
                return (
                    <button
                        key={status}
                        type="button"
                        onClick={() => toggleStatusFilter(status)}
                        aria-pressed={isActive}
                        className={`bg-bgc-app rounded-xl border p-5 text-left transition-colors ${
                            isActive
                                ? "border-bgc-highlight"
                                : "hover:bg-hbgc-app border-transparent"
                        }`}
                    >
                        <p className="text-text-muted text-sm">
                            {t(STATUS_KEY[status])}
                        </p>
                        <p
                            className={`mt-1 text-3xl font-bold ${STAT_CARD_ACCENT[status]}`}
                        >
                            {statusCounts[status]}
                        </p>
                    </button>
                );
            })}
        </div>
    );
};

export default ModerationStatCards;
