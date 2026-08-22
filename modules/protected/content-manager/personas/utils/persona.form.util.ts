import { Gender } from "@/types/enums/user.enum";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaStatus,
} from "@/types/enums/persona.enum";
import { CreatePersonaRequest } from "@/types/requests/persona.request";
import { PersonaResponse } from "@/types/responses/persona.response";
import { DEFAULT_AZURE_VOICE } from "../constants/persona.constants";
import { PersonaFormValues } from "../types/persona.form.type";

const EMPTY_FORM: PersonaFormValues = {
    name: "",
    prompt: "",
    gender: Gender.FEMALE,
    voiceName: DEFAULT_AZURE_VOICE,
    status: PersonaStatus.ACTIVE,
    defaultFormalityLevel: FormalityLevel.NEUTRAL,
    defaultMarugotoLevel: MarugotoLevel.ELEMENTARY_1_A2,
};

/** Đổ dữ liệu nhân vật vào form, nhân vật mới thì dùng giá trị mặc định. */
export function buildInitialFormValues(
    persona: PersonaResponse | null,
): PersonaFormValues {
    if (!persona) return { ...EMPTY_FORM };

    return {
        name: persona.name,
        prompt: persona.prompt,
        gender: persona.gender ?? EMPTY_FORM.gender,
        voiceName: persona.voiceName || DEFAULT_AZURE_VOICE,
        status: persona.status ?? PersonaStatus.ACTIVE,
        defaultFormalityLevel:
            persona.defaultFormalityLevel ?? EMPTY_FORM.defaultFormalityLevel,
        defaultMarugotoLevel:
            persona.defaultMarugotoLevel ?? EMPTY_FORM.defaultMarugotoLevel,
    };
}

/**
 * Payload gửi BE. KHÔNG gửi `avatarFileId`: đó là khoá ngoại sang bảng `files`,
 * gửi id không có thật sẽ vỡ ràng buộc khoá ngoại. Bỏ trống thì BE giữ nguyên
 * ảnh cũ (update) hoặc để trống (tạo mới) - chờ BE mở API upload ảnh.
 */
export function buildPersonaRequest(
    values: PersonaFormValues,
): CreatePersonaRequest {
    return {
        name: values.name.trim(),
        prompt: values.prompt.trim(),
        defaultMarugotoLevel: values.defaultMarugotoLevel,
        defaultFormalityLevel: values.defaultFormalityLevel,
        status: values.status,
        voiceName: values.voiceName || null,
        gender: values.gender,
    };
}
