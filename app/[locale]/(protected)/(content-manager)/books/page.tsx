import { Metadata } from "next";
import BookManagementView from "@/modules/protected/content-manager/books/features/book.management.view";

export const metadata: Metadata = {
    title: "Quản lý sách & giáo trình | NaHo Admin",
    description:
        "Quản lý danh sách sách và giáo trình tiếng Nhật trong hệ thống NaHo.",
};

export default function BookManagementPage() {
    return <BookManagementView />;
}
