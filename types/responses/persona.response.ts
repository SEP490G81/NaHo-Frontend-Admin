import { JlptLevel } from "@/types/enums/user.enum";
import {
    AzureVoice,
    PersonaStatus,
    PolitenessStyle,
    SpeakingRate,
} from "@/types/enums/persona.enum";

export interface PersonaResponse {
    id: string;
    /** Tên nhân vật, e.g. "Sakura" */
    name: string;
    /** Vai trò, e.g. "Giảng viên tiếng Nhật" */
    role: string;
    /** Mô tả ngắn về tính cách và phong cách */
    description: string;
    /** Trình độ JLPT mục tiêu nhân vật hướng tới */
    jlptLevel: JlptLevel;
    politenessStyle: PolitenessStyle;
    voice: AzureVoice;
    /** Tốc độ đọc của giọng TTS */
    speakingRate: SpeakingRate;
    /** Câu chào nhân vật dùng để mở đầu hội thoại (tiếng Nhật) */
    greeting: string;
    /**
     * Persona Prompt: CHỈ mô tả tính cách & bối cảnh nhân vật.
     * Luật chung (an toàn, định dạng) do trang Cấu hình System Prompt quản lý.
     */
    personaPrompt: string;
    /** Các chủ đề (topic) phù hợp để luyện cùng nhân vật này */
    topicIds: string[];
    /** Hiển thị với học viên hay còn nháp */
    status: PersonaStatus;
    /** Emoji preset làm ảnh đại diện; rỗng nếu dùng chữ viết tắt */
    avatarPreset: string;
}
