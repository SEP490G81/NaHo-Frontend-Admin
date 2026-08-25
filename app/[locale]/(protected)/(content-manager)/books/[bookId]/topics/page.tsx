import { Metadata } from "next";
import TopicManagementView from "@/modules/protected/content-manager/topics/features/topic.management.view";

export const metadata: Metadata = {
    title: "Quản lý chủ đề | NaHo Admin",
    description:
        "Quản lý các chủ đề thuộc giáo trình tiếng Nhật trong hệ thống NaHo.",
};

interface BookTopicsPageProps {
    params: Promise<{ locale: string; bookId: string }>;
}

export default function BookTopicsPage({ params }: BookTopicsPageProps) {
    return <TopicManagementView params={params} />;
}
