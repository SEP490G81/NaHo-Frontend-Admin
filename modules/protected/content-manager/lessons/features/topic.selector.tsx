import React from "react";
import { TopicResponse } from "@/types/responses/topic.response";
import { useTranslations } from "next-intl";
import { LayoutGrid, CheckCircle, Clock } from "lucide-react";
import { TopicStatus } from "@/types/enums/topic.enum";

interface TopicSelectorProps {
    topics: TopicResponse[];
    onSelectTopic: (topicId: number) => void;
    isLoading: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelectTopic, isLoading }) => {
    const t = useTranslations("lessonManagement");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-text-contrast">
                    {t("selectTopicFirst")}
                </h2>
                <p className="text-text-muted text-sm">
                    {t("topicLabel")} ({topics.length})
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        onClick={() => onSelectTopic(topic.id)}
                        className="group flex flex-col bg-bgc-panel hover:bg-hbgc-app text-text-contrast border border-bdc-primary rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <LayoutGrid size={20} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-md border ${
                                topic.status === TopicStatus.PUBLISHED 
                                    ? "bg-green-500/10 text-green-600 border-green-500/20" 
                                    : topic.status === TopicStatus.DRAFT
                                    ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                    : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                            }`}>
                                {topic.status === TopicStatus.PUBLISHED && <CheckCircle size={12} className="inline mr-1" />}
                                {topic.status === TopicStatus.DRAFT && <Clock size={12} className="inline mr-1" />}
                                {t(`status.${topic.status}`) || topic.status}
                            </span>
                        </div>
                        
                        <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-bgc-highlight transition-colors">
                            {topic.japaneseName}
                        </h3>
                        
                        <p className="text-sm text-text-muted line-clamp-2 mt-auto">
                            {topic.japaneseDescription || topic.vietnameseDescription || "No description"}
                        </p>
                    </div>
                ))}
            </div>
            
            {topics.length === 0 && (
                <div className="text-center py-10 text-text-muted border-2 border-dashed border-bdc-primary rounded-xl bg-bgc-panel">
                    {t("noTopics")}
                </div>
            )}
        </div>
    );
};
