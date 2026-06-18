import {
    AzureVoice,
    ConversationRegister,
    PersonaStatus,
    SuggestedLevel,
} from "@/types/enums/persona.enum";

export interface CreatePersonaRequest {
    name: string;
    roleStyle: string;
    description: string;
    suggestedLevel: SuggestedLevel;
    defaultRegister: ConversationRegister;
    voice: AzureVoice;
    greeting: string;
    systemPrompt: string;
    status: PersonaStatus;
    avatarUrl: string;
}

export interface UpdatePersonaRequest extends CreatePersonaRequest {
    id: string;
}
