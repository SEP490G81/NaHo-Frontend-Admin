"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import FuriganaText from "@/components/ui/furigana.text";
import { useTopicQuestions } from "../providers/topic.questions.provider";

const QuestionContentTab = () => {
    const t = useTranslations("topicManagement.questions.content");
    const tParent = useTranslations("topicManagement.questions");
    const {
        draft,
        setDraftField,
        setAudioName,
        generateFurigana,
        isTokenizing,
    } = useTopicQuestions();

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    {t("jpLabel")} <span className="text-bgc-error">*</span>
                </label>
                <TextFieldCustom
                    fullWidth
                    size="small"
                    placeholder={t("jpPlaceholder")}
                    value={draft.jp}
                    onChange={(e) => setDraftField({ jp: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{t("furiganaLabel")}</label>
                    <Button
                        size="small"
                        startIcon={<AutoFixHighOutlinedIcon fontSize="small" />}
                        loading={isTokenizing}
                        onClick={generateFurigana}
                        sx={{ color: "var(--color-bgc-highlight)", textTransform: "none" }}
                    >
                        {t("generateFurigana")}
                    </Button>
                </div>
                <TextFieldCustom
                    fullWidth
                    size="small"
                    placeholder={t("furiganaPlaceholder")}
                    value={draft.furigana}
                    onChange={(e) => setDraftField({ furigana: e.target.value })}
                />
                {draft.jp && draft.furigana && (
                    <div className="border-bdc-primary bg-bgc-page rounded-lg border px-3 py-3">
                        <span className="text-text-muted mr-2 text-xs">
                            {tParent("furiganaPreview")}
                        </span>
                        <FuriganaText
                            jp={draft.jp}
                            furigana={draft.furigana}
                            className="text-lg leading-loose"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">
                    {t("viLabel")} <span className="text-bgc-error">*</span>
                </label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    minRows={2}
                    placeholder={t("viPlaceholder")}
                    value={draft.vi}
                    onChange={(e) => setDraftField({ vi: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t("audioLabel")}</label>
                <label className="border-bdc-muted hover:border-bgc-highlight flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed py-8 transition-colors">
                    <FileUploadOutlinedIcon className="text-text-muted" />
                    <span className="text-sm">{draft.audioName || t("audioHint")}</span>
                    <span className="text-text-muted text-xs">{t("audioSupport")}</span>
                    <input
                        type="file"
                        accept="audio/mpeg,audio/wav"
                        className="hidden"
                        onChange={(e) => setAudioName(e.target.files?.[0]?.name ?? "")}
                    />
                </label>
            </div>
        </div>
    );
};

export default QuestionContentTab;
