import { Gender } from "../enums/user.enum";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaStatus,
} from "../enums/persona.enum";
import { FileResponse } from "./file.response";

export interface PersonaResponse {
    id: number;
    name: string;
    prompt: string;
    avatarFile?: FileResponse | null;
    /** Cấp độ Marugoto mặc định của nhân vật (độ khó từ vựng, ngữ pháp). */
    defaultMarugotoLevel?: MarugotoLevel | null;
    /** Mức trang trọng mặc định của nhân vật (thể văn, kính ngữ). */
    defaultFormalityLevel?: FormalityLevel | null;
    status: PersonaStatus;
    voiceName?: string | null;
    gender: Gender;
}
