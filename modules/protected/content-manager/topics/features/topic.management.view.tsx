"use client";

import React, { useMemo, use } from "react";
import { useTranslations } from "next-intl";
import { useTopicManagement } from "@/modules/protected/content-manager/topics/hooks/use.topic.management";
import { TopicSearchFilter } from "@/modules/protected/content-manager/topics/features/topic.search.filter";
import { TopicTable } from "@/modules/protected/content-manager/topics/features/topic.table";
import { UpdateTopicModal } from "@/modules/protected/content-manager/topics/features/topic.update.modal";
import { Pagination } from "@mui/material";
import ContainerBox from "@/components/ui/container.box";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface TopicManagementViewProps {
    params: Promise<{ locale: string; bookId: string }>;
}

export default function TopicManagementView({ params }: TopicManagementViewProps) {
    const t = useTranslations("topicManagement");

    // Unwrap params
    const resolvedParams = use(params);
    const bookId = parseInt(resolvedParams.bookId, 10);

    const {
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
    } = useTopicManagement(bookId);

    const selectedTopic = useMemo(
        () => topics.find((topic) => topic.id === selectedTopicId),
        [topics, selectedTopicId]
    );

    return (
        <div className="flex w-full flex-col gap-y-4">
            <ContainerBox className="p-0 border-none bg-transparent shadow-none">
                <div className="flex flex-col gap-4">
                    {/* Breadcrumb / Header */}
                    <div className="flex items-center gap-4 pb-4">
                        <Link 
                            href={`/${resolvedParams.locale || 'vi'}/books`} 
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
                                <span className="text-text-contrast font-medium">{t("topicLabel")}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <TopicSearchFilter 
                            currentParams={queryParams} 
                            onSearch={handleSearch}
                            onBack={() => {}}
                        />
                    </div>
                </div>
            </ContainerBox>

            <ContainerBox className="p-0 border-none bg-transparent shadow-none">
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative">
                        {isFetchingTopics && (
                            <div className="absolute inset-0 bg-bgc-app/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-contrast"></div>
                            </div>
                        )}
                        <TopicTable topics={topics} onEdit={openUpdateModal} bookId={bookId} />
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
