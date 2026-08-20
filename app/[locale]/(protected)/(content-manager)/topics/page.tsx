"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useTopicManagement } from "@/modules/protected/content-manager/topics/hooks/use.topic.management";
import { BookSelector } from "@/modules/protected/content-manager/topics/features/book.selector";
import { TopicSearchFilter } from "@/modules/protected/content-manager/topics/features/topic.search.filter";
import { TopicTable } from "@/modules/protected/content-manager/topics/features/topic.table";
import { UpdateTopicModal } from "@/modules/protected/content-manager/topics/features/topic.update.modal";
import { Pagination } from "@mui/material";
import ContainerBox from "@/components/ui/container.box";

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
        <div className="flex w-full flex-col gap-y-4">
            <ContainerBox>
                <div className="flex flex-col gap-3">
                    <h1 className="text-text-contrast text-2xl font-bold">
                        {t("title")}
                    </h1>
                    
                    {!selectedBookId ? (
                        <div className="pt-2">
                            <BookSelector 
                                books={books} 
                                onSelectBook={handleSelectBook} 
                                isLoading={isFetchingBooks} 
                            />
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <TopicSearchFilter 
                                currentParams={queryParams} 
                                onSearch={handleSearch} 
                                onBack={() => handleSelectBook(null)}
                            />
                        </div>
                    )}
                </div>
            </ContainerBox>

            {selectedBookId && (
                <ContainerBox>
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="relative">
                            {isFetchingTopics && (
                                <div className="absolute inset-0 bg-bgc-app/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-contrast"></div>
                                </div>
                            )}
                            <TopicTable topics={topics} onEdit={openUpdateModal} />
                        </div>

                        {pageMeta.totalPages > 1 && (
                            <div className="flex justify-end mt-2">
                                <Pagination
                                    count={pageMeta.totalPages}
                                    page={pageMeta.currentPage + 1}
                                    onChange={(_, page) => handlePageChange(page - 1)}
                                    color="primary"
                                    shape="rounded"
                                    sx={{
                                        "& .MuiPaginationItem-root": {
                                            color: "var(--color-text-contrast)",
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </ContainerBox>
            )}

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
