"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, Tab, Tabs } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useTopicQuestions } from "../providers/topic.questions.provider";
import { QuestionTab } from "../types/topic.questions.type";
import QuestionContentTab from "../components/question.content.tab";
import QuestionVocabTab from "../components/question.vocab.tab";
import QuestionContextTab from "../components/question.context.tab";

const QuestionEditor = () => {
    const t = useTranslations("topicManagement.questions");
    const { selectedId, activeTab, setActiveTab, save, isSaving } =
        useTopicQuestions();

    return (
        <div className="bg-bgc-app rounded-xl p-6">
            <div>
                <h2 className="text-xl font-bold">
                    {selectedId ? t("editTitle") : t("createTitle")}
                </h2>
                <p className="text-text-muted mt-1 text-sm">{t("createDescription")}</p>
            </div>

            <Tabs
                value={activeTab}
                onChange={(_, value) => setActiveTab(value as QuestionTab)}
                sx={{
                    mt: 3,
                    mb: 4,
                    "& .MuiTabs-indicator": {
                        backgroundColor: "var(--color-bgc-highlight)",
                    },
                    "& .Mui-selected": { color: "var(--color-bgc-highlight) !important" },
                }}
            >
                <Tab value="content" label={t("tabs.content")} />
                <Tab value="vocab" label={t("tabs.vocab")} />
                <Tab value="context" label={t("tabs.context")} />
            </Tabs>

            {activeTab === "content" && <QuestionContentTab />}
            {activeTab === "vocab" && <QuestionVocabTab />}
            {activeTab === "context" && <QuestionContextTab />}

            <div className="mt-6 flex justify-end border-t pt-5">
                <Button
                    variant="contained"
                    disableElevation
                    disabled={isSaving}
                    startIcon={<SaveOutlinedIcon />}
                    onClick={save}
                    sx={{
                        bgcolor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-contrast)",
                    }}
                >
                    {t("save")}
                </Button>
            </div>
        </div>
    );
};

export default QuestionEditor;
