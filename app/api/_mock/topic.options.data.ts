import { TopicOption } from "@/types/responses/topic.option.response";

/**
 * MOCK: danh sách topic để gán câu hỏi khi duyệt. Khi module Quản lý chủ đề
 * (bảng `topics`) lên thật thì thay bằng API list topic.
 */
export const MOCK_TOPIC_OPTIONS: TopicOption[] = [
    {
        id: "t-1",
        japaneseName: "日常会話",
        label: "Đời sống hằng ngày",
        jlptLevel: "N4",
        categoryName: "Giao tiếp cơ bản",
    },
    {
        id: "t-2",
        japaneseName: "就職面接",
        label: "Phỏng vấn xin việc",
        jlptLevel: "N3",
        categoryName: "Sự nghiệp",
    },
    {
        id: "t-3",
        japaneseName: "IT・オフィス会話",
        label: "Giao tiếp IT công sở",
        jlptLevel: "N3",
        categoryName: "Công việc",
    },
    {
        id: "t-4",
        japaneseName: "ビジネスメール",
        label: "Email & báo cáo công việc",
        jlptLevel: "N2",
        categoryName: "Công việc",
    },
    {
        id: "t-5",
        japaneseName: "顧客対応",
        label: "Xử lý & xin lỗi khách hàng",
        jlptLevel: "N2",
        categoryName: "Công việc",
    },
];
