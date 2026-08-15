"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useTopicManagement } from "@/modules/protected/topics/hooks/use.topic.management";
import { BookSelector } from "@/modules/protected/topics/features/book.selector";
import { TopicSearchFilter } from "@/modules/protected/topics/features/topic.search.filter";
import { TopicTable } from "@/modules/protected/topics/features/topic.table";
import { UpdateTopicModal } from "@/modules/protected/topics/features/topic.update.modal";
import { Pagination } from "@mui/material";

export default function TopicManagementPage() {
    const t = useTranslations("topicManagement");

    const {
        books,
        isFetchingBooks,
        selectedBookId,
        handleSelectBook,
        
        queryParams,
        handleSearch,
        handlePageChange,
        topics,
        pageMeta,
        isFetchingTopics,
        updateMutation,
        
        isUpdateModalOpen,
        openUpdateModal,
        closeUpdateModal,
        selectedTopicId,
    } = useTopicManagement();

    const selectedTopic = useMemo(
        () => topics.find((topic) => topic.id === selectedTopicId),
        [topics, selectedTopicId]
    );

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {t("title")}
                    </h1>
                </div>
            </div>

            <div className="flex-1 rounded-xl">
                {!selectedBookId ? (
                    <div className="pt-6">
                        <BookSelector 
                            books={books} 
                            onSelectBook={handleSelectBook} 
                            isLoading={isFetchingBooks} 
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <TopicSearchFilter 
                            currentParams={queryParams} 
                            onSearch={handleSearch} 
                            onBack={() => handleSelectBook(null)}
                        />
                        
                        <div className="relative">
                            {isFetchingTopics && (
                                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            )}
                            <TopicTable topics={topics} onEdit={openUpdateModal} />
                        </div>

                        {pageMeta.totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    count={pageMeta.totalPages}
                                    page={pageMeta.currentPage + 1}
                                    onChange={(_, page) => handlePageChange(page - 1)}
                                    color="primary"
                                    shape="rounded"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <UpdateTopicModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                topic={selectedTopic}
                onSave={(data) => {
                    if (selectedTopicId) {
                        updateMutation.mutate({ id: selectedTopicId, request: data });
                    }
                }}
                isSaving={updateMutation.isPending}
            />
        </div>
    );
}
