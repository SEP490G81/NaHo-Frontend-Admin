"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useTopicQuestions } from "../providers/topic.questions.provider";

const QuestionContextTab = () => {
    const t = useTranslations("topicManagement.questions.context");
    const { draft, setDraftField } = useTopicQuestions();

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium">{t("jpLabel")}</label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder={t("jpPlaceholder")}
                    value={draft.contextHintJp}
                    onChange={(e) => setDraftField({ contextHintJp: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">{t("viLabel")}</label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={4}
                    placeholder={t("viPlaceholder")}
                    value={draft.contextHintVi}
                    onChange={(e) => setDraftField({ contextHintVi: e.target.value })}
                />
            </div>
        </div>
    );
};

export default QuestionContextTab;
