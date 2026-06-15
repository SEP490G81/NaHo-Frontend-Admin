import { JlptLevel } from "@/types/enums/user.enum";

/** Lightweight topic options for the persona "gắn chủ đề" picker.
 * MOCK: standalone list. TODO: thay bằng danh sách topic thật từ Topic management. */
export interface TopicOption {
    id: string;
    name: string;
    jlptLevel: JlptLevel;
}

export const MOCK_TOPIC_OPTIONS: TopicOption[] = [
    { id: "t-1", name: "Giao tiếp hàng ngày", jlptLevel: "N3" },
    { id: "t-2", name: "Phỏng vấn xin việc", jlptLevel: "N2" },
    { id: "t-3", name: "Họp dự án IT", jlptLevel: "N2" },
    { id: "t-4", name: "Đàm phán kinh doanh", jlptLevel: "N1" },
    { id: "t-5", name: "Du lịch & nhà hàng", jlptLevel: "N4" },
    { id: "t-6", name: "Tự giới thiệu bản thân", jlptLevel: "N5" },
];
