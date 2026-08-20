import { FormalityLevel, MarugotoLevel } from "../enums/persona.enum";

export interface ConversationStyleResponse {
    id: number;
    description?: string | null;
    prompt: string;
    formalityLevel: FormalityLevel;
    marugotoLevel?: MarugotoLevel | null;
}

export interface PersonaResponse {
    id: number;
    name: string;
    prompt: string;
    avatarFileId?: number | null;
    suggestedConversationStyleId?: number | null;
    /** BE trả kèm phong cách hội thoại gợi ý của nhân vật (có thể null nếu chưa gắn). */
    conversationStyle?: ConversationStyleResponse | null;
}
