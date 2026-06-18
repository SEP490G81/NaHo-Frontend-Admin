"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tab,
    Tabs,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTopicQuestions } from "../providers/topic.questions.provider";
import { QuestionTab } from "../types/topic.questions.type";
import QuestionContentTab from "../components/question.content.tab";
import QuestionVocabTab from "../components/question.vocab.tab";
import QuestionContextTab from "../components/question.context.tab";

const QuestionEditor = () => {
    const t = useTranslations("topicManagement.questions");
    const { selectedId, activeTab, setActiveTab, save, isSaving, deleteQuestion } =
        useTopicQuestions();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const isEditing = Boolean(selectedId);

    return (
        <div className="bg-bgc-app rounded-xl p-6">
            <div>
                <h2 className="text-xl font-bold">
                    {isEditing ? t("editTitle") : t("createTitle")}
                </h2>
                <p className="text-text-muted mt-1 text-sm">
                    {isEditing ? t("editDescription") : t("createDescription")}
                </p>
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

            <div className="mt-6 flex items-center justify-between gap-3 border-t pt-5">
                {isEditing ? (
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => setConfirmDelete(true)}
                    >
                        {t("deleteButton")}
                    </Button>
                ) : (
                    <span />
                )}
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

            <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>{t("deleteTitle")}</DialogTitle>
                <DialogContent>
                    <p className="text-text-muted text-sm">{t("deleteMessage")}</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setConfirmDelete(false)}>
                        {t("deleteCancel")}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        onClick={() => {
                            if (selectedId) deleteQuestion(selectedId);
                            setConfirmDelete(false);
                        }}
                    >
                        {t("deleteConfirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default QuestionEditor;
