import { Metadata } from "next";
import GrammarManagementView from "@/modules/protected/content-manager/grammars/features/grammar.management.view";

export const metadata: Metadata = {
    title: "Kho ngữ pháp | NaHo Admin",
    description:
        "Quản lý và tra cứu kho ngữ pháp tiếng Nhật trong hệ thống NaHo.",
};

export default function GrammarsPage() {
    return <GrammarManagementView />;
}
