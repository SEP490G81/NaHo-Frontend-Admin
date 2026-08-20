import { FormalityLevel, MarugotoLevel } from "@/types/enums/persona.enum";

/**
 * EXISTING: gắn nhân vật vào một phong cách đã có.
 * CUSTOM: khai báo nội dung phong cách ngay trong form (tạo mới khi thêm nhân
 * vật, ghi đè phong cách đang dùng khi chỉnh sửa).
 */
export type PersonaStyleMode = "EXISTING" | "CUSTOM";

export interface PersonaFormValues {
    name: string;
    prompt: string;
    /** Giữ dạng chuỗi cho ô nhập, ép về number khi tạo payload. */
    avatarFileId: string;
    styleMode: PersonaStyleMode;
    suggestedConversationStyleId: string;
    styleDescription: string;
    stylePrompt: string;
    styleFormalityLevel: FormalityLevel;
    styleMarugotoLevel: MarugotoLevel | "";
}

export type PersonaFormField = keyof PersonaFormValues;

/** Giá trị của map là hậu tố key i18n trong `personaManagement.form.errors`. */
export type PersonaFormErrors = Partial<Record<PersonaFormField, string>>;
