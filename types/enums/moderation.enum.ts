/**
 * Trạng thái kiểm duyệt một prompt (câu hỏi tuỳ chỉnh) do học viên đóng góp.
 * Map sang cột `status` của bản ghi hàng đợi kiểm duyệt khi nối BE thật.
 */
const ModerationStatus = Object.freeze({
    PENDING: "PENDING", // Chờ duyệt
    APPROVED: "APPROVED", // Đã duyệt (đã đưa vào thư viện)
    REJECTED: "REJECTED", // Từ chối
});
export type ModerationStatus =
    (typeof ModerationStatus)[keyof typeof ModerationStatus];

/**
 * Nhóm lý do từ chối — chọn nhanh để chuẩn hoá phản hồi & thống kê.
 * Đề xuất lưu vào cột mới `questions.review_category` (xem khuyến nghị DB).
 */
const RejectionCategory = Object.freeze({
    OFF_TOPIC: "OFF_TOPIC", // Lạc chủ đề / không phù hợp mục tiêu khoá học
    DUPLICATE: "DUPLICATE", // Trùng với câu đã có trong thư viện
    LOW_QUALITY: "LOW_QUALITY", // Nội dung sơ sài / sai ngữ pháp
    INAPPROPRIATE: "INAPPROPRIATE", // Ngôn từ không phù hợp
    OTHER: "OTHER", // Khác (ghi rõ ở ghi chú)
});
export type RejectionCategory =
    (typeof RejectionCategory)[keyof typeof RejectionCategory];
