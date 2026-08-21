import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSpeakingQuestion } from "../hooks/use.speaking.question";
import { UpdateSpeakingQuestionRequest } from "@/types/requests/question.request";
import { NestedVocabulariesManager } from "./nested.vocabularies.manager";
import { NestedGrammarsManager } from "./nested.grammars.manager";

interface SpeakingQuestionUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    questionId: number;
    nodeId: number;
}

export const SpeakingQuestionUpdateModal: React.FC<SpeakingQuestionUpdateModalProps> = ({ isOpen, onClose, questionId, nodeId }) => {
    const t = useTranslations("objectiveManagement");
    const { question, isFetchingQuestion, isUpdating, updateQuestion } = useSpeakingQuestion(questionId, nodeId);

    const [formData, setFormData] = useState<UpdateSpeakingQuestionRequest>({
        japaneseName: "",
        vietnameseName: "",
        description: "",
        japaneseSampleAnswer: "",
        vietnameseSampleAnswer: "",
        englishSampleAnswer: "",
        vocabularies: [],
        grammars: []
    });

    useEffect(() => {
        if (question && isOpen) {
            /* eslint-disable react-hooks/set-state-in-effect */
            setFormData({
                japaneseName: question.japaneseName || "",
                vietnameseName: question.vietnameseName || "",
                description: question.description || "",
                japaneseSampleAnswer: question.japaneseSampleAnswer || "",
                vietnameseSampleAnswer: question.vietnameseSampleAnswer || "",
                englishSampleAnswer: question.englishSampleAnswer || "",
                vocabularies: question.vocabularies?.map(v => ({
                    id: v.id,
                    japanese: v.japanese,
                    reading: v.reading,
                    vietnameseMeaningText: v.vietnameseMeaningText,
                    englishMeaningText: v.englishMeaningText
                })) || [],
                grammars: question.grammars?.map(g => ({
                    id: g.id,
                    japanese: g.japanese,
                    reading: g.reading,
                    vietnameseMeaningText: g.vietnameseMeaningText,
                    englishMeaningText: g.englishMeaningText
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
                    <h2 className="text-xl font-bold text-text-contrast">Chỉnh sửa Speaking Question</h2>
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
                        {/* Base Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-text-muted">Tên Tiếng Nhật <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    type="text"
                                    value={formData.japaneseName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, japaneseName: e.target.value }))}
                                    className="p-3 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-contrast"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-text-muted">Tên Tiếng Việt</label>
                                <input
                                    type="text"
                                    value={formData.vietnameseName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, vietnameseName: e.target.value }))}
                                    className="p-3 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-contrast"
                                />
                            </div>
                            <div className="flex flex-col gap-1 md:col-span-2">
                                <label className="text-sm font-medium text-text-muted">Mô tả</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="p-3 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-contrast resize-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1 md:col-span-2">
                                <label className="text-sm font-medium text-text-muted">Câu trả lời mẫu Tiếng Nhật</label>
                                <textarea
                                    rows={2}
                                    value={formData.japaneseSampleAnswer}
                                    onChange={(e) => setFormData(prev => ({ ...prev, japaneseSampleAnswer: e.target.value }))}
                                    className="p-3 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-contrast resize-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-text-muted">Câu trả lời mẫu Tiếng Việt</label>
                                <textarea
                                    rows={2}
                                    value={formData.vietnameseSampleAnswer}
                                    onChange={(e) => setFormData(prev => ({ ...prev, vietnameseSampleAnswer: e.target.value }))}
                                    className="p-3 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-contrast resize-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-text-muted">Câu trả lời mẫu Tiếng Anh</label>
                                <textarea
                                    rows={2}
                                    value={formData.englishSampleAnswer}
                                    onChange={(e) => setFormData(prev => ({ ...prev, englishSampleAnswer: e.target.value }))}
                                    className="p-3 bg-bgc-panel border border-bdc-primary rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-contrast resize-none"
                                />
                            </div>
                        </div>

                        {/* Phase 4: Nested Vocabularies & Grammars Placeholder */}
                        <div className="border border-bdc-primary p-4 rounded-xl">
                            <NestedVocabulariesManager
                                vocabularies={formData.vocabularies || []}
                                onChange={(newVocabularies) => setFormData({ ...formData, vocabularies: newVocabularies })}
                            />
                            
                            <NestedGrammarsManager
                                grammars={formData.grammars || []}
                                onChange={(newGrammars) => setFormData({ ...formData, grammars: newGrammars })}
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
