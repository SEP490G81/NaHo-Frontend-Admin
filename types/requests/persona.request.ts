import { Gender } from "../enums/user.enum";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaStatus,
} from "../enums/persona.enum";

export interface CreatePersonaRequest {
    name: string;
    prompt: string;
    avatarFileId?: number | null;
    defaultMarugotoLevel: MarugotoLevel;
    defaultFormalityLevel: FormalityLevel;
    status: PersonaStatus;
    voiceName?: string | null;
    gender: Gender;
}

export type UpdatePersonaRequest = CreatePersonaRequest;
