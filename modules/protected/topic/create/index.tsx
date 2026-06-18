import React from "react";
import { useTranslations } from "next-intl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@/i18n/navigation";
import TopicCreateForm from "./features/topic.create.form";
import TopicCreatePanel from "./components/topic.create.panel";

const TopicCreate = () => {
    const t = useTranslations("topicManagement.create");

    return (
        <div className="space-y-5">
            <div className="bg-bgc-app space-y-3 rounded-xl p-6">
                <Link
                    href="/content-manager/topics"
                    className="text-text-muted hover:text-bgc-highlight inline-flex items-center gap-1 text-sm"
                >
                    <ArrowBackIcon fontSize="small" />
                    {t("back")}
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">{t("title")}</h1>
                    <p className="text-text-muted mt-1 text-sm">{t("description")}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
                <TopicCreateForm />
                <TopicCreatePanel />
            </div>
        </div>
    );
};

export default TopicCreate;
