import { FormTextField } from "@/types/ui/ui.type";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    CreatePersonaRequest,
    UpdatePersonaRequest,
} from "@/types/requests/persona.request";

export interface PersonaFormState {
    name: FormTextField;
    roleStyle: FormTextField;
    systemPrompt: FormTextField;
}

export interface AiPersonasContextType {
    personas: PersonaResponse[];
    isLoading: boolean;
    isSaving: boolean;
    /** Persona currently being edited; null while creating a new one. */
    editingPersona: PersonaResponse | null;
    isFormOpen: boolean;
    deletingPersona: PersonaResponse | null;
    openCreateForm: () => void;
    openEditForm: (persona: PersonaResponse) => void;
    closeForm: () => void;
    requestDelete: (persona: PersonaResponse) => void;
    cancelDelete: () => void;
    createPersona: (request: CreatePersonaRequest) => Promise<boolean>;
    updatePersona: (request: UpdatePersonaRequest) => Promise<boolean>;
    deletePersona: () => Promise<void>;
}
