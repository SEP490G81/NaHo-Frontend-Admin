import { FormalityLevelFilter } from "@/types/enums/persona.enum";
import { ConversationStyleResponse } from "@/types/responses/persona.response";

export interface PersonaFilterState {
    searchKeyword: string;
    formalityLevel: FormalityLevelFilter | string;
}

/**
 * Một lựa chọn phong cách hội thoại dựng từ danh sách nhân vật (BE chưa có API
 * liệt kê phong cách riêng), kèm số nhân vật đang dùng chung phong cách đó.
 */
export interface PersonaStyleOption {
    style: ConversationStyleResponse;
    usageCount: number;
}
