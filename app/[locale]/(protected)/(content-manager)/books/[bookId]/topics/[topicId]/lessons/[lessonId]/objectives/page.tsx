"use client";

import React, { use } from "react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useObjectiveManagement } from "@/modules/protected/content-manager/objectives/hooks/use.objective.management";
import { ObjectiveTable } from "@/modules/protected/content-manager/objectives/features/objective.table";
import { UpdateObjectiveModal } from "@/modules/protected/content-manager/objectives/features/objective.update.modal";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        locale: string;
        bookId: string;
        topicId: string;
        lessonId: string;
    }>;
}

export default function ObjectiveManagementPage({ params }: PageProps) {
    const t = useTranslations("objectiveManagement");
    const { locale, bookId, topicId, lessonId } = use(params);
    
    const parsedBookId = parseInt(bookId, 10);
    const parsedTopicId = parseInt(topicId, 10);
    const parsedLessonId = parseInt(lessonId, 10);

    const {
        objectives,
        isFetchingObjectives,
        isUpdateModalOpen,
        selectedObjective,
        openUpdateModal,
        closeUpdateModal,
        handleUpdateObjective,
        isUpdating,
    } = useObjectiveManagement(parsedLessonId);

    return (
        <div className="flex flex-col gap-6">
            {/* Header & Breadcrumb */}
            <div className="flex items-center gap-4 pb-4">
                <Link
                    href={`/${locale}/books/${parsedBookId}/topics/${parsedTopicId}/lessons`}
                    className="p-2 bg-bgc-panel hover:bg-hbgc-app border border-bdc-primary rounded-lg text-text-muted hover:text-text-contrast transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-text-contrast">
                        {t("title")}
                    </h1>
                    <div className="flex items-center text-sm text-text-muted mt-1 gap-2">
                        <Link href={`/${locale}/books`} className="hover:text-bgc-highlight transition-colors">
                            {t("book")}
                        </Link>
                        <ChevronRight size={14} />
                        <Link href={`/${locale}/books/${parsedBookId}/topics`} className="hover:text-bgc-highlight transition-colors">
                            {t("topic")}
                        </Link>
                        <ChevronRight size={14} />
                        <Link href={`/${locale}/books/${parsedBookId}/topics/${parsedTopicId}/lessons`} className="hover:text-bgc-highlight transition-colors">
                            {t("lesson")}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-text-contrast font-medium">{t("objective")}</span>
                    </div>
                </div>
            </div>

            <ContainerBox className="p-0 border-none bg-transparent shadow-none">
                <div className="flex flex-col gap-6">
                    <ObjectiveTable 
                        objectives={objectives} 
                        isLoading={isFetchingObjectives} 
                        onEdit={openUpdateModal} 
                    />
                </div>
            </ContainerBox>

            <UpdateObjectiveModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                objective={selectedObjective}
                onSave={handleUpdateObjective}
                isSaving={isUpdating}
            />
        </div>
    );
}
