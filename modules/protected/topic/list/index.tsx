import React from "react";
import { useTranslations } from "next-intl";
import { TopicManagementProvider } from "./providers/topic.management.provider";
import TopicFilterBar from "./features/topic.filter.bar";
import TopicGrid from "./features/topic.grid";
import TopicDeleteDialog from "./features/topic.delete.dialog";
import TopicImportModal from "./features/topic.import.modal";

const TopicManagementContent = () => {
    const t = useTranslations("topicManagement.list");

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app rounded-xl p-6">
                <h1 className="text-2xl font-bold">{t("title")}</h1>
                <p className="text-text-muted mt-1 text-sm">{t("description")}</p>
            </div>
            <div className="bg-bgc-app rounded-xl p-6">
                <TopicFilterBar />
            </div>
            <TopicGrid />
            <TopicDeleteDialog />
            <TopicImportModal />
        </div>
    );
};

const TopicManagement = () => {
    return (
        <TopicManagementProvider>
            <TopicManagementContent />
        </TopicManagementProvider>
    );
};

export default TopicManagement;
