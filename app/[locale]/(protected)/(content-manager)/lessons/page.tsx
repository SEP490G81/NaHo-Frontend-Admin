"use client";

import React, { useMemo } from "react";
import { useLessonManagement } from "@/modules/protected/content-manager/lessons/hooks/use.lesson.management";
import { BookSelector } from "@/modules/protected/content-manager/lessons/features/book.selector";
import { TopicSelector } from "@/modules/protected/content-manager/lessons/features/topic.selector";
import { LessonTable } from "@/modules/protected/content-manager/lessons/features/lesson.table";
import { UpdateLessonModal } from "@/modules/protected/content-manager/lessons/features/lesson.update.modal";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import { ChevronRight } from "lucide-react";

export default function LessonManagementPage() {
    const t = useTranslations("lessonManagement");
    
    const {
        books,
        isFetchingBooks,
        selectedBookId,
        handleSelectBook,
        
        topics,
        isFetchingTopics,
        selectedTopicId,
        handleSelectTopic,
        
        lessons,
        isFetchingLessons,
        
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedLessonId,
        updateMutation,
    } = useLessonManagement();

    const selectedBook = useMemo(() => books.find(b => b.id === selectedBookId), [books, selectedBookId]);
    const selectedTopic = useMemo(() => topics.find(t => t.id === selectedTopicId), [topics, selectedTopicId]);
    const lessonToEdit = useMemo(() => lessons.find(l => l.id === selectedLessonId), [lessons, selectedLessonId]);

    const handleSaveLesson = (data: any) => {
        if (selectedLessonId) {
            updateMutation.mutate({ id: selectedLessonId, request: data });
        }
    };

    return (
        <ContainerBox>
            <div className="flex flex-col space-y-8">
                
                {/* Header & Breadcrumb */}
                <div className="flex flex-col space-y-4 border-b border-bdc-primary pb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-text-contrast">
                        {t("title")}
                    </h1>
                    
                    <div className="flex items-center text-sm text-text-muted">
                        <button 
                            onClick={() => handleSelectBook(null)}
                            className={`hover:text-bgc-highlight transition-colors ${!selectedBookId ? "font-semibold text-text-contrast" : ""}`}
                        >
                            {t("bookLabel")}
                        </button>
                        
                        {selectedBookId && (
                            <>
                                <ChevronRight size={16} className="mx-2 opacity-50" />
                                <button 
                                    onClick={() => handleSelectTopic(null)}
                                    className={`hover:text-bgc-highlight transition-colors ${!selectedTopicId ? "font-semibold text-text-contrast" : ""}`}
                                >
                                    <span className="truncate max-w-[200px] inline-block align-bottom">{selectedBook?.title || "..."}</span>
                                </button>
                            </>
                        )}
                        
                        {selectedTopicId && (
                            <>
                                <ChevronRight size={16} className="mx-2 opacity-50" />
                                <span className="font-semibold text-text-contrast truncate max-w-[200px] inline-block align-bottom">
                                    {selectedTopic?.japaneseName || "..."}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {!selectedBookId ? (
                        <BookSelector 
                            books={books} 
                            onSelectBook={handleSelectBook} 
                            isLoading={isFetchingBooks} 
                        />
                    ) : !selectedTopicId ? (
                        <TopicSelector 
                            topics={topics} 
                            onSelectTopic={handleSelectTopic} 
                            isLoading={isFetchingTopics} 
                        />
                    ) : (
                        <LessonTable 
                            lessons={lessons} 
                            isLoading={isFetchingLessons} 
                            onEdit={openUpdateModal} 
                        />
                    )}
                </div>

            </div>

            {/* Modal */}
            <UpdateLessonModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                lesson={lessonToEdit}
                onSave={handleSaveLesson}
                isSaving={updateMutation.isPending}
            />
        </ContainerBox>
    );
}
