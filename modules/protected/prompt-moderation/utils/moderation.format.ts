/** Lấy 2 chữ cái đầu (theo 2 từ cuối của tên) cho avatar. */
export const getInitials = (name: string): string =>
    name
        .trim()
        .split(/\s+/)
        .slice(-2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");

/** Định dạng ngày gửi/xử lý → "DD/MM/YYYY". */
export const formatSubmittedDate = (iso: string): string => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

/** Định dạng đầy đủ ngày + giờ → "HH:mm DD/MM/YYYY". */
export const formatReviewedAt = (iso: string): string => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    const time = d.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const date = d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    return `${time} ${date}`;
};
