import React from "react";
import { useTranslations } from "next-intl";

const TopicCreatePanel = () => {
    const t = useTranslations("topicManagement.create.panel");

    return (
        <div className="space-y-4">
            <div className="bg-bgc-app space-y-2 rounded-xl p-6">
                <h2 className="text-lg font-bold">{t("title")}</h2>
                <p className="text-text-muted text-sm">{t("note")}</p>
            </div>
            <div className="border-bdc-primary rounded-xl border border-dashed p-6">
                <h3 className="font-semibold">{t("hintTitle")}</h3>
                <p className="text-text-muted mt-2 text-sm">{t("hintContent")}</p>
            </div>
        </div>
    );
};

export default TopicCreatePanel;
