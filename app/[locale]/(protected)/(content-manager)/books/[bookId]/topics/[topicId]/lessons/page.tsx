import { Metadata } from "next";
import LessonManagementView from "@/modules/protected/content-manager/lessons/features/lesson.management.view";

export const metadata: Metadata = {
    title: "Quản lý bài học | NaHo Admin",
    description:
        "Quản lý các bài học thuộc chủ đề giáo trình tiếng Nhật trong hệ thống NaHo.",
};

interface TopicLessonsPageProps {
    params: Promise<{ locale: string; bookId: string; topicId: string }>;
}

export default function TopicLessonsPage({ params }: TopicLessonsPageProps) {
    return <LessonManagementView params={params} />;
}
