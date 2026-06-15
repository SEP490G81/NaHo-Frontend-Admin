import { PersonaFormState } from "../types/ai.personas.type";

export function validatePersonaForm(formData: FormData): PersonaFormState {
    const get = (key: string): string => {
        const entry = formData.get(key);
        return typeof entry === "string" ? entry : "";
    };

    const name = get("name");
    const role = get("role");
    const personaPrompt = get("personaPrompt");

    return {
        name: { value: name, error: name.trim().length === 0 },
        role: { value: role, error: role.trim().length === 0 },
        personaPrompt: {
            value: personaPrompt,
            error: personaPrompt.trim().length === 0,
        },
    };
}
