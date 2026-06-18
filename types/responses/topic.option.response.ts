import { JlptLevel } from "@/types/enums/user.enum";

/**
 * Lựa chọn topic để gán câu hỏi khi phê duyệt (rút gọn từ bảng `topics`).
 * TODO: thay bằng API list topic thật khi module Quản lý chủ đề sẵn sàng.
 */
export interface TopicOption {
    id: string;
    japaneseName: string;
    /** Nhãn tiếng Việt ngắn để giáo viên dễ nhận biết */
    label: string;
    jlptLevel: JlptLevel;
    categoryName: string;
}
