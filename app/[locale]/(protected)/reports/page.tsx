import { Metadata } from "next";
import ReportManagementView from "@/modules/protected/reports/features/report.management.view";

export const metadata: Metadata = {
    title: "Quản lý báo cáo | NaHo Admin",
    description: "Quản lý và phản hồi các báo cáo sự cố từ người dùng.",
};

export default function ReportsPage() {
    return <ReportManagementView />;
}
