"use client";
import { useTranslations } from "next-intl";
import {
    PromptModerationProvider,
    usePromptModeration,
} from "./providers/prompt.moderation.provider";
import ModerationStatCards from "./features/moderation.stat.cards";
import ModerationFilterBar from "./features/moderation.filter.bar";
import ModerationQueueTable from "./features/moderation.queue.table";

const PromptModerationContent = () => {
    const t = useTranslations("promptModeration");
    const { pendingCount } = usePromptModeration();

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app flex flex-wrap items-start justify-between gap-4 rounded-xl p-6">
                <div>
                    <h1 className="text-2xl font-bold">{t("title")}</h1>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("description")}
                    </p>
                </div>
                {pendingCount > 0 && (
                    <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap">
                        {t("pendingBadge", { count: pendingCount })}
                    </span>
                )}
            </div>
            <ModerationStatCards />
            <div className="bg-bgc-app space-y-6 rounded-xl p-6">
                <ModerationFilterBar />
                <ModerationQueueTable />
            </div>
        </div>
    );
};

const PromptModeration = () => {
    return (
        <PromptModerationProvider>
            <PromptModerationContent />
        </PromptModerationProvider>
    );
};

export default PromptModeration;
