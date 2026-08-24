import { Metadata } from "next";
import ContentReportManagementView from "@/modules/protected/content-manager/reports/features/content.report.management.view";

export const metadata: Metadata = {
    title: "Quản lý báo cáo nội dung | NaHo Admin",
    description:
        "Tiếp nhận và xử lý báo cáo của người học về câu hỏi và bình luận trong cộng đồng.",
};

export default function ContentReportsPage() {
    return <ContentReportManagementView />;
}
