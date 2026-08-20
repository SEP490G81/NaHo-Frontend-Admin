import { Metadata } from "next";
import PersonaManagementView from "@/modules/protected/content-manager/personas/features/persona.management.view";

export const metadata: Metadata = {
    title: "Quản lý nhân vật AI | NaHo Admin",
    description:
        "Tạo và cấu hình nhân vật AI cùng phong cách hội thoại cho phòng luyện nói 1-1.",
};

export default function PersonasPage() {
    return <PersonaManagementView />;
}
