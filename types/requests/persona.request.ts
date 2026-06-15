import { JlptLevel } from "@/types/enums/user.enum";
import {
    AzureVoice,
    PersonaStatus,
    PolitenessStyle,
    SpeakingRate,
} from "@/types/enums/persona.enum";

export interface CreatePersonaRequest {
    name: string;
    role: string;
    description: string;
    jlptLevel: JlptLevel;
    politenessStyle: PolitenessStyle;
    voice: AzureVoice;
    speakingRate: SpeakingRate;
    greeting: string;
    personaPrompt: string;
    topicIds: string[];
    status: PersonaStatus;
    avatarPreset: string;
}

export interface UpdatePersonaRequest extends CreatePersonaRequest {
    id: string;
}
