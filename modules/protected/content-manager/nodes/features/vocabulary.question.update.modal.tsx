import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useVocabularyQuestion } from "../hooks/use.vocabulary.question";
import { UpdateVocabularyQuestionRequest } from "@/types/requests/question.request";
import { NestedVocabulariesManager } from "./nested.vocabularies.manager";

interface VocabularyQuestionUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    questionId: number;
    nodeId: number;
}

export const VocabularyQuestionUpdateModal: React.FC<VocabularyQuestionUpdateModalProps> = ({ isOpen, onClose, questionId, nodeId }) => {
    const t = useTranslations("objectiveManagement");
    const { question, isFetchingQuestion, isUpdating, updateQuestion } = useVocabularyQuestion(questionId, nodeId);

    const [formData, setFormData] = useState<UpdateVocabularyQuestionRequest>({
        vocabularies: []
    });

    useEffect(() => {
        if (question && isOpen) {
            /* eslint-disable react-hooks/set-state-in-effect */
            setFormData({
                vocabularies: question.vocabularies?.map(v => ({
                    id: v.id,
                    japanese: v.japanese,
                    reading: v.reading,
                    vietnameseMeaningText: v.vietnameseMeaningText,
                    englishMeaningText: v.englishMeaningText
                })) || []
            });
            /* eslint-enable react-hooks/set-state-in-effect */
        }
    }, [question, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateQuestion(formData, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <Modal open={isOpen} onClose={onClose} disableScrollLock>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgc-app rounded-xl shadow-xl border border-bdc-primary p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-text-contrast">Chỉnh sửa Vocabulary Question</h2>
                    <button onClick={onClose} className="p-2 hover:bg-hbgc-app rounded-full transition-colors text-text-muted hover:text-text-contrast">
                        <X size={20} />
                    </button>
                </div>

                {isFetchingQuestion ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="border border-bdc-primary p-4 rounded-xl">
                            <NestedVocabulariesManager
                                vocabularies={formData.vocabularies || []}
                                onChange={(newVocabularies) => setFormData({ ...formData, vocabularies: newVocabularies })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-bdc-primary">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isUpdating}
                                className="px-5 py-2.5 rounded-lg font-medium text-text-contrast bg-hbgc-app hover:bg-hbgc-hover transition-colors disabled:opacity-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="px-5 py-2.5 rounded-lg font-medium text-white bg-primary hover:bg-primary-hover shadow-md shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                            >
                                {isUpdating ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : "Lưu thay đổi"}
                            </button>
                        </div>
                    </form>
                )}
            </Box>
        </Modal>
    );
};
