import { NotificationLogResponse } from "@/types/responses/notification.response";
import { StreakEmailConfigResponse } from "@/types/responses/notification.response";

export const MOCK_NOTIFICATION_LOGS: NotificationLogResponse[] = [
    {
        id: "n-1",
        title: "Bảo trì hệ thống định kỳ",
        content:
            "Hệ thống NAHO sẽ tạm bảo trì từ 02:00 đến 04:00 sáng nay. Mong bạn thông cảm cho sự gián đoạn này.",
        audience: "ALL",
        status: "SENT",
        sentAt: "2026-06-11T05:00:00.000Z",
        recipientCount: 1284,
    },
    {
        id: "n-2",
        title: "Cập nhật tính năng Live Chatroom",
        content:
            "Phòng luyện nói trực tiếp đã ra mắt! Vào ngay để luyện Kaiwa cùng bạn bè và giảng viên.",
        audience: "LEARNER",
        status: "SENT",
        sentAt: "2026-06-08T10:15:00.000Z",
        recipientCount: 1043,
    },
    {
        id: "n-3",
        title: "Quy trình duyệt câu hỏi cộng đồng mới",
        content:
            "Từ tuần này, câu hỏi do học viên đề xuất sẽ được giảng viên duyệt trước khi xuất bản.",
        audience: "TEACHER",
        status: "SENT",
        sentAt: "2026-06-05T15:30:00.000Z",
        recipientCount: 32,
    },
    {
        id: "n-4",
        title: "Sự kiện Speaking Sakura Festival",
        content:
            "Tham gia sự kiện luyện nói chủ đề mùa hoa anh đào, nhận huy hiệu giới hạn và phần thưởng hấp dẫn.",
        audience: "ALL",
        status: "SENT",
        sentAt: "2026-06-01T08:00:00.000Z",
        recipientCount: 1251,
    },
    {
        id: "n-5",
        title: "Hướng dẫn tạo Persona AI",
        content:
            "Tài liệu hướng dẫn thiết lập Persona AI cho lớp học của bạn đã sẵn sàng trong khu vực giảng viên.",
        audience: "TEACHER",
        status: "SENT",
        sentAt: "2026-05-28T16:45:00.000Z",
        recipientCount: 30,
    },
];

export const DEFAULT_STREAK_EMAIL_CONFIG: StreakEmailConfigResponse = {
    subject: "Giữ vững ngọn lửa học Kaiwa cùng NAHO! 🔥",
    inactivityThreshold: 3,
    htmlBody: `<div style="font-family: 'Quicksand', sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #f0e0e3; border-radius: 12px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #ff99ac 0%, #ffb6c1 100%); padding: 28px 24px; text-align: center;">
    <div style="font-size: 40px;">🔥</div>
    <h1 style="margin: 8px 0 0; color: #fdfffc; font-size: 22px;">NAHO nhớ bạn lắm!</h1>
  </div>
  <div style="padding: 24px;">
    <p style="color: #333533; font-size: 15px; line-height: 1.6;">Xin chào <strong>{{name}}</strong>,</p>
    <p style="color: #333533; font-size: 15px; line-height: 1.6;">
      Đã <strong>{{days}} ngày</strong> bạn chưa luyện Kaiwa cùng NAHO. Streak học tập của bạn đang gặp nguy hiểm! Hãy quay lại và tiếp tục hành trình chinh phục tiếng Nhật ngay hôm nay nhé.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="#" style="display: inline-block; background: #ff8095; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 700; font-size: 15px;">Luyện nói ngay</a>
    </div>
    <p style="color: #9a9a9a; font-size: 13px; text-align: center;">Cảm ơn bạn đã đồng hành cùng NAHO 💗</p>
  </div>
</div>`,
};
