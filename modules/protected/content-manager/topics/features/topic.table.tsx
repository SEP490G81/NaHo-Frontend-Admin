import React from "react";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip, Chip } from "@mui/material";
import { Edit2 } from "lucide-react";
import { TopicResponse } from "@/types/responses/topic.response";
import { TopicStatus } from "@/types/enums/topic.enum";

interface TopicTableProps {
    topics: TopicResponse[];
    onEdit: (topicId: number) => void;
}

export const TopicTable: React.FC<TopicTableProps> = ({ topics, onEdit }) => {
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
                            <th className={headClass}>{t("status")}</th>
                            <th className={`${headClass} text-right`}>{t("actions")}</th>
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
                                <td className={cellClass}>{getStatusChip(topic.status)}</td>
                                <td className={`${cellClass} text-right`}>
                                    <Tooltip title={t("editTopic")}>
                                        <IconButton 
                                            onClick={() => onEdit(topic.id)} 
                                            size="small"
                                            className="text-text-contrast hover:bg-bgc-app"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
