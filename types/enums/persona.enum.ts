import { JlptLevel } from "@/types/enums/user.enum";

/**
 * Chế độ hội thoại mặc định của persona — khớp 3 chế độ học viên chọn ở
 * màn "Thiết lập Hội thoại AI" (dialogue_sessions.register_setting).
 */
const ConversationRegister = Object.freeze({
    CASUAL: "CASUAL", // Thân mật
    OFFICE: "OFFICE", // Công sở
    INTERVIEW: "INTERVIEW", // Phỏng vấn
});
export type ConversationRegister =
    (typeof ConversationRegister)[keyof typeof ConversationRegister];

/**
 * Giọng Azure TTS gắn với persona (bản sắc nhân vật).
 * Map sang `ja-JP-*Neural` khi nối BE thật.
 */
const AzureVoice = Object.freeze({
    NANAMI: "NANAMI",
    KEITA: "KEITA",
    AOI: "AOI",
    DAICHI: "DAICHI",
    SHIORI: "SHIORI",
    MAYU: "MAYU",
});
export type AzureVoice = (typeof AzureVoice)[keyof typeof AzureVoice];

/** Persona đang hoạt động (học viên thấy) hay còn nháp (ẩn). */
const PersonaStatus = Object.freeze({
    ACTIVE: "ACTIVE",
    DRAFT: "DRAFT",
});
export type PersonaStatus = (typeof PersonaStatus)[keyof typeof PersonaStatus];

/** Trình độ gợi ý hiển thị trên card; "ALL" = phù hợp mọi trình độ. */
export type SuggestedLevel = JlptLevel | "ALL";
