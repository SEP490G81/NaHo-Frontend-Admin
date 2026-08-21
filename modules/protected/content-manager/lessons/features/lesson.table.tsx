import React from "react";
import { LessonResponse } from "@/types/responses/lesson.response";
import { TopicStatus } from "@/types/enums/topic.enum";
import { useTranslations } from "next-intl";
import { Edit3 } from "lucide-react";
import { Tooltip } from "@mui/material";

interface LessonTableProps {
    lessons: LessonResponse[];
    isLoading: boolean;
    onEdit: (lessonId: number) => void;
    bookId: number;
    topicId: number;
}

export const LessonTable: React.FC<LessonTableProps> = ({ lessons, isLoading, onEdit, bookId, topicId }) => {
    const t = useTranslations("lessonManagement");

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
                        {lessons.length > 0 ? (
                            lessons.map((lesson) => (
                                <tr key={lesson.id} className="border-bdc-primary border-b hover:bg-hbgc-app transition-colors group">
                                    <td className="p-4 text-sm text-text-muted">{lesson.id}</td>
                                    <td className="p-4 text-sm font-medium text-text-contrast">
                                        {lesson.japaneseName}
                                    </td>
                                    <td className="p-4 text-sm text-text-muted max-w-xs truncate">
                                        {lesson.japaneseDescription || "-"}
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                                            lesson.status === TopicStatus.PUBLISHED 
                                                ? "bg-green-500/10 text-green-600 border-green-500/20" 
                                                : lesson.status === TopicStatus.DRAFT
                                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                                : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                        }`}>
                                            {t(`status.${lesson.status}`) || lesson.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => onEdit(lesson.id)}
                                                className="p-2 rounded-lg text-text-muted hover:text-bgc-highlight hover:bg-bgc-highlight/10 transition-colors"
                                                title={t("editLesson")}
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            
                                            {/* View Objectives button */}
                                            <Tooltip title="Quản lý Mục tiêu">
                                                <a href={`/books/${bookId}/topics/${topicId}/lessons/${lesson.id}/objectives`}>
                                                    <button
                                                        className="p-2 rounded-lg text-text-muted hover:text-bgc-highlight hover:bg-bgc-highlight/10 transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                                                    </button>
                                                </a>
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
