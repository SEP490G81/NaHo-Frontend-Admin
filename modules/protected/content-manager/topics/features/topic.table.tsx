import React from "react";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip, Chip } from "@mui/material";
import { Edit2 } from "lucide-react";
import { TopicResponse } from "@/types/responses/topic.response";
import { TopicStatus } from "@/types/enums/topic.enum";

interface TopicTableProps {
    topics: TopicResponse[];
    onEdit: (topicId: number) => void;
    bookId: number;
}

export const TopicTable: React.FC<TopicTableProps> = ({ topics, onEdit, bookId }) => {
    const t = useTranslations("topicManagement");

    const getStatusChip = (status: TopicStatus) => {
        switch (status) {
            case TopicStatus.PUBLISHED:
                return <Chip label={t("statusPublished")} color="success" size="small" variant="outlined" />;
            case TopicStatus.DRAFT:
                return <Chip label={t("statusDraft")} color="warning" size="small" variant="outlined" />;
            case TopicStatus.ARCHIVE:
                return <Chip label={t("statusArchive")} color="default" size="small" variant="outlined" />;
            default:
                return <Chip label={status} size="small" variant="outlined" />;
        }
    };

    if (topics.length === 0) {
        return (
            <div className="text-center py-20 text-text-muted border border-bdc-primary border-dashed rounded-xl bg-bgc-panel">
                {t("noData")}
            </div>
        );
    }

    const headClass = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted";
    const cellClass = "px-4 py-3 text-left text-sm text-text-contrast";

    return (
        <div className="w-full overflow-hidden flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-lg border border-bdc-primary custom-scrollbar">
                <table className="w-full table-auto">
                    <thead className="bg-bgc-app sticky top-0 z-10">
                        <tr className="border-bdc-primary border-b">
                            <th className={headClass}>ID</th>
                            <th className={headClass}>{t("topicName")}</th>
                            <th className={`${headClass} text-center`}>{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topics.map((topic) => (
                            <tr key={topic.id} className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors group">
                                <td className={cellClass}>#{topic.id}</td>
                                <td className={cellClass}>
                                    <p className="font-medium text-text-contrast">{topic.japaneseName}</p>
                                    {topic.japaneseDescription && (
                                        <p className="text-sm text-text-muted line-clamp-1 mt-1">
                                            {topic.japaneseDescription}
                                        </p>
                                    )}
                                </td>
                                <td className={cellClass}>
                                    <div className="flex items-center justify-center gap-2">
                                        <Tooltip title={t("editTopic")}>
                                            <IconButton 
                                                onClick={() => onEdit(topic.id)} 
                                                size="small"
                                                className="text-text-contrast hover:bg-bgc-app"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        {/* View Lessons button */}
                                        <Tooltip title="Quản lý Bài học">
                                            <a href={`/books/${bookId}/topics/${topic.id}/lessons`}>
                                                <IconButton 
                                                    size="small"
                                                    className="text-text-contrast hover:bg-bgc-highlight/10 hover:text-bgc-highlight"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z"/></svg>
                                                </IconButton>
                                            </a>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
