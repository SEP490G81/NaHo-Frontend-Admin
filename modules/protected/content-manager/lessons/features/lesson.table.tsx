import React from "react";
import { LessonResponse } from "@/types/responses/lesson.response";
import { TopicStatus } from "@/types/enums/topic.enum";
import { useTranslations } from "next-intl";
import { Edit3 } from "lucide-react";

interface LessonTableProps {
    lessons: LessonResponse[];
    isLoading: boolean;
    onEdit: (lessonId: number) => void;
}

export const LessonTable: React.FC<LessonTableProps> = ({ lessons, isLoading, onEdit }) => {
    const t = useTranslations("lessonManagement");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 bg-bgc-panel rounded-xl border border-bdc-primary">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-bgc-panel border border-bdc-primary rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-bdc-primary bg-hbgc-app/30 text-text-muted text-xs uppercase tracking-wider">
                            <th className="p-4 font-medium">{t("table.id")}</th>
                            <th className="p-4 font-medium">{t("table.name")}</th>
                            <th className="p-4 font-medium">{t("table.description")}</th>
                            <th className="p-4 font-medium">{t("table.status")}</th>
                            <th className="p-4 font-medium text-right">{t("table.actions")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-bdc-primary">
                        {lessons.length > 0 ? (
                            lessons.map((lesson) => (
                                <tr key={lesson.id} className="hover:bg-hbgc-app transition-colors group">
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
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => onEdit(lesson.id)}
                                            className="p-2 rounded-lg text-text-muted hover:text-bgc-highlight hover:bg-bgc-highlight/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title={t("editLesson")}
                                        >
                                            <Edit3 size={18} />
                                        </button>
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
