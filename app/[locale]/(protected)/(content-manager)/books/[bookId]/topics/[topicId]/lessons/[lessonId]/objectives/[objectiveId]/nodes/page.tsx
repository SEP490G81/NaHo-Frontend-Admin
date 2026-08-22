"use client";

import React, { use, useState } from "react";
import { useTranslations } from "next-intl";
import { ContainerBox } from "@/components/ui/container.box";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useNodeManagement } from "@/modules/protected/content-manager/nodes/hooks/use.node.management";
import { NodeTable } from "@/modules/protected/content-manager/nodes/features/node.table";
import { SpeakingQuestionUpdateModal } from "@/modules/protected/content-manager/nodes/features/speaking.question.update.modal";
import { VocabularyQuestionUpdateModal } from "@/modules/protected/content-manager/nodes/features/vocabulary.question.update.modal";
import Link from "next/link";
import { LearningPathNodeListItemResponse } from "@/types/responses/node.response";

interface PageProps {
    params: Promise<{ locale: string; bookId: string; topicId: string; lessonId: string; objectiveId: string }>;
}

export default function NodeManagementPage({ params }: PageProps) {
    const t = useTranslations("objectiveManagement");
    const { locale, bookId, topicId, lessonId, objectiveId } = use(params);

    const parsedBookId = parseInt(bookId, 10);
    const parsedTopicId = parseInt(topicId, 10);
    const parsedLessonId = parseInt(lessonId, 10);
    const parsedObjectiveId = parseInt(objectiveId, 10);

    const { nodes, isFetchingNodes } = useNodeManagement(parsedObjectiveId);
    
    const [editSpeakingQuestionId, setEditSpeakingQuestionId] = useState<number | null>(null);
    const [editSpeakingQuestionNodeId, setEditSpeakingQuestionNodeId] = useState<number | null>(null);
    const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);

    const [editVocabularyQuestionId, setEditVocabularyQuestionId] = useState<number | null>(null);
    const [isVocabularyModalOpen, setIsVocabularyModalOpen] = useState(false);

    const handleEditNode = (node: LearningPathNodeListItemResponse) => {
        if (node.nodeType === "SPEAKING_QUESTION") {
            setEditSpeakingQuestionId(node.speakingQuestionId || null);
            setEditSpeakingQuestionNodeId(node.id);
            setIsSpeakingModalOpen(true);
        } else if (node.nodeType === "VOCABULARY_QUESTION") {
            setEditVocabularyQuestionId(node.vocabularyQuestionId || null);
            setEditSpeakingQuestionNodeId(node.id);
            setIsVocabularyModalOpen(true);
        } else {
            alert(t("unsupportedEditFunc", { nodeType: node.nodeType }));
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-4 pb-4">
                <Link
                    href={`/${locale}/books/${parsedBookId}/topics/${parsedTopicId}/lessons/${parsedLessonId}/objectives`}
                    className="p-2 bg-bgc-panel hover:bg-hbgc-app border border-bdc-primary rounded-lg text-text-muted hover:text-text-contrast transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-text-contrast">{t("editQuestions")}</h1>
                    <div className="flex items-center gap-2 text-sm text-text-muted mt-1">
                        <Link
                            href={`/${locale}/books`}
                            className="hover:text-primary transition-colors"
                        >
                            {t("book")}
                        </Link>
                        <ChevronRight size={14} />
                        <Link
                            href={`/${locale}/books/${parsedBookId}/topics`}
                            className="hover:text-primary transition-colors"
                        >
                            {t("topic")}
                        </Link>
                        <ChevronRight size={14} />
                        <Link
                            href={`/${locale}/books/${parsedBookId}/topics/${parsedTopicId}/lessons`}
                            className="hover:text-primary transition-colors"
                        >
                            {t("lesson")}
                        </Link>
                        <ChevronRight size={14} />
                        <Link
                            href={`/${locale}/books/${parsedBookId}/topics/${parsedTopicId}/lessons/${parsedLessonId}/objectives`}
                            className="hover:text-primary transition-colors"
                        >
                            {t("objective")}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-text-contrast font-medium">{t("question")}</span>
                    </div>
                </div>
            </div>

            <ContainerBox className="p-0 border-0 shadow-none bg-transparent">
                <NodeTable
                    nodes={nodes}
                    isLoading={isFetchingNodes}
                    onEdit={handleEditNode}
                />
            </ContainerBox>

            {editSpeakingQuestionId !== null && editSpeakingQuestionNodeId !== null && (
                <SpeakingQuestionUpdateModal
                    isOpen={isSpeakingModalOpen}
                    onClose={() => {
                        setIsSpeakingModalOpen(false);
                        setEditSpeakingQuestionId(null);
                        setEditSpeakingQuestionNodeId(null);
                    }}
                    questionId={editSpeakingQuestionId}
                    nodeId={editSpeakingQuestionNodeId}
                />
            )}

            {editVocabularyQuestionId !== null && editSpeakingQuestionNodeId !== null && (
                <VocabularyQuestionUpdateModal
                    isOpen={isVocabularyModalOpen}
                    onClose={() => {
                        setIsVocabularyModalOpen(false);
                        setEditVocabularyQuestionId(null);
                        setEditSpeakingQuestionNodeId(null);
                    }}
                    questionId={editVocabularyQuestionId}
                    nodeId={editSpeakingQuestionNodeId}
                />
            )}
        </div>
    );
}
