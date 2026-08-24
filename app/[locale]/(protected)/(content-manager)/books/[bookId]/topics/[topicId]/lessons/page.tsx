"use client";

import React, { useMemo, use } from "react";
import { useTranslations } from "next-intl";
import { useLessonManagement } from "@/modules/protected/content-manager/lessons/hooks/use.lesson.management";
import { LessonTable } from "@/modules/protected/content-manager/lessons/features/lesson.table";
import { UpdateLessonModal } from "@/modules/protected/content-manager/lessons/features/lesson.update.modal";
import ContainerBox from "@/components/ui/container.box";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function TopicLessonsPage({ params }: { params: Promise<{ locale: string, bookId: string, topicId: string }> }) {
    const t = useTranslations("lessonManagement");
    
    // Unwrap params
    const resolvedParams = use(params);
    const bookId = parseInt(resolvedParams.bookId, 10);
    const topicId = parseInt(resolvedParams.topicId, 10);

    const {
        lessons,
        isFetchingLessons,
        
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedLessonId,
        updateMutation,
    } = useLessonManagement(topicId);

    const lessonToEdit = useMemo(() => lessons.find(l => l.id === selectedLessonId), [lessons, selectedLessonId]);

    const handleSaveLesson = (data: any) => {
        if (selectedLessonId) {
            updateMutation.mutate({ id: selectedLessonId, request: data });
        }
    };

    return (
        <div className="flex w-full flex-col gap-y-4">
            <ContainerBox className="p-0 border-none bg-transparent shadow-none">
                <div className="flex flex-col gap-4 pb-4">
                    {/* Breadcrumb / Header */}
                    <div className="flex items-center gap-4">
                        <Link 
                            href={`/${resolvedParams.locale || 'vi'}/books/${bookId}/topics`} 
                            className="p-2 bg-bgc-panel hover:bg-hbgc-app border border-bdc-primary rounded-lg text-text-muted hover:text-text-contrast transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-text-contrast text-2xl font-bold">
                                {t("title")}
                            </h1>
                            <div className="flex items-center text-sm text-text-muted mt-1">
                                <Link href={`/${resolvedParams.locale || 'vi'}/books`} className="hover:text-bgc-highlight transition-colors">
                                    {t("bookLabel")}
                                </Link>
                                <ChevronRight size={14} className="mx-1 opacity-50" />
                                <Link href={`/${resolvedParams.locale || 'vi'}/books/${bookId}/topics`} className="hover:text-bgc-highlight transition-colors">
                                    {t("topicLabel")}
                                </Link>
                                <ChevronRight size={14} className="mx-1 opacity-50" />
                                <span className="text-text-contrast font-medium">{t("lessonLabel")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerBox>

            <ContainerBox className="p-0 border-none bg-transparent shadow-none">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <LessonTable 
                        lessons={lessons} 
                        isLoading={isFetchingLessons} 
                        onEdit={openUpdateModal} 
                        bookId={bookId}
                        topicId={topicId}
                    />
                </div>
            </ContainerBox>

            <UpdateLessonModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                lesson={lessonToEdit}
                onSave={handleSaveLesson}
                isSaving={updateMutation.isPending}
            />
        </div>
    );
}
