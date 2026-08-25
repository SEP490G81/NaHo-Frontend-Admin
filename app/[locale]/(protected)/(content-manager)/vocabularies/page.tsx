import { Metadata } from "next";
import VocabularyManagementView from "@/modules/protected/content-manager/vocabularies/features/vocabulary.management.view";

export const metadata: Metadata = {
    title: "Kho từ vựng | NaHo Admin",
    description:
        "Quản lý và tra cứu kho từ vựng tiếng Nhật trong hệ thống NaHo.",
};

export default function VocabulariesPage() {
    return <VocabularyManagementView />;
}
