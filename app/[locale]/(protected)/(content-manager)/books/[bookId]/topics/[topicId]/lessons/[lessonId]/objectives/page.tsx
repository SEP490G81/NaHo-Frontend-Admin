import { Metadata } from "next";
import ObjectiveManagementView from "@/modules/protected/content-manager/objectives/features/objective.management.view";

export const metadata: Metadata = {
    title: "Quản lý mục tiêu bài học | NaHo Admin",
    description:
        "Quản lý các mục tiêu học tập thuộc bài học trong hệ thống NaHo.",
};

interface ObjectiveManagementPageProps {
    params: Promise<{
        locale: string;
        bookId: string;
        topicId: string;
        lessonId: string;
    }>;
}

export default function ObjectiveManagementPage({ params }: ObjectiveManagementPageProps) {
    return <ObjectiveManagementView params={params} />;
}
