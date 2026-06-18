"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { useTopicQuestions } from "../providers/topic.questions.provider";

const QuestionVocabTab = () => {
    const t = useTranslations("topicManagement.questions");
    const {
        draft,
        addVocab,
        updateVocab,
        removeVocab,
        addSentence,
        updateSentence,
        removeSentence,
    } = useTopicQuestions();

    return (
        <div className="space-y-6">
            <section className="border-bdc-primary space-y-3 rounded-xl border p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{t("vocab.title")}</h3>
                    <span className="text-text-muted text-sm">
                        {t("vocab.count", { count: draft.vocab.length })}
                    </span>
                </div>
                {draft.vocab.length === 0 ? (
                    <p className="border-bdc-primary text-text-muted rounded-lg border border-dashed py-6 text-center text-sm">
                        {t("vocab.empty")}
                    </p>
                ) : (
                    draft.vocab.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <TextFieldCustom
                                size="small"
                                placeholder={t("vocab.jpPlaceholder")}
                                value={item.jp}
                                onChange={(e) => updateVocab(i, { jp: e.target.value })}
                                className="flex-1"
                            />
                            <TextFieldCustom
                                size="small"
                                placeholder={t("vocab.furiganaPlaceholder")}
                                value={item.furigana}
                                onChange={(e) => updateVocab(i, { furigana: e.target.value })}
                                className="flex-1"
                            />
                            <TextFieldCustom
                                size="small"
                                placeholder={t("vocab.viPlaceholder")}
                                value={item.vi}
                                onChange={(e) => updateVocab(i, { vi: e.target.value })}
                                className="flex-1"
                            />
                            <IconButton size="small" color="error" onClick={() => removeVocab(i)}>
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        </div>
                    ))
                )}
                <Button variant="outlined" startIcon={<AddIcon />} onClick={addVocab}>
                    {t("vocab.add")}
                </Button>
            </section>

            <section className="border-bdc-primary space-y-3 rounded-xl border p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{t("sentences.title")}</h3>
                    <span className="text-text-muted text-sm">
                        {t("sentences.count", { count: draft.sentences.length })}
                    </span>
                </div>
                {draft.sentences.length === 0 ? (
                    <p className="border-bdc-primary text-text-muted rounded-lg border border-dashed py-6 text-center text-sm">
                        {t("sentences.empty")}
                    </p>
                ) : (
                    draft.sentences.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <TextFieldCustom
                                size="small"
                                placeholder={t("sentences.jpPlaceholder")}
                                value={item.jp}
                                onChange={(e) => updateSentence(i, { jp: e.target.value })}
                                className="flex-1"
                            />
                            <TextFieldCustom
                                size="small"
                                placeholder={t("sentences.viPlaceholder")}
                                value={item.vi}
                                onChange={(e) => updateSentence(i, { vi: e.target.value })}
                                className="flex-1"
                            />
                            <IconButton size="small" color="error" onClick={() => removeSentence(i)}>
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                        </div>
                    ))
                )}
                <Button variant="outlined" startIcon={<AddIcon />} onClick={addSentence}>
                    {t("sentences.add")}
                </Button>
            </section>
        </div>
    );
};

export default QuestionVocabTab;
