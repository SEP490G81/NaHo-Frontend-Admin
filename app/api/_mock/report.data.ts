import { ReportResponse } from "@/types/responses/report.response";

const chromeWin: ReportResponse["device"] = {
    browser: "Chrome",
    browserVersion: "126.0.6478.55",
    os: "Windows 11 (23H2)",
    screenSize: "1920x1080",
    language: "vi-VN",
};

const safariIphone: ReportResponse["device"] = {
    browser: "Safari",
    browserVersion: "17.5",
    os: "iOS 17.5",
    screenSize: "390x844",
    language: "vi-VN",
};

const edgeWin: ReportResponse["device"] = {
    browser: "Edge",
    browserVersion: "125.0.2535.92",
    os: "Windows 10 (22H2)",
    screenSize: "1536x864",
    language: "vi-VN",
};

const firefoxMac: ReportResponse["device"] = {
    browser: "Firefox",
    browserVersion: "127.0",
    os: "macOS 14.5",
    screenSize: "1440x900",
    language: "vi-VN",
};

const BUILD_CURRENT = "1.8.2 (build 2406)";
const BUILD_PREV = "1.8.1 (build 2390)";
const BUILD_OLD = "1.8.0 (build 2375)";

export const MOCK_REPORTS: ReportResponse[] = [
    {
        id: "BR-1001",
        senderName: "Nguyễn Minh Tuấn",
        senderEmail: "tuannmhe170123@fpt.edu.vn",
        type: "STT_RECORDING",
        description:
            "Khi nhấn nút ghi âm trong Sandbox, micro không nhận tiếng dù đã cấp quyền trình duyệt.",
        status: "PENDING",
        reportedAt: "2026-06-10T04:12:00+07:00",
        screenshotUrl:
            "https://placehold.co/800x500/1f2937/e5e7eb/png?text=BR-1001+Mic+permission",
        context: {
            feature: "Sandbox luyện nói",
            route: "/sandbox/speaking",
            appVersion: BUILD_CURRENT,
        },
        device: chromeWin,
    },
    {
        id: "BR-1002",
        senderName: "Trần Thị Thanh An",
        senderEmail: "anttt.dev@gmail.com",
        type: "KEIGO_TRANSLATION",
        description:
            "AI dịch câu chào khách hàng sang dạng suồng sã, mong hệ thống ưu tiên Keigo khi bật chế độ công sở.",
        status: "IN_PROGRESS",
        reportedAt: "2026-06-09T21:00:00+07:00",
        context: {
            feature: "Hội thoại Keigo – Công sở",
            route: "/practice/keigo",
            appVersion: BUILD_CURRENT,
        },
        device: firefoxMac,
    },
    {
        id: "BR-1003",
        senderName: "Lê Hoàng Phúc",
        senderEmail: "phuclh.brse@fpt.edu.vn",
        type: "API_CONNECTION",
        description:
            "Vào giờ cao điểm 20h-22h, AI chatroom thường xuyên báo lỗi 'Không thể kết nối máy chủ AI'.",
        status: "PENDING",
        reportedAt: "2026-06-09T06:36:00+07:00",
        context: {
            feature: "Live Chatroom",
            route: "/chatroom/live",
            appVersion: BUILD_PREV,
        },
        device: chromeWin,
    },
    {
        id: "BR-1004",
        senderName: "Phạm Quỳnh Như",
        senderEmail: "nhupq.n4@gmail.com",
        type: "STT_RECORDING",
        description:
            "Phát âm 'ありがとうございます' bị nhận nhầm thành 'ありがとう ございました' liên tục.",
        status: "RESOLVED",
        reportedAt: "2026-06-08T18:36:00+07:00",
        screenshotUrl:
            "https://placehold.co/800x500/1f2937/e5e7eb/png?text=BR-1004+STT+mismatch",
        context: {
            feature: "Luyện phát âm",
            route: "/practice/pronunciation",
            appVersion: BUILD_CURRENT,
        },
        device: safariIphone,
    },
    {
        id: "BR-1005",
        senderName: "Đỗ Quang Huy",
        senderEmail: "huydq.it@fpt.edu.vn",
        type: "OTHER",
        description:
            "Biểu đồ radar kỹ năng trong Dashboard hiển thị NaN khi vừa làm bài đầu tiên xong.",
        status: "IN_PROGRESS",
        reportedAt: "2026-06-08T09:00:00+07:00",
        screenshotUrl:
            "https://placehold.co/800x500/1f2937/e5e7eb/png?text=BR-1005+Radar+NaN",
        context: {
            feature: "Dashboard – Biểu đồ kỹ năng",
            route: "/dashboard",
            appVersion: BUILD_CURRENT,
        },
        device: edgeWin,
    },
    {
        id: "BR-1006",
        senderName: "Vũ Thị Mai",
        senderEmail: "maivt.brse@fpt.edu.vn",
        type: "KEIGO_TRANSLATION",
        description:
            "Trong tình huống phỏng vấn, gợi ý của AI dùng です/ます nhưng thiếu kính ngữ ～させていただきます.",
        status: "PENDING",
        reportedAt: "2026-06-07T23:24:00+07:00",
        context: {
            feature: "Hội thoại phỏng vấn",
            route: "/practice/interview",
            appVersion: BUILD_OLD,
        },
        device: chromeWin,
    },
    {
        id: "BR-1007",
        senderName: "Hoàng Anh Khoa",
        senderEmail: "khoaha.dev@gmail.com",
        type: "API_CONNECTION",
        description:
            "Khi gửi prompt dài hơn 800 ký tự, hệ thống treo 15 giây rồi báo timeout.",
        status: "RESOLVED",
        reportedAt: "2026-06-07T06:36:00+07:00",
        context: {
            feature: "Chat với AI",
            route: "/chat",
            appVersion: BUILD_PREV,
        },
        device: firefoxMac,
    },
    {
        id: "BR-1008",
        senderName: "Bùi Khánh Linh",
        senderEmail: "linhbk.n3@gmail.com",
        type: "STT_RECORDING",
        description:
            "Trên iPhone Safari, nút ghi âm không phản hồi ngay lần đầu nhấn, phải nhấn 2-3 lần mới nhận.",
        status: "PENDING",
        reportedAt: "2026-06-06T18:36:00+07:00",
        context: {
            feature: "Sandbox luyện nói",
            route: "/sandbox/speaking",
            appVersion: BUILD_CURRENT,
        },
        device: safariIphone,
    },
];
