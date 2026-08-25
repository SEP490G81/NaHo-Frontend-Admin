import { Metadata } from "next";
import NodeManagementView from "@/modules/protected/content-manager/nodes/features/node.management.view";

export const metadata: Metadata = {
    title: "Quản lý câu hỏi & bài tập | NaHo Admin",
    description:
        "Quản lý chi tiết các câu hỏi phát âm và từ vựng thuộc mục tiêu trong hệ thống NaHo.",
};

interface NodeManagementPageProps {
    params: Promise<{
        locale: string;
        bookId: string;
        topicId: string;
        lessonId: string;
        objectiveId: string;
    }>;
}

export default function NodeManagementPage({ params }: NodeManagementPageProps) {
    return <NodeManagementView params={params} />;
}
