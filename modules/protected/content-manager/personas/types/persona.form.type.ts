import { Gender } from "@/types/enums/user.enum";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaStatus,
} from "@/types/enums/persona.enum";

export interface PersonaFormValues {
    name: string;
    prompt: string;
    gender: Gender;
    voiceName: string;
    status: PersonaStatus;
    defaultFormalityLevel: FormalityLevel;
    defaultMarugotoLevel: MarugotoLevel;
}

export type PersonaFormField = keyof PersonaFormValues;

/** Giá trị của map là hậu tố key i18n trong `personaManagement.form.errors`. */
export type PersonaFormErrors = Partial<Record<PersonaFormField, string>>;
