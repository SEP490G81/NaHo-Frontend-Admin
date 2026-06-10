"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useTopicQuestions } from "../providers/topic.questions.provider";

const QuestionList = () => {
    const t = useTranslations("topicManagement.questions");
    const { questions, selectedId, selectQuestion, startCreate, reorderQuestions } =
        useTopicQuestions();
    const [draggedId, setDraggedId] = useState<string | null>(null);

    return (
        <div className="bg-bgc-app space-y-3 rounded-xl p-4">
            <div>
                <h2 className="font-bold">{t("listTitle")}</h2>
                <p className="text-text-muted text-sm">
                    {t("countLabel", { count: questions.length })}
                </p>
            </div>
            <Button
                fullWidth
                variant="contained"
                disableElevation
                startIcon={<AddIcon />}
                onClick={startCreate}
                sx={{
                    bgcolor: "var(--color-bgc-highlight)",
                    color: "var(--color-text-contrast)",
                }}
            >
                {t("addQuestion")}
            </Button>

            {questions.length > 1 && (
                <p className="text-text-muted flex items-center gap-1 text-xs">
                    <DragIndicatorIcon fontSize="inherit" />
                    {t("reorderHint")}
                </p>
            )}

            {questions.length === 0 ? (
                <p className="border-bdc-primary text-text-muted rounded-lg border border-dashed py-6 text-center text-sm">
                    {t("empty")}
                </p>
            ) : (
                <div className="space-y-1">
                    {questions.map((q) => {
                        const isActive = q.id === selectedId;
                        return (
                            <div
                                key={q.id}
                                draggable
                                onDragStart={() => setDraggedId(q.id)}
                                onDragEnd={() => setDraggedId(null)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => {
                                    if (draggedId) reorderQuestions(draggedId, q.id);
                                    setDraggedId(null);
                                }}
                                onClick={() => selectQuestion(q.id)}
                                className={`hover:bg-hbgc-app flex cursor-pointer items-start gap-2 rounded-lg border-b px-2 py-3 transition-colors ${
                                    isActive
                                        ? "border-bgc-highlight bg-bgc-highlight/10"
                                        : "border-bdc-primary"
                                } ${draggedId === q.id ? "opacity-40" : ""}`}
                            >
                                <DragIndicatorIcon
                                    fontSize="small"
                                    className="text-text-muted mt-0.5 cursor-grab"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold">{q.jp}</p>
                                    <p className="text-text-muted truncate text-sm">
                                        {q.vi}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default QuestionList;
