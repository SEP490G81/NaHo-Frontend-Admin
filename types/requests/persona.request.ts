import { FormalityLevel, MarugotoLevel } from "../enums/persona.enum";

export interface CreateConversationStyleRequest {
    description?: string | null;
    prompt: string;
    formalityLevel: FormalityLevel;
    marugotoLevel?: MarugotoLevel | null;
}

/**
 * Khi cập nhật, BE ghi đè trực tiếp lên bản ghi phong cách có `id` (hoặc phong
 * cách hiện tại của nhân vật nếu bỏ trống) chứ không tạo bản ghi mới.
 */
export interface UpdateConversationStyleRequest extends CreateConversationStyleRequest {
    id?: number | null;
}

export interface CreatePersonaRequest {
    name: string;
    prompt: string;
    avatarFileId?: number | null;
    suggestedConversationStyleId?: number | null;
    /** Có giá trị => BE tạo phong cách mới rồi gắn cho nhân vật. */
    conversationStyle?: CreateConversationStyleRequest | null;
}

export interface UpdatePersonaRequest {
    name: string;
    prompt: string;
    avatarFileId?: number | null;
    suggestedConversationStyleId?: number | null;
    /** Có giá trị => BE ghi đè nội dung phong cách đang dùng. */
    conversationStyle?: UpdateConversationStyleRequest | null;
}
