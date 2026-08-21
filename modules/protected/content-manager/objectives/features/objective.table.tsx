import React from "react";
import { ObjectiveResponse } from "@/types/responses/objective.response";
import { TopicStatus } from "@/types/enums/topic.enum";
import { useTranslations } from "next-intl";
import { Edit3, Layers } from "lucide-react";
import { Tooltip } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

interface ObjectiveTableProps {
    objectives: ObjectiveResponse[];
    isLoading: boolean;
    onEdit: (objectiveId: number) => void;
}

export const ObjectiveTable: React.FC<ObjectiveTableProps> = ({ objectives, isLoading, onEdit }) => {
    const t = useTranslations("objectiveManagement");
    const router = useRouter();
    const params = useParams();
    const { locale, bookId, topicId, lessonId } = params as { locale: string; bookId: string; topicId: string; lessonId: string };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 bg-bgc-panel rounded-xl border border-bdc-primary">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden flex flex-col gap-4">
            <div className="w-full overflow-x-auto rounded-lg border border-bdc-primary custom-scrollbar">
                <table className="w-full table-auto text-left">
                    <thead className="bg-bgc-app sticky top-0 z-10">
                        <tr className="border-b border-bdc-primary text-text-muted text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold">{t("table.id")}</th>
                            <th className="p-4 font-semibold">{t("table.name")}</th>
                            <th className="p-4 font-semibold">{t("table.description")}</th>
                            <th className="p-4 font-semibold">{t("table.status")}</th>
                            <th className="p-4 font-semibold text-center">{t("table.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objectives.length > 0 ? (
                            objectives.map((objective) => (
                                <tr key={objective.id} className="border-bdc-primary border-b hover:bg-hbgc-app transition-colors group">
                                    <td className="p-4 text-sm text-text-muted">{objective.id}</td>
                                    <td className="p-4 text-sm font-medium text-text-contrast">
                                        {objective.japaneseName}
                                    </td>
                                    <td className="p-4 text-sm text-text-muted max-w-xs truncate">
                                        {objective.japaneseDescription || "-"}
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                                            objective.status === TopicStatus.PUBLISHED 
                                                ? "bg-green-500/10 text-green-600 border-green-500/20" 
                                                : objective.status === TopicStatus.DRAFT
                                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                                : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                        }`}>
                                            {t(`status.${objective.status}`) || objective.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center">
                                            <Tooltip title={t("editObjective") || "Chỉnh sửa"}>
                                                <button
                                                    onClick={() => onEdit(objective.id)}
                                                    className="p-2 rounded-lg text-text-muted hover:text-bgc-highlight hover:bg-bgc-highlight/10 transition-colors"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Quản lý Nodes (Câu hỏi)">
                                                <button
                                                    onClick={() => router.push(`/${locale}/books/${bookId}/topics/${topicId}/lessons/${lessonId}/objectives/${objective.id}/nodes`)}
                                                    className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                                                >
                                                    <Layers size={18} />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-text-muted">
                                    {t("table.empty")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
