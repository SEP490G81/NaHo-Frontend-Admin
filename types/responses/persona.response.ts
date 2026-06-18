import {
    AzureVoice,
    ConversationRegister,
    PersonaStatus,
    SuggestedLevel,
} from "@/types/enums/persona.enum";

export interface PersonaResponse {
    id: string;
    /** Tên nhân vật, e.g. "Sakura" */
    name: string;
    /** Vai trò / phong cách ngắn (role_style), e.g. "Giảng viên tiếng Nhật" */
    roleStyle: string;
    /** Đoạn mô tả hiển thị trên card */
    description: string;
    /** Trình độ gợi ý hiển thị cho học viên */
    suggestedLevel: SuggestedLevel;
    /** Chế độ hội thoại mặc định (học viên có thể đổi mỗi phiên) */
    defaultRegister: ConversationRegister;
    /** Giọng đọc Azure TTS của nhân vật */
    voice: AzureVoice;
    /** Câu chào mở đầu; rỗng = để AI tự sinh */
    greeting: string;
    /** System Prompt định hướng hành vi nạp vào AI mỗi hội thoại */
    systemPrompt: string;
    /** Hiển thị với học viên hay còn nháp */
    status: PersonaStatus;
    /** URL ảnh đại diện (mock; map sang avatar_file_id khi có S3) */
    avatarUrl: string;
}
